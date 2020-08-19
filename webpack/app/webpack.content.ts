import CopyWebpackPlugin from 'copy-webpack-plugin';
import * as path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";
import { assets, devmode, dist, prod, src } from "../core/webpack.settings";
import webpackMerge from "webpack-merge";
import { COMMON_CONFIG } from '../core/webpack.common';

export const CONTENT_CONFIG: webpack.Configuration = webpackMerge({
    entry: `${src}/app/content-script/main.ts`,

    output: {
        path: path.resolve(__dirname, `${devmode ? dist : prod}/`),
        filename: 'content.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [{
                    loader: 'style-loader'
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
                test: /\.js?$/,
                use: {
                    loader: 'babel-loader',
                    query: { compact: true }
                },
                sideEffects: false
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
            },
            {
                test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader?name=assets/[name].[ext]'
                }, {
                    loader: 'raw-loader'
                }]
            }
        ]
    },

    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            'html',
            'scss',
            'css'
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                from: assets,
                to: `assets`
            },
            {
                from: `${src}/libs`,
                to: 'libs'
            },
            // Manifest
            {
                from: `${src}/manifest.json`,

                // transform: (content, dir) => {
                //     const packageJson = require(path.resolve(__dirname, `../../package.json`));
                //     const { version } = packageJson;
                //     let data = JSON.parse(content.toString());

                //     data.version  = version;

                //     return JSON.stringify(data);
                // },

                to: 'manifest.json'
            }
        ]),

        // new BundleAnalyzerPlugin({
        //     analyzerPort: 8889
        // })
    ],

    watch: true

}, COMMON_CONFIG);