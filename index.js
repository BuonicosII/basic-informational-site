import http from 'http'
import fs from 'fs'
import path from 'path'
import  url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {

    let filePath = path.join(__dirname, 'public', req.url === '/' ?
    'index.html' : req.url)

    fs.readFile(filePath, (err, content) => {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        res.end(content, 'utf8')
    })
})

server.listen(8080)