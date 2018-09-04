const ENV = {
    default: require('./default.json'),
    test: require('./test.json'),
    prd: require('./prd.json')
}[process.env.DEPLOY_ENV || 'default'];

module.exports = ENV;
