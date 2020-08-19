import * as webpack from 'webpack';
import { WINDOW_CONFIG } from './app/webpack.window';
import { BACKGROUND_CONFIG } from './app/webpack.background';
import { CONTENT_CONFIG } from './app/webpack.content';



const chunkGroupOptions = {
    chunks: "all",
    enforce: true
}


const configs: webpack.Configuration[] = [
    // App bundle
    WINDOW_CONFIG,

    // Content bundle
    CONTENT_CONFIG,

    //Background bundle
    BACKGROUND_CONFIG
];

export default configs;
