var webpack = require('webpack');
var path = require('path')

module.exports = {
    debug: true,
    devtool: 'source-map',
    entry:   {
        inject: './src/sharing_inject.js',
        popup: './src/popup.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: "[name]-bundle.js",
    },
    resolve: {
        extensions: ['', '.js']
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};