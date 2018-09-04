const download = require('download-git-repo')
const ora = require('ora')
const url = 'huomarvin/react-koa2-ssr';
download('gitlab:http://gitlab.zhonganinfo.com:hwxyz/scaffold', 'test/tmp', { clone: true }, function (err) {
  console.log(err ? 'Error' : 'Success')
})