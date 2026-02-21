const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync('test.html'));
  } else if (req.url === '/sw.js') {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    res.end(fs.readFileSync('sw.js'));
  } else if (req.url === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
    res.end(fs.readFileSync('test-encrypted.bin'));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
});
