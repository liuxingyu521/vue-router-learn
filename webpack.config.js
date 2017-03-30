var path = require('path');
var webpack = require('webpack');

module.exports = {
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
        }, {
            test: /\.less/,
            use: 'less-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000
            }
        },{
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000
            }
        }]
    },
    devServer: {
        host: '0.0.0.0'
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            'assets': path.resolve(__dirname, './src/assets')
        }
    },
    plugins: [
      new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
      })
    ]
}
