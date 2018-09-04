const download = require('download-git-repo')
const ora = require('ora')
const url = 'huomarvin/react-koa2-ssr';
const spinner = new ora({
  text: `正在下载项目模板，源地址：https://github.com/${url}`,
});
spinner.start()

download(url, 'test/tmp', function (err) {
  if (err) {
    spinner.fail()
  } else {
    // 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
    spinner.color = 'yellow';
    spinner.text = '🍎';
    spinner.succeed()
  }
})