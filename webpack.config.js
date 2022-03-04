const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

module.exports = {

    optimization: {
        minimize: isProduction,
        minimizer: [
            new CssMinimizerPlugin({
                minify: CssMinimizerPlugin.cssoMinify,
            }),
            new TerserPlugin({
                extractComments: true
            })
        ],
    },

 
    entry: path.resolve(__dirname, '_webpack', 'index.ts'),

    output: {
        publicPath: '',
        path: path.resolve(__dirname, 'assets', 'bundle'),
        filename: isProduction ? 'bundle.min.js' : 'bundle.js'
    },

    devServer: {
        port: 5004
    },

    devtool: "source-map",

    resolve: {
        extensions: ['*', '.js', '.json', '.jsx', '.ts', '.tsx']
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "file-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(jsx)$/,
                include: path.resolve(__dirname, 'JsComponents', 'React'),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": "defaults"
                            }],
                            '@babel/preset-react'
                        ]
                    }
                }]
            }
        ]
    },


    plugins: [
        new MiniCssExtractPlugin({
            filename: isProduction ? 'bundle.min.css' : 'bundle.css'
        })
    ],

}