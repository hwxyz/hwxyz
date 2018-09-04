/*
 * @Author: za-yanqing
 * @Date: 2018-07-11 16:41:41
 * @Description: '转发的中间件，后端需要在包头set两个东西，X-Requested-With和x-ticket'
 * @Last Modified by: za-zhouchiye
 * @Last Modified time: 2018-07-27 11:42:01
 * @ToDo: ''
 */
var moment = require('moment');
var config = require('../../config');
var axios = require('axios');
var rawBody = require('raw-body');

axios.defaults.withCredentials = true;

module.exports = async(ctx) => {
    var startTime = new Date().getTime();
    // 截取查看请求地址，查看对应配置文件中的api所对应属性
    var apiName = ctx.url.split('/')[2];
    // 请求的url换成真实地址
    ctx.url = ctx.url.replace('/api/' + apiName, '');
    // 代理转发
    var contentType = ctx.request.header['content-type'];
    var requestBody = {
        'method': ctx.request.method,
        'url': `${config.protocol}${config.api[apiName]}${ctx.url}`,
        'headers': {
            'content-type': contentType,
            'X-Requested-With': 'XMLHttpRequest',
            'xticket': ctx.session.ticket,
            'Cookie': JSON.parse(JSON.stringify(ctx.request.header['cookie']))
        },
        'data': ctx.request.body
    };
    if (contentType && contentType.indexOf('multipart') > -1) {
        var rawRequestBody = await rawBody(ctx.req);
        requestBody.data = rawRequestBody;
    }
    var res = await axios(requestBody);
    var endTime = new Date().getTime();
    console.log('------------------------------------------');
    console.log('请求时间:' + moment(startTime).format('YYYY-MM-DD HH:mm:ss'));
    console.log('请求地址:' + ctx.request.url);
    console.log('真实地址:' + config.api[apiName] + ctx.url);
    console.log('花费时间:' + (endTime - startTime) + 'ms');
    console.log('------------------------------------------');
    ctx.response.body = res.data;
};
