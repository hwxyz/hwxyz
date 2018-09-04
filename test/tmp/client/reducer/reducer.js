import { combineReducers } from 'redux';
import { ADD_TITLE, SAVE_INFO, UPDATE_PATH, LANGUAGE } from '../action/action';

function addTitle(state = 'React', action) {
    switch (action.type) {
    case ADD_TITLE:
        return 'React+Koa2+Webpack+SSR+Redux';
    default:
        return state;
    }
}

function userInfo(state = {
    'loginName': '未登录',
    'userId': null,
    'userRealName': '未登录'
}, action) {
    switch (action.type) {
    case SAVE_INFO:
        return Object.assign({}, action.obj);
    default:
        return state;
    }
}

// 国际化
function LANG(state = {}, action) {
    switch (action.type) {
    case LANGUAGE:
        return Object.assign({}, action.obj);
    default:
        return state;
    }
}

// 根据路由选择菜单
function currentPath(state = '', action) {
    switch (action.type) {
    case UPDATE_PATH:
        return action.str;
    default:
        return state;
    }
}

const todoApp = combineReducers({
    addTitle,
    userInfo,
    LANG,
    currentPath
});

export default todoApp;
