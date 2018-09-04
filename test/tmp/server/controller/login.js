/*
 * @Author: za-zhouchiye
 * @Date: 2018-07-04 12:01:11
 * @Description: ''
 * @Last Modified by: za-zhouchiye
 * @Last Modified time: 2018-07-27 11:46:21
 * @ToDo: ''
 */
var T = require('../utils.js');
var config = require('../../config');
var axios = require('axios');
var Cookies = require('universal-cookie');
var toLogin = function(ctx) {
    var url = T.getLoginUrl(ctx);
    // console.log("未登录", url);
    ctx.redirect(url);
};
module.exports = async function(ctx, next) {
    if (ctx.url.indexOf('webpack') > -1 || ctx.url.indexOf('.') > -1) return next();
    // console.log('url~~~~~~~~~~~', ctx.url);
    // console.log('islogin~~~~~~~~~~~', ctx.session.islogin);
    // 退出登录
    if (ctx.url === '/logout') {
        var log = await axios({
            method: 'POST',
            url: `${config.protocol + config.api.sso}/logout.json`,
            headers: { 'xticket': ctx.session.ticket }
        });
        if (log.data.success) {
            ctx.session.islogin = false;
            ctx.session.ticket = undefined;
            ctx.session.userInfo = undefined;
            toLogin(ctx);
            return;
        }
    }

    // 已登录
    if (ctx.session.islogin) {
        await next();
    } else {
        var cookies = new Cookies(ctx.request.header.cookie);
        var ticket = T.urlQuery('ticket', ctx.url);
        if (!ticket) ticket = ctx.session.ticket ? ctx.session.ticket : cookies.get('ticket');
        if (!ticket) {
            toLogin(ctx);
            return;
        }
        // console.log('ticket~~~~~~~~~~~', ticket)

        var res = await axios.post(`${config.protocol + config.api.sso}/validate4cors.json`, {
            service: 'productCenter',
            ticket: ticket
        });
        // console.log('res', res.data.value);
        var data = JSON.parse(T.decrypt(res.data.value));
        // console.log("res解密：", data)
        if (data.userId) {
            ctx.session.islogin = true;
            ctx.session.ticket = ticket;
            ctx.session.userInfo = data;
            await next();
        } else {
            ctx.session.islogin = false;
            ctx.session.ticket = undefined;
        }
    }
};
