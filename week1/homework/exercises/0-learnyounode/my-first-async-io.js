/*
Write a program that uses a single asynchronous filesystem operation to
  read a file and print the number of newlines it contains to the console
  (stdout), similar to running cat file | wc -l.

  The full path to the file to read will be provided as the first
  command-line argument.
*/

const fs = require('fs');

const fileName = process.argv[2];

fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) throw err;
  const numberOfSctrings = data.split('\n').length - 1;
  process.stdout.write(`${numberOfSctrings}\n`);
});
