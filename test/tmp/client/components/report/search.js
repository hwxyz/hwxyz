/*
 * @Author:
 * @Date: 2018-07-02 11:59:07
 * @Description: '理赔报案检索'
 * @Last Modified by: za-zhouchiye
 * @Last Modified time: 2018-07-06 14:58:47
 * @ToDo: ''
 */
import React, { Component } from 'react';
import { mapPropTypes } from '../mapProps';
import { Form, Input, Button, DatePicker, Select, Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

class Search extends Component {
    componentDidMount() {
        const { updateCurrentPath, location } = this.props;
        updateCurrentPath(location.pathname);
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    submit = () => {
        const { history } = this.props;
        confirm({
            title: '提示',
            width: 400,
            style: { top: '30%' },
            content: <div><div>查询不到客户信息</div><div>是否创建新报案</div></div>,
            onOk() {
                history.push('/report/create');
            }
        });
    }
    render() {
        const { LANG } = this.props.state;
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
        return (
            <div>
                <h4 style={{ marginBottom: 40 }}>理赔报案检索</h4>
                <Form layout='vertical'>
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
                        label={LANG.policyNo}
                    >
                        <Input {...inputLayout} placeholder={LANG.text_input} />
                    </FormItem>
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
                    <FormItem>
                        <Button size='large' style={{ width: 200, marginTop: 100 }} type='primary' onClick={this.submit}>开始检索</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
Search.propTypes = mapPropTypes;
export default Search;
