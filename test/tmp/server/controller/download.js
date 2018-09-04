/*
 * @Author: za-zhouchiye
 * @Date: 2018-07-27 11:16:50
 * @Description: ''
 * @Last Modified by: za-zhouchiye
 * @Last Modified time: 2018-07-27 11:25:12
 * @ToDo: ''
 */
var moment = require('moment');
var config = require('../../config');
module.exports = async(ctx) => {
    var startTime = new Date().getTime();
    // 截取查看请求地址，查看对应配置文件中的api所对应属性
    var apiName = ctx.url.split('/')[2];
    // 请求的url换成真实地址
    ctx.url = ctx.url.replace('/download/' + apiName, '');
    // 代理转发
    var url = `${config.protocol}${config.api[apiName]}${ctx.url}`;
    console.log('---------------文件下载--------------------');
    console.log('请求时间:' + moment(startTime).format('YYYY-MM-DD HH:mm:ss'));
    console.log('请求地址:' + ctx.request.url);
    console.log('真实地址:' + config.api[apiName] + ctx.url);
    console.log('------------------------------------------');
    ctx.redirect(url);
};
