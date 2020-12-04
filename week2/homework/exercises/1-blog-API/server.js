/* eslint-disable no-console */
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

function getFilePath(name) {
  return path.join(__dirname, 'blogs', name);
}

function responseOK(res, message = 'ok') {
  res.status(200);
  res.end(message);
}

function responseFailure(res, message = 'bad request') {
  res.status(404);
  res.end(message);
}

/**
 * Checks request body for the necessary fields
 */
function bodyError(req, res, ...fields) {
  const { body } = req;
  const fieldsError = [body, ...fields.map((f) => body[f])]
    .some((prop) => prop === undefined);
  if (fieldsError) {
    responseFailure(res, `Please specify '${fields.join("', '")}' field${fields.length > 1 ? 's' : ''}`);
    return true;
  }
  return false;
}

/**
 * Sends an object to a client as a JSON string
 */
function sendJSON(res, object) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.end(JSON.stringify(object));
}

/**
 * Service function that reads blog title from the parameters
 * and loads corresponfing blog file
 * @param {*} req request
 * @param {*} res response
 * @param {function} action callback to be performed on success
 * @param {function} error callback printing the error
 */
function parseParams(req, res, error, action) {
  const { title } = req.params;
  const file = getFilePath(title);
  if (!fs.existsSync(file)) {
    responseFailure(res, error(title));
    return;
  }
  action(title, file);
}

/**
 * Creates new posts (blogs)
 */
function writeBlog(req, res) {
  if (bodyError(req, res, 'title', 'content')) return;
  const { title, content } = req.body;
  fs.writeFileSync(getFilePath(title), content);
  responseOK(res, `Created blog '${title}'`);
}

/**
 * Updates existing posts
 */
function updatePost(req, res) {
  parseParams(
    req,
    res,
    (title) => `Update error. Post with the title '${title}' doesn't exist`,
    (title, file) => {
      if (bodyError(req, res, 'content')) return;
      fs.writeFileSync(file, req.body.content);
      responseOK(res, `Post '${title}' was updated`);
    },
  );
}

/**
 * Deletes posts
 */
function deleteBlog(req, res) {
  parseParams(
    req,
    res,
    (title) => `Delete error. Blog with the title '${title}' doesn't exist`,
    (title, file) => {
      fs.unlinkSync(file);
      responseOK(res, `Blog '${title}' was deleted`);
    },
  );
}

/**
 * Reads selected post and sends to the client
 */
function readBlog(req, res) {
  parseParams(
    req,
    res,
    (title) => `Read error. Blog with the title '${title}' doesn't exist`,
    (title, file) => {
      const content = fs.readFileSync(file, 'utf8');
      sendJSON(res, { title, content });
    },
  );
}

/**
 * Reads all posts and sends to the client
 */
function readAll(req, res) {
  const files = fs.readdirSync('blogs', 'utf8');
  const blogs = files.map((title) => {
    const file = getFilePath(title);
    const content = fs.readFileSync(file, 'utf8');
    return { title, content };
  });
  sendJSON(res, blogs);
}

// YOUR CODE GOES IN HERE
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.get('/blogs', readAll);
app.get('/blogs/:title', readBlog);
app.post('/blogs', writeBlog);
app.put('/posts/:title', updatePost);
app.put('/posts', (req, res) => {
  responseFailure(res, 'Specify the post name');
});
app.delete('/blogs/:title', deleteBlog);

app.listen(3000);
