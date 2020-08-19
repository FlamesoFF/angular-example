const fs = require('fs');
const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
const basePath = './dist';

app.use('/assets', express.static(`${basePath}/assets`));
app.use('/libs', express.static(`${basePath}/libs`));
app.use('/style', express.static(`${basePath}/style`));
app.use('/', express.static(`${basePath}/`));

app.get('/app', function(req, res) {
    fs.readFile('./dist/app/index.html', function (err, html) {
        res.write(html);
    });
});
app.listen(port);

console.log(`Server running on: http://${hostname}:${port}/app`);