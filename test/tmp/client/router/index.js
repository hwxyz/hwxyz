import React from 'react';
import Bundle from '../components/Bundle';

import Home from 'bundle-loader?lazy!../components/Home';
import Article from 'bundle-loader?lazy!../components/Article';
import NotFound from 'bundle-loader?lazy!../components/404';
import Search from 'bundle-loader?lazy!../components/report/search';
import Create from 'bundle-loader?lazy!../components/report/create';

const HomePage = (props) => (
    <Bundle load={Home}>
        {(Container) => <Container {...props} />}
    </Bundle>
);

const ArticlePage = (props) => (
    <Bundle load={Article}>
        {(Container) => <Container {...props} />}
    </Bundle>
);

const NotFoundPage = (props) => (
    <Bundle load={NotFound}>
        {(Container) => <Container {...props} />}
    </Bundle>
);

const SearchPage = (props) => (
    <Bundle load={Search}>
        {(Container) => <Container {...props} />}
    </Bundle>
);

const CreatePage = (props) => (
    <Bundle load={Create}>
        {(Container) => <Container {...props} />}
    </Bundle>
);

const Routers = [
    { id: 1, path: '/filing', component: HomePage },
    { id: 2, path: '/article', component: ArticlePage },
    { id: 3, path: '/', component: SearchPage, exact: true },
    { id: 4, path: '/report', component: SearchPage, exact: true },
    { id: 5, path: '/report/create', component: CreatePage, exact: true },
    { id: 404, component: NotFoundPage },
];

export default Routers;
