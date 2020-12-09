/*
  Create a file named http-json-api-server.js.

  Write an HTTP server that serves JSON data when it receives a GET request
  to the path '/api/parsetime'. Expect the request to contain a query string
  with a key 'iso' and an ISO-format time as the value.

  For example:

  /api/parsetime?iso=2013-08-10T12:10:15.474Z

  The JSON response should contain only 'hour', 'minute' and 'second'
  properties. For example:

     {
       "hour": 14,
       "minute": 23,
       "second": 15
     }

  Add second endpoint for the path '/api/unixtime' which accepts the same
  query string but returns UNIX epoch time in milliseconds (the number of
  milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.
  For example:

     { "unixtime": 1376136615474 }

  Your server should listen on the port provided by the first argument to
  your program.

*/
const express = require('express');

const app = express();

function handleRequest(req, res, action) {
  const { iso } = req.query;
  const time = new Date(iso);
  const timeObject = action(time);
  res.status(200);
  res.type('application/json');
  res.end(JSON.stringify(timeObject));
}

app.get('/api/parsetime', (req, res) => {
  handleRequest(req, res, (time) => ({
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
  }));
});

app.get('/api/unixtime', (req, res) => {
  handleRequest(req, res, (time) => ({
    unixtime: time.getTime(),
  }));
});

app.listen(process.argv[2]);
