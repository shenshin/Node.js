/*
Write a program that accepts one or more numbers as command-line arguments
  and prints the sum of those numbers to the console (stdout).
*/
process.stdout.write(`${process.argv.slice(2).reduce((s, e) => parseInt(s, 10) + parseInt(e, 10))}\n`);
