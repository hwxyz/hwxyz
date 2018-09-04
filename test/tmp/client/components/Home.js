import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { mapPropTypes } from './mapProps';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { updateCurrentPath, location } = this.props;
        updateCurrentPath(location.pathname);
    }
    render() {
        return (
            <div>
                <h1>I <i className='iconfont icon-liked' /> ShangHai!</h1>
                <Link to='/article'>走一个</Link><br /><br />
                <h2>Example</h2>
                <Button size='large' style={{width: 200}} type='primary' ghost>上一步</Button><br /><br />
                <Button size='large' style={{width: 200}} type='primary'>下一步</Button><br /><br />
                <Button style={{width: 80}} type='primary' ghost>否</Button><br /><br />
                <Button style={{width: 80}} type='primary'>是</Button><br /><br />
                <Button style={{width: 84}} type='primary' className='bg-primary' icon='upload'>上传</Button>
                <br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        );
    }
}
Home.propTypes = mapPropTypes;
export default Home;
