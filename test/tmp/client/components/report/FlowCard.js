/*
 * @Author:
 * @Date: 2018-07-05 11:40:03
 * @Description: ''
 * @Last Modified by: za-zhouchiye
 * @Last Modified time: 2018-07-05 16:57:52
 * @ToDo: ''
 */
import React, { Component } from 'react';
import { mapPropTypes } from './../mapProps';
import { Icon } from 'antd';

class FlowCard extends Component {
    render() {
        const { current, flowList } = this.props;
        return (
            <div className='flow-container'>
                {flowList.map((item, index) => {
                    return (
                        <div key={index} className={'flow-node ' + ((index === current) ? 'active' : '')}>
                            <div className={'number-node ' + ((index <= current) ? 'active' : '')} >
                                {
                                    (index >= current) ? index + 1 : <Icon type='check' />
                                }
                            </div>
                            <p>{item}</p>
                            {
                                (index === current) && <div className='active-arrow' />
                            }

                        </div>
                    );
                })}
            </div>
        );
    }
}

FlowCard.propTypes = mapPropTypes;
export default FlowCard;
