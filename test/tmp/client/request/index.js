/*
 * @Author: za-zhouchiye
 * @Date: 2018-07-04 12:04:37
 * @Description: ''
 * @Last Modified by: za-zhouchiye
 * @Last Modified time: 2018-07-20 10:37:13
 * @ToDo: ''
 */
import config from '../../config';
import axios from 'axios';
import jsonp from 'jsonp';
import Lockr from 'lockr';
import { message } from 'antd';
let LANG = '';

// 拦截器
axios.interceptors.response.use((res) => {
    // Do something with response data
    // 接口返回101未登录时，跳转重新登录
    if (res.data.code === '101') {
        window.location.href = '/logout';
    }

    // 统一错误消息
    if (!res.data.success && !res.data.userId) {
        message.error(LANG[res.data.errorCode] || LANG.system_unusual_againTry);
    }
    return res;
}, (error) => {
    // Do something with response error
    message.error(LANG.system_unusual_againTry);
    return Promise.reject(error);
});

const req = {
    // 获取用户信息
    getUser: async() => {
        const res = await axios('/getUserInfo');
        return res.data;
    },

    // 国际化
    getlLang: async(currentLang) => {
        const res = await new Promise((resolve, reject) => {
            jsonp(`${config.protocol}${config.api.i18n}/i18n/resource/download.json?namespace=${config.namespace}&lang=${currentLang}`,
                {
                    timeout: 1500
                }, (err, data) => {
                    if (err) {
                        // 超时或出错时取最后一次缓存的国际化数据
                        resolve(Lockr.get('lang_data'));
                        console.log(err.message);
                    } else {
                        Lockr.set('lang_data', data.value);
                        resolve(data.value);
                    }
                });
        });
        LANG = res;
        return res;
    }
};

export default req;
