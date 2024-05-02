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
        if (err) {
            if(err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html'});
                    res.end(content, 'utf8')
                })
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`)
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html'})
            res.end(content, 'utf8')
        }

    })


})

const PORT = process.env.PORT || 8080

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))