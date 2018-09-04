import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { mapPropTypes } from './mapProps';
import FlowCard from './report/FlowCard';
import { Button } from 'antd';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNode: 0,
            flowList: ['创建报案', '报案登记', '报案信息完善']
        };
    }
    goPrevious = () => {
        if (this.state.currentNode > 0) {
            this.setState({
                currentNode: this.state.currentNode - 1
            });
        }
    }
    goNext = () => {
        if (this.state.currentNode < 2) {
            this.setState({
                currentNode: this.state.currentNode + 1
            });
        }
    }
    componentDidMount() {
    }
    render() {
        const { currentNode, flowList } = this.state;
        return (
            <div>
                <FlowCard current={currentNode} flowList={flowList} />
                <p>article 1</p>
                <Link to='/filing'>回去</Link><br /><br />
                <Button size='large' style={{ width: 200 }} type='primary' ghost onClick={this.goPrevious}>{currentNode > 0 ? '上一步' : '退回'}</Button><br /><br />
                <Button size='large' style={{ width: 200 }} type='primary' onClick={this.goNext}>{currentNode < 2 ? '下一步' : '完成'}</Button><br /><br />
            </div>
        );
    }
}
Article.propTypes = mapPropTypes;
export default Article;
