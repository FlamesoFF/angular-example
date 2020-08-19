import CopyWebpackPlugin from 'copy-webpack-plugin';
import * as fs from "fs";
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import * as webpack from "webpack";
import webpackMerge from "webpack-merge";
import { COMMON_CONFIG } from "../core/webpack.common";
import { devmode, dist, prod, src } from "../core/webpack.settings";
import {AngularCompilerPlugin} from '@ngtools/webpack';

export const WINDOW_CONFIG: webpack.Configuration = webpackMerge({
    entry: {
        window: `${src}/app/window/app.main.ts`
    },

    output: {
        path: path.resolve(__dirname, `${devmode ? dist : prod}/window/`),
        filename: 'window.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                use: {
                    loader: 'babel-loader',
                    query: { compact: true }
                },
                sideEffects: false
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [
                    'html-loader'
                ]
            },
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
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: './assets/images/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                use: [
                    'file-loader'
                ]
            },

            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
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
            'css',
            'woff2'
        ],
        modules: ['node_modules']
    },

    plugins: [
        new HardSourceWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: `node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css`,
                to: 'style'
            }
        ]),
        new HtmlWebpackPlugin({
            title: 'Grabber App',
            version: JSON.parse(
                fs.readFileSync(
                    `${src}/manifest.json`,
                    { encoding: 'utf8' }
                )
            ).version,
            template: `${src}/app/window/index.ejs`,
            chunks: ['window'],

        })

        // new BundleAnalyzerPlugin({
        //     analyzerPort: 8888
        // })
    ]
}, COMMON_CONFIG);