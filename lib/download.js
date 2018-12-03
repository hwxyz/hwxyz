const path = require('path')
const ora = require('ora')
const download = require('download-git-repo')

module.exports = function (target, type = 'github', url) {

  let targeturl = '';
  switch (type) {
    case 'github':
      targeturl = `https://github.com/${url}`; break;
    case 'gitlab': 
      targeturl = `gitlab:${url}`; break;
  }


  target = path.join(target || '.', '.download-temp')
  return new Promise((resolve, reject) => {
    const spinner = ora(`正在下载项目模板，源地址：${targeturl}`)
    spinner.start()
    download(url, target, { clone: true }, (err) => {
      if (err) {
        spinner.fail()
        console.log('err',err);
        reject(err)
      } else {
        // 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
        spinner.succeed()
        resolve(target)
      }
    })
  })
}