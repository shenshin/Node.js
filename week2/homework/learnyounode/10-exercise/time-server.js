/* eslint-disable no-console */
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
