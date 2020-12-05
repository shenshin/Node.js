/* eslint-disable no-console */

/* 
  Create a file named time-server.js.  
   
  Write a TCP time server!  
   
  Your server should listen to TCP connections on the port provided by the  
  first argument to your program. For each connection you must write the  
  current date & 24 hour time in the format:  
   
     "YYYY-MM-DD hh:mm"  
   
  followed by a newline character. Month, day, hour and minute must be  
  zero-filled to 2 integers. For example:  
   
     "2013-07-06 17:42"  
   
  After sending the string, close the connection.
*/

const net = require('net');

const server = net.createServer((socket) => {
  const twoDigits = (number) => `0${number}`.slice(-2);
  const d = new Date();
  socket.end(`${
    d.getFullYear()}-${
    twoDigits(d.getMonth() + 1)}-${
    twoDigits(d.getDate())} ${
    twoDigits(d.getHours())}:${
    twoDigits(d.getMinutes())}\n`);
});
server.on('error', (err) => {
  throw err;
});
server.listen(process.argv[2]);
