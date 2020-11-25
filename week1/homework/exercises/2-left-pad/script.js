/**
 ** Exercise 2: To the left, to the left...
 *
 * Copy and paste your code from the previous exercise.
 * Replace the function `padLeft` to use
 * this new NPM package called `left-pad` instead then
 * Pad the numbers to 8 characters to confirm that it works correctly
 *
 */

const numbers = ['12', '846', '2', '1236'];

// YOUR CODE GOES HERE
const leftPad = require('left-pad');

// I use process.stdout because ESLint is complaining about console.log
function print(value) {
  process.stdout.write(`${value}\n`);
}

numbers.forEach((number) => {
  print(leftPad(number, 8));
});
//      12
//     846
//       2
//    1236

// However, documentation tells that package 'left-pad'
// has been deprecated, so, the best way to accomplish the required task
// is to use String.prototype.padStart() :

numbers.forEach((number) => {
  print(number.padStart(8));
});
//      12
//     846
//       2
//    1236
