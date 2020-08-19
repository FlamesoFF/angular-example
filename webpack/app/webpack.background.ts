import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";
import { devmode, dist, prod, src } from "../core/webpack.settings";
import webpackMerge from "webpack-merge";
import { COMMON_CONFIG } from '../core/webpack.common';

export const BACKGROUND_CONFIG: webpack.Configuration = webpackMerge({
    entry:  `${src}/app/background-script/main.ts`,
    output: {
        path: path.resolve(__dirname, `${devmode ? dist : prod}/background-script/`),
        filename: 'background.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: 'to-string-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true
                        }
                    }
                ],
                sideEffects: false
            }
        ]
    },

    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            'html'
        ]
    },
    /*
    *
    * ASSETS & PREPARATIONS
    *
    */

    plugins: [
        new CopyWebpackPlugin([
            {
                from: `${src}/app/background-script/background.html`,
                to: 'index.[ext]'
            }
        ]),

        // new BundleAnalyzerPlugin({
        //     analyzerPort: 8890
        // })
    ],

    watch: true
}, COMMON_CONFIG);