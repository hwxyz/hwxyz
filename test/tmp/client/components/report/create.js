/*
 * @Author:
 * @Date: 2018-07-06 14:00:07
 * @Description: '创建报案'
 * @Last Modified by: za-zhouchiye
 * @Last Modified time: 2018-07-06 15:03:02
 * @ToDo: ''
 */
import React, { Component } from 'react';
import { mapPropTypes } from '../mapProps';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import FlowCard from '../report/FlowCard';
const FormItem = Form.Item;
const Option = Select.Option;

class Create extends Component {
    state = {
        currentNode: 0,
        flowList: ['创建报案', '报案登记', '报案信息完善']
    }
    componentDidMount() {
        const { updateCurrentPath } = this.props;
        updateCurrentPath('/');
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    submit = () => {
        console.log(`next`);
    }
    render() {
        const { LANG } = this.props.state;
        const { history } = this.props;
        const { currentNode, flowList } = this.state;
        const inputLayout = {
            style: {
                width: 300
            }
        };
        const fixLayout = {
            style: {
                position: 'absolute',
                marginLeft: 340,
                marginTop: -93
            }
        };
        const fixLayout2 = {
            style: {
                position: 'absolute',
                marginLeft: 680,
                marginTop: -186
            }
        };
        return (
            <div>
                <FlowCard current={currentNode} flowList={flowList} />
                <Form layout='vertical' style={{marginTop: 55}}>
                    <FormItem
                        label={LANG.name}
                    >
                        <Input {...inputLayout} placeholder={LANG.text_input} />
                    </FormItem>
                    <FormItem
                        label={LANG.date_of_birth}
                        {...fixLayout}
                    >
                        <DatePicker {...inputLayout} />
                    </FormItem>
                    <FormItem
                        label={LANG.id_type}
                    >
                        <Select {...inputLayout} defaultValue={'1'} placeholder={LANG.text_select} onChange={this.handleChange}>
                            <Option value='1'>居民身份证</Option>
                            <Option value='2'>户口簿</Option>
                            <Option value='3'>出生医学证明</Option>
                            <Option value='4'>军官证</Option>
                            <Option value='5'>普通护照</Option>
                            <Option value='6'>台湾居民来往大陆通行证</Option>
                            <Option value='7'>港澳同胞通行证</Option>
                            <Option value='8'>外国公民长期居住证</Option>
                            <Option value='9'>其他</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label={LANG.id_no}
                        {...fixLayout}
                    >
                        <Input {...inputLayout} placeholder={LANG.text_input} />
                    </FormItem>
                    <FormItem
                        label={LANG.genderText}
                        {...fixLayout2}
                    >
                        <Input {...inputLayout} placeholder={LANG.text_input} />
                    </FormItem>
                    <FormItem>
                        <Button size='large' style={{ width: 200, marginTop: 100 }} type='primary' ghost onClick={() => { history.push('/'); }}>退出</Button>
                        <Button size='large' style={{ width: 200, marginTop: 100, marginLeft: 30 }} type='primary' onClick={this.submit}>下一步</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
Create.propTypes = mapPropTypes;
export default Create;
