/**
 ** Exercise 1: Pad numbers
 *
 * In this file use the padLeft function from padLeft.js to
 * pad the numbers to exactly 4 spaces and log them to the console
 *
 * Expected output (replace the underscore with spaces):
 *
 *  ___12;
 *  __846;
 *  ____2;
 *  _1236;
 *
 * Tips:
 *   where to use `exports` and where `require`?
 */

const numbers = ['12', '846', '2', '1236'];

// YOUR CODE GOES HERE
const padLeft = require('./padLeft');

numbers.forEach((number) => {
// I use process.stdout because ESLint is complaining about console.log
  process.stdout.write(`${padLeft(number, 5, ' ')}\n`);
//   12
//  846
//    2
// 1236
});
