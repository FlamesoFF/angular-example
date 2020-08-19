import * as AdmZip from 'adm-zip';
import * as fs from 'fs';
import * as path from 'path';
import Manifest = chrome.runtime.Manifest;

const folders = {
    build: 'build',
    dist: 'dist'
};

const zip = new AdmZip();
console.log('zip');
zip.addLocalFolder(path.resolve('./dist'));

const content = fs.readFileSync('./dist/manifest.json', {encoding: 'utf8'});
const manifest: Manifest = JSON.parse(content);

const version = manifest.version;

if (!fs.existsSync(folders.build)) {
    fs.mkdirSync(folders.build);
}

zip.writeZip(`./build/GG2-v${version}.zip`);

