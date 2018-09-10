console.log(`${process.cwd()}`);
const fs = require('fs');
const download = require('../lib/download');
const rm = require('rimraf').sync;
const semver = require('semver');
const child_process = require('child_process');

const log4js = require('log4js')
log4js.configure({
    appenders: {
        everything: { type: 'file', filename: 'all-the-logs.log', maxLogSize: 10485760, backups: 3, compress: true }
    },
    categories: {
        default: { appenders: ['everything'], level: 'debug' }
    }
});
const logger = log4js.getLogger();

if (!fs.existsSync(`${process.cwd()}/package.json`)) {
    console.log('请确认在包含package.json文件的项目目录下执行该更新操作');
    return;
}
if (!fs.existsSync(`${process.cwd()}/hwxyz.json`)) {
    console.log('未读取到hwxyz.json文件');
    return;
}

// 判断配置文件存在
if (fs.existsSync(`${process.cwd()}/hwxyz.json`)) {
    try {
        // 根据配置
        let config = JSON.parse(fs.readFileSync(`${process.cwd()}/hwxyz.json`).toString());
        let local_package = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`).toString());
        logger.debug('配置信息为:', config);
        const { repository } = config;
        rm(`${process.cwd()}/.download-temp`);
        download('.', repository.type || 'github', gitLabAddressFormat(repository.address, repository.type)).then(target => {
            // 版本比较，目前没想到更好的方法，现使用下载比对，然后删除的方法来做
            let templateConfig = JSON.parse(fs.readFileSync(`${process.cwd()}/.download-temp/package.json`).toString());
            if (semver.gt(templateConfig.templateVersion, local_package.templateVersion)) {
                console.log('进行升级操作');
                // 备份
                const replace_dir = config.replace_dir;
                // 替换文件夹内容，配置的时候最好精确到最小文件夹级别，不然替换的东西会比较多
                if (replace_dir && replace_dir.length) {
                    replace_dir.forEach(item => {
                        const path = `${process.cwd()}/${item}`;
                        if (fs.existsSync(path)) {
                            const copyPath = `${process.cwd()}/.download-temp/${item}`;
                            if (fs.existsSync(copyPath)) {
                                // 删除文件夹，进行替换工作
                                rm(path)
                                // 替换文件夹
                                copyDir(copyPath, `${process.cwd()}/${item}`);
                            } else {
                                logger.debug(`模板中不存在该文件夹${copyPath}，暂不进行替换`);
                            }
                        } else {
                            logger.debug(`${path}  不存在`);
                        }
                    });
                    console.log('升级完成');
                }
                if (config.package && Object.keys(config.package)) {
                    // add 模板有的，本地项目没有的执行新增操作，update 版本或升级， replace 整个模块替换
                    if (local_package) {
                        const packageConfig = config.package;
                        Object.keys(packageConfig).forEach(item => {
                            let handleMethod = packageConfig[item];
                            if (handleMethod == 'add') {
                                let localConfig = local_package[item];
                                logger.debug('更新前localConfig', localConfig);
                                let templateKeyConfig = templateConfig[item];
                                Object.keys(templateKeyConfig).map(key => {
                                    if (!localConfig[key]) {
                                        logger.debug(`发现模板新增模块:${item}.${key}`);
                                        localConfig[key] = templateKeyConfig[key];
                                    }
                                });
                                logger.debug('更新后localConfig', localConfig);
                                local_package[item] = localConfig;
                            }
                            else if (handleMethod == 'update') {
                                let localConfig = local_package[item];
                                logger.debug('更新前localConfig', localConfig);
                                let templateKeyConfig = templateConfig[item];
                                Object.keys(templateKeyConfig).map(key => {
                                    if (localConfig[key]) {
                                        logger.debug(`更新模块:${key}为${templateKeyConfig[key]}`);
                                        localConfig[key] = templateKeyConfig[key];
                                    }
                                });
                                logger.debug('更新后localConfig', localConfig);
                                local_package[item] = localConfig;
                            } else if (handleMethod == 'replace') {
                                local_package[item] = templateConfig[item];
                            } else {
                                logger.debug(`${item}未配置`);
                            }
                        });
                        local_package.templateVersion = templateConfig.templateVersion;
                        console.log('升级完成');
                        fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(local_package, null, 4));
                    }
                }
            } else {
                console.log('当前版本已是最新版本，不需要更新!');
                rm(`${process.cwd()}/.download-temp`);
            }
        })
        console.log(' ');
        // 处理package.json 支持如下策略

    } catch (e) {
        console.error('配置解析错误，详情请查看日志信息');
        logger.error(e);
    }
} else {
    console.error('未读取到正确的配置文件');
};

// 对gilab做特殊处理
function gitLabAddressFormat(str, type) {
    if (type == 'gitlab') {
        return str.replace(".com/", ".com:").replace('.git', '');
    }
    return str.replace('.git', '');
}
// 文件夹复制
function copyDir(src, dist) {
    child_process.spawn('cp', ['-r', src, dist]);
}
