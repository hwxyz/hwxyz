console.log('获得当前执行node命令时候的文件夹目录名 :', process.cwd());
const fs = require('fs');
const download = require('../lib/download');
const rm = require('rimraf').sync;
const semver = require('semver');

// 判断配置文件存在
if (fs.existsSync(`${process.cwd()}/hwxyz.json`)) {
    try {
        let config = JSON.parse(fs.readFileSync(`${process.cwd()}/hwxyz.json`).toString());
        const { repository } = config;
        download('.', repository.type || 'github', gitLabAddressFormat(repository.address, repository.type)).then(target => {
            // 版本比较，目前没想到更好的方法，现使用下载比对，然后删除的方法来做
            let templateConfig = JSON.parse(fs.readFileSync(`${process.cwd()}/.download-temp/package.json`).toString());
            if (semver.gt(templateConfig.version, repository.version)) {
                console.log('进行升级操作');
            } else {
                console.log('当前版本已是最新版本，不需要更新!');
                rm(`${process.cwd()}/.download-temp`);
            }
        })
        // 根据配置
        console.log('配置信息为:', config);
    } catch (e) {
        console.error('配置解析错误');
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
