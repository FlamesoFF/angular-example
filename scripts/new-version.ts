import * as fs from 'fs';
import {stdin, stdout} from 'process';
import * as readline from 'readline';

const packagePath = './package.json';
const manifestPath = './src/manifest.json';


const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

let packageContent = fs.readFileSync('./package.json', {encoding: 'utf8'});
let manifestContent = fs.readFileSync('./src/manifest.json', {encoding: 'utf8'});
const currentVersion = JSON.parse(packageContent).version;

console.log(`Current version: ${currentVersion}.\nNew version: `);
rl.on('line', (version) => {
    replaceVersion(version.toString().trim());
    rl.close();
});

function replaceVersion(version: string) {
    //packageContent.replace(/"version": "([\d.]+)"/gi, `"version": "${version}"`);
    packageContent = packageContent.replace(/"version": "(.+)"/gi, `"version": "${version}"`);
    manifestContent = manifestContent.replace(/"version": "(.+)"/gi, `"version": "${version}"`);

    fs.writeFileSync(packagePath, packageContent);
    fs.writeFileSync(manifestPath, manifestContent);

    process.exit();
}