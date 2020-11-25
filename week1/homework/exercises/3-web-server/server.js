/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

function echo(value) {
  process.stdout.write(`${value}\n`); // this is 'console.log'
}

function sendResponse(response, code, type, content) {
  if (type) {
    response.writeHead(code, { 'Content-Type': type });
  } else {
    response.writeHead(code);
  }
  response.end(content, 'utf8');
}

// show 404 error page
function showEnoentPage(response) {
  const enoentPage = '404.html';
  fs.readFile(path.join(__dirname, 'public', enoentPage), 'utf8', (err, data) => {
    if (err) {
      echo(`Can not find ${enoentPage}`);
    } else {
      sendResponse(response, 404, 'text/html', data);
    }
  });
}

// Check requested file extension and set content type
function setContentType(extension) {
  switch (extension) {
    case '.js':
      return 'text/javascript';
    case '.css':
      return 'text/css';
    default:
      return 'text/html';
  }
}

function showPage(res, filePath) {
  // extension of requested file
  const extension = path.extname(filePath);
  const contentType = setContentType(extension);
  // add '.html' if page name is just 'index'
  const condition = contentType === 'text/html' && extension === '';
  fs.readFile(condition ? `${filePath}.html` : filePath, 'utf8', (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') showEnoentPage(res);
      else sendResponse(res, 500, null, `Server Error: ${err.code}`);
    } else {
      sendResponse(res, 200, contentType, content);
    }
  });
}

// create a server
const server = http.createServer((req, res) => {
  // YOUR CODE GOES IN HERE
  // path of the requested file
  const filePath = path.join(__dirname, 'public', req.url === '/'
    ? 'index.html' : req.url);
  showPage(res, filePath);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  echo(`Server is running on port ${PORT}`);
}); // The server starts to listen on port 3000
