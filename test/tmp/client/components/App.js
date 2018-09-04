import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import Routers from '../router';
import 'normalize.css';
import '../style/index.less';
import '../asset/font/iconfont.css';
import avatar from '../asset/image/default_avatar.png';
import config from '../../config';
import { Layout, Menu, Icon, Select, Divider, Button, LocaleProvider } from 'antd';
import { mapStateToProps, mapDispatchToProps, mapPropTypes } from './mapProps';
import Cookies from 'universal-cookie';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import zh_TW from 'antd/lib/locale-provider/zh_TW';
import en_US from 'antd/lib/locale-provider/en_US';
import ja_JP from 'antd/lib/locale-provider/ja_JP';
const { Header, Sider, Content } = Layout;
const Option = Select.Option;
const cookies = new Cookies();
const antdLocale = {
    zh_CN: zh_CN,
    zh_TW: zh_TW,
    en_US: en_US,
    ja_JP: ja_JP
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCollaps: false,
            collapsed: false,
            avatar: avatar
        };
    }
    componentDidMount() {
        this.props.updateUserInfo();
        if (!cookies.get('lang')) {
            cookies.set('lang', config.default_lang, { path: '/' });
        }
        const currentLang = cookies.get('lang');
        this.props.updateLanguage(currentLang);
    }

    // 隐藏菜单
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    // 退出登录
    logout = () => {
        window.location.href = '/logout';
    }

    // 选择语言
    handleChange = (value) => {
        cookies.set('lang', value, { path: '/' });
        this.props.updateLanguage(value);
    }
    render() {
        const { avatar } = this.state;
        const { LANG } = this.props.state;
        const currentLang = cookies.get('lang');

        return (
            <Layout className='layout'>
                <Header className='header'>
                    <i className='logo' />
                    <span className='title'>报案中心后台</span>
                    {
                        this.state.showCollaps
                            ? <Icon
                                className='trigger'
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            /> : ''
                    }
                    <div className='header-right'>
                        <Select defaultValue={currentLang} placeholder='Language' style={{ width: 100 }} onChange={this.handleChange}>
                            {
                                config.language.map(item => {
                                    return <Option value={item.key} key={item.key}>{item.name}</Option>;
                                })
                            }
                        </Select>
                        <Divider type='vertical' />
                        <span className='user'>
                            <img className='avatar' src={avatar} />
                            <span className='name' >{this.props.state.userInfo.userRealName}</span>
                        </span>
                        <Button className='logout' onClick={() => { this.logout(); }}>{LANG.btn_logout}</Button>
                    </div>
                </Header>
                <LocaleProvider locale={antdLocale[currentLang] || antdLocale.en_US}>
                    <Router store={this.title}>
                        <Layout>
                            <Sider
                                trigger={null}
                                className='sider'
                                collapsible
                                collapsedWidth={0}
                                width={160}
                                collapsed={this.state.collapsed}
                            >
                                <Menu theme='light' mode='inline' selectedKeys={[this.props.state.currentPath]}>
                                    <Menu.Item key='/'>
                                        <Link to='/'>{LANG.to_report}</Link>
                                    </Menu.Item>
                                    <Menu.Item key='/filing'>
                                        <Link to='/filing'>立案</Link>
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                            <Content className='content'>
                                <Switch>
                                    {
                                        Routers.map((route) => {
                                            return <Route
                                                key={route.id}
                                                exact={route.exact}
                                                path={route.path}
                                                render={(props) => (<route.component {...this.props} {...props} />)}
                                            />;
                                        })
                                    }
                                </Switch>
                            </Content>
                        </Layout>
                    </Router>
                </LocaleProvider>
            </Layout>
        );
    }
}

App.propTypes = mapPropTypes;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
