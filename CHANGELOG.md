#0.0.2
发布到npm环境，并添加全局功能
#0.0.3
新增 -r 选项，可以指定仓库地址
#0.0.5
新增 -t 选项，新增对gitlab的支持
```shell
hwxyz init <project name> -t gitlab -r <gitlab address>
#0.0.6
新增自动执行npm install功能

#0.0.9
新增更新功能:
项目初始化时新增hwxyz.json文件
执行`hwxyz update`时，通过模板版本进行替换工作
```json
{
    // 由hwxyz生成
    "repository": {
        "address": "http://gitlab.mygitlab.com:username/testhwxyzcli#master",
        "type": "gitlab"
    },
    // 每次替换的模板文件夹，lib下一般存放公共文件
    "replace_dir": [
        'lib'
    ],
    // package.json 文件中替换策略， update代表替值，add代表模板文件有的，本地文件没有的要进行新增，replace代表完全替换
    "package": {
        "dependencies": "update",
        "scripts": "add",
        "repository": "replace"
    }
}
```
