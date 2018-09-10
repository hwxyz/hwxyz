#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const download = require('../lib/download')
const generator = require('../lib/generator')
const process = require('process');
const spawn = require('react-dev-utils/crossSpawn');

// 命令行交互工具
const program = require('commander')
// Match files using the patterns the shell uses, like stars and stuff.
const glob = require('glob')

// 终端交互工具
const inquirer = require('inquirer')

// Terminal string styling done right
const chalk = require('chalk')
// Colored symbols for various log levels
const logSymbols = require('log-symbols')

program.usage('<project-name>')
  .option('-t, --type [repository-type]', 'assign to repository type', 'github')
  .option('-r, --repository [repository]', 'assign to repository', 'huomarvin/hwxyz-test')
  .parse(process.argv);

// console.log('repository - type', program.type);
// console.log('repository - r', program.repository);
// return ;
let projectName = program.args[0];

if (!projectName) {  // project-name 必填
  // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
  program.help()
  return
}

const list = glob.sync('*')  // 遍历当前目录
const rootName = path.basename(process.cwd()) // 获取执行当前命令的文件夹名称字符串

let next = undefined
if (list.length) {  // 如果当前目录不为空
  if (list.filter(name => {
    const fileName = path.resolve(process.cwd(), path.join('.', name))
    const isDir = fs.statSync(fileName).isDirectory()
    return name.indexOf(projectName) !== -1 && isDir
  }).length !== 0) {
    console.log(`项目${projectName}已经存在`)
    return
  }
  next = Promise.resolve(projectName)
} else if (rootName === projectName) {
  next = inquirer.prompt([
    {
      name: 'buildInCurrent',
      message: '当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
      type: 'confirm',
      default: true
    }
  ]).then(answer => {
    return Promise.resolve(answer.buildInCurrent ? projectName : '.')
  })
} else {
  next = Promise.resolve(projectName)
}

next && go()

function go() {
  next.then(projectRoot => {
    if (projectRoot !== '.') {
      fs.mkdirSync(projectRoot)
    }
    return download(projectRoot, program.type, program.repository).then(target => {
      return {
        name: projectRoot,
        root: projectRoot,
        target: target
      }
    })
  }).then(context => {
    return inquirer.prompt([
      {
        name: 'projectName',
        message: '项目的名称',
        default: context.name
      }, {
        name: 'projectVersion',
        message: '项目的版本号',
        default: '1.0.0'
      }, {
        name: 'projectDescription',
        message: '项目的简介',
        default: `A project named ${context.name}`
      }
    ]).then(answers => {
      return {
        ...context,
        metadata: {
          ...answers
        }
      }
    })
  }).then(context => {
    // 添加生成的逻辑
    return generator(context.metadata, context.target, path.parse(context.target).dir);
  }).then((res) => {
    const projectPath = path.resolve(res.dest);
    const hwxyzJson = {
      repository: {
        address: program.repository,
        type: program.type,
      },
      replace_dir: [],
      package: {
        dependencies: "update",
        scripts: "add",
        repository: "replace"
      }
    };
    fs.writeFileSync(`${projectPath}/hwxyz.json`, JSON.stringify(hwxyzJson, null, 4));
    let local_package = JSON.parse(fs.readFileSync(`${projectPath}/package.json`).toString());
    local_package.templateVersion = res.templateVersion || '0.0.1';
    fs.writeFileSync(`${projectPath}/package.json`, JSON.stringify(local_package, null, 4));
    // 成功用绿色显示，给出积极的反馈
    console.log(logSymbols.success, chalk.green('创建成功:)'))
    try {
      process.chdir(projectName);
      const proc = spawn.sync('npm', ['install'], { stdio: 'inherit' });
      if (proc.status === 0) {
        // console.log('执行成功');
        console.log(`Success! Created ${projectName} at ${process.cwd()}`);
        console.log('Inside that directory, you can run several commands:');
        console.log();
        console.log(chalk.cyan(`  npm start`));
        console.log('    Starts the development server.');
        console.log();
        console.log(
          chalk.cyan(`  npm run build`)
        );
        console.log('    Bundles the app into static files for production.');
      }
    } catch (err) {
      // console.error(`chdir: ${err}`);
    }
  }).catch(err => {
    // 失败了用红色，增强提示
    console.error(logSymbols.error, chalk.red(`创建失败：${err.message}`))
  })
}
