### 构建命令
```
# 安装依赖
npm install

# 开发环境启动
npm run start

# 打生产包
npm run build

# 服务器端部署
npm run prd
```

### 项目结构
```
project
│   README.md 说明
│   Dockerfile boom3发布配置
│
└─── client
│   │  main.js 入口文件
│   │
│   └─── action
│       │   action.js redux action 类型、创建函数
│   │
│   └─── asset 资源
│       │   font 字体
│       │   image 图片
│   │   
│   └─── components 组件目录
│       │   App.js 整体布局，redux connect入口，redux props 通过 route render 传入其他组件
│       │   Bundle.js Bundle loader
│       │   mapProps.js redux mapStateToProps、 mapDispatchToProps、 mapPropTypes 统一配置文件
│       │   
│   │
│   └─── lib 工具库
│       │      
│   │
│   └─── reducer 
│       │   reducer.js combineReducers 配置文件
│   │
│   └─── request 
│       │   index.js 所有接口请求 通过axios统一配置在这里，返回数据
│       │            拦截器 未登录时跳转、统一弹出错误消息
│   │
│   └─── router 路由
│       │   
│   │   
│   │
│   └─── style 
│       │   ant.less ant.design 主题色修改
│       │   app.scss 布局样式
│       │   index.scss 引用入口
│       │   reset.scss 重置样式
│       │   var.scss 变量
│       │   
│   
└─── config 项目接口地址，端口号在此修改
│   │   default.json 默认配置
│   │   prd.json 生产配置
│   │   test.json 测试配置
│   │
└─── public 静态资源目录
│   │
└─── server koa服务端
│   │
│   └───controller
│       │   api.js 接口转发
│ 
│   │   base.js 入口
│   │   login.js 登录、退出等
│   │   server.js 服务
│   │   utils.js 工具
│   │
└─── views 首页模板
│   │
│   │
└─── webpack 配置
│   │   webpack.dev.js 开发
│   │   webpack.prd.js 生产
│   │
└─── .babelrc babel配置
│   │
│   │
└─── .eslintrc eslint配置
```

### 接口地址
人工理赔API

http://15442-tech-atom-za-graphene-claims-backend.test.za-tech.net/swagger-ui.html#/