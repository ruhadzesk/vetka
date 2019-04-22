const path = require('path');
const _ = require('underscore');
const argv = require('yargs').argv;
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SymlinkWebpackPlugin = require('symlink-webpack-plugin');
const execSync = require('child_process').execSync;

execSync('rm -rf /vagrant/build');
execSync('mkdir /vagrant/build');
execSync('sudo ln -s /opt/files /vagrant/build/img');


let webpackConfig = {
    entry: {
        bundle:  path.join(__dirname, 'app.js')
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, '..', 'build', 'static'),
        filename: '[name].js',
        library: 'app'
    },
    module: {
        loaders: [{
            test: /\.html$/,
            use: 'raw-loader'
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'style-loader'
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }],
                fallback: 'style-loader'
            })
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'index.html'),
                to: path.join(__dirname, '..', 'build', 'index.html')
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'inc/'),
                to: path.join(__dirname, '..', 'build', 'static','inc')
            }
        ]),
        // new SymlinkWebpackPlugin({
        //     origin: path.join('opt', 'files'),
        //     symlink: path.join('img'),
        //     force: true
        // }),
        // new webpack.DefinePlugin({
        //     __CONFIG__: JSON.stringify({
        //         tokenValidTime: config.tokenValidTime,
        //         client: config.client,
        //         server: _.pick(config.server, 'apiVersion'),
        //         schema: config.schema
        //     })
        // }),
        new ExtractTextPlugin('[name].css')
    ],
    resolve: {
        extensions: ['.js']
    }
};


function onBuild(err, stats) {
    console.log(stats.toString({colors: true}));
    if (err) {
        console.error(err);
    }
}
let compiler = webpack(webpackConfig);
let watchOptions = {
    poll: 300,
    aggregateTimeout: 300
};
(argv.watch) ? compiler.watch(watchOptions, onBuild) : compiler.run(onBuild);
