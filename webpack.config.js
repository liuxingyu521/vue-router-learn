var path = require('path');

// var webpackConfig = {
module.exports ={
    entry: './src/main',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: path.resolve(__dirname, '/node_modules/')
        }]
    },
    devServer: {
        host: '0.0.0.0'
    }
    // resolve: {
    //     alias: {
    //         'vue': 'vue/dist/vue.js'
    //     }
    // }
}


