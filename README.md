# hwxyz
Hwxyz is a node scaffold,named by  the team member’s last name .

The hwxyz library exported as [Node.js](https://nodejs.org/) modules.

It can help us to generate a framework by template replacement .

It can customize interactions.

I will perfect it step by step.

## Develop
```shell
node -v
#v8.9.3
npm -v
#5.6.0
```

## Installation

Using npm:

```shell
npm install -g hwxyz
hwxyz init <project name>
# 指定初始化仓库
hwxyz init <project name> -r huomarvin/react-koa2-ssr
# 针对公司内网情况，增加-t参数，可配置初始化仓库为gitlab
hwxyz init <project name> -t gitlab -r <gitlab address>
# 项目更新功能
hwxyz update
```

Update hwxyz:

```shell
npm update -g hwxyz
```
参考[如何更新全局安装的包](https://www.npmjs.com.cn/getting-started/updating-global-packages/)









