const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const MiniCssExtractCSS = new MiniCssExtractPlugin({
    filename: 'static/main.[hash:8].css'
});

module.exports = {
    mode: 'production',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: [
            path.resolve(__dirname, '../client/main.js'),
        ],
        lodash: 'lodash',
        vendor: [
            'babel-polyfill',
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: 'static/[name].bundle.[chunkHash:8].js',
        publicPath: '/',
        path: path.resolve(__dirname, '../build'),
        chunkFilename: 'static/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // babel 转换为兼容性的 js
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'latest', 'stage-0'],
                    plugins: ['transform-remove-console']
                },
                include: path.resolve(__dirname, '../client')
            },
            {
                test: /\.css$/,
                loader: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            // {
            //     test: /\.(scss|sass)/,
            //     loader: extractSASS.extract(['css-loader', 'sass-loader', 'postcss-loader'])
            // },
            {
                test: /\.less$/,
                loader: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true
                    }
                }, 'postcss-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader?limit=8192&name=static/[name].[hash:8].[ext]'
                    }
                ]
            },
            {
                test: /\.(svg|woff|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader?name=static/[name].[hash:8].[ext]'
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: false,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            })
        ],
        //   runtimeChunk: false,
        splitChunks: {
            chunks: 'initial', // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
            minSize: 30000, // 最小尺寸，30000
            minChunks: 1, // 最小 chunk ，默认1
            maxAsyncRequests: 5, // 最大异步请求数， 默认5
            maxInitialRequests: 3, // 最大初始化请求书，默认3
            automaticNameDelimiter: '~', // 打包分隔符
            name: function() { }, // 打包后的名称，此选项可接收 function
            cacheGroups: {
                default: false,
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                    priority: 1,
                    enforce: true
                },
                lodash: {
                    name: 'lodash',
                    chunks: 'initial',
                    priority: 2,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        MiniCssExtractCSS,
        new HtmlWebpackPlugin({
            hash: false,
            title: '理赔系统',
            publicPath: '/',
            filename: 'index.html',
            template: path.resolve(__dirname, '../views/index.ejs'),
            inject: 'body'
        }),
        new webpack.ProvidePlugin({
            _: 'lodash'
        })
    ],
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.png',
            '.gif',
            '.jpg',
            '.scss',
            '.css'
        ],
        alias: {
            client: path.resolve(__dirname, '../client')
        }
    }
};
