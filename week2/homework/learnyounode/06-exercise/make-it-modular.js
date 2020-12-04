/* eslint-disable no-console */
const myModule = require('./mymodule.js');

const dirname = process.argv[2];
const extension = process.argv[3];

myModule(dirname, extension, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data.join('\n'));
  }
});
