import * as webpack from "webpack";
import { devmode } from "./webpack.settings";
import TerserPlugin from 'terser-webpack-plugin';
import webpackMerge = require("webpack-merge");
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import CircularDependencyPlugin from 'circular-dependency-plugin';
import path from 'path';

let modePatch: webpack.Configuration = {};

// if prod
if (!devmode) {
    modePatch = {
        mode: 'production',


        // optimization: {
        //     minimizer: [
        //         new TerserPlugin({
        //             test: /\.js(\?.*)?$/i,
        //             sourceMap: devmode,
        //             terserOptions: {
        //                 ecma: '8',
        //                 // mangle: false,
        //                 // ie8: false,
        //                 // keep_classnames: true,
        //                 // keep_fnames: true
        //             }
        //         })
        //     ],
        //     minimize: !devmode
        // }

        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                maxAsyncRequests: Infinity,
                cacheGroups: {
                    default: {
                        chunks: 'async',
                        minChunks: 2,
                        priority: 10,
                    },
                    common: {
                        name: 'common',
                        chunks: 'async',
                        minChunks: 2,
                        enforce: true,
                        priority: 5,
                    },
                    vendors: false,
                    vendor: {
                        name: 'vendor',
                        chunks: 'initial',
                        enforce: true,
                        test: (module, chunks) => {
                            const moduleName = module.nameForCondition ? module.nameForCondition() : '';
                            return /[\\/]node_modules[\\/]/.test(moduleName) &&
                                !chunks.some(({ name }) => name === 'polyfills' || 'styles.css' === name);
                        },
                    },
                }
            }
        }
    };
}
// if dev
else {
    modePatch = {
        mode: 'development',
        devtool: 'inline-source-map'
    };
}

const COMMON_CONFIG: webpack.Configuration = webpackMerge({
    target: 'web',

    optimization: {
        usedExports: true,
        splitChunks: {
            minSize: 1e6 * 50,
            minChunks: 1,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                angular: {
                    test: /@angular/,
                    name: 'angular',
                    chunks: "all"
                },
                rxjs: {
                    test: /rxjs/,
                    name: 'rxjs',
                    chunks: "all"
                },
                zone: {
                    test: /zone/,
                    name: 'zone',
                    chunks: "all"
                },
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },

    resolve: {
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json'
            }),
        ]
    },

    plugins: [
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asyncronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            allowAsyncCycles: false,
            // set the current working directory for displaying module paths
            cwd: process.cwd()
        })
    ],

    watch: true
}, modePatch);


export { COMMON_CONFIG };