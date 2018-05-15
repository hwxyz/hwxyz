const inquirer = require('inquirer')


inquirer.prompt([
    {
        name: 'projectName',
        message: '项目的名称',
        default: 'tt'
    }, {
        name: 'projectVersion',
        message: '项目的版本号',
        default: '1.0.0'
    }, {
        name: 'projectDescription',
        message: '项目的简介',
        default: `A project named tt`
    }
]).then(answers => {
    console.log(answers);
});

    