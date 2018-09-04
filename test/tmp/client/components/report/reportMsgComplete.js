/*
 * @Author: wb_weilin
 * @Date: 2018-07-05 14:10:47
 * @Description: ''
 * @Last Modified by: wb_weilin
 * @Last Modified time: 2018-07-05 17:46:54
 * @ToDo: ''
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Button } from 'antd';

class reportMsgComplete extends Component {
    componentDidMount() {
        // const { updateCurrentPath, location } = this.props;
        // updateCurrentPath(location.pathname);
    }
    render() {
        return (
            <div>
                <p>article 1</p>
                <Link to='/'> 回去吧 </Link>
            </div>
        );
    }
}
export default reportMsgComplete;
