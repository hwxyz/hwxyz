/*
 * action 类型
 */
export const ADD_TITLE = 'ADD_TITLE';
export const SAVE_INFO = 'SAVE_INFO';
export const UPDATE_PATH = 'UPDATE_PATH';
export const LANGUAGE = 'LANGUAGE';

/*
 * action 创建函数
 */

export function addTitle() {
    return { type: ADD_TITLE };
}

export function saveInfo(obj) {
    return { type: SAVE_INFO, obj };
}

export function updatePath(str) {
    return { type: UPDATE_PATH, str };
}
export function updateLang(obj) {
    return { type: LANGUAGE, obj };
}
