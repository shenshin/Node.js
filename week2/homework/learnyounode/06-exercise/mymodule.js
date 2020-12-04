const fs = require('fs');
const path = require('path');

module.exports = function sortDir(dirName, extension, callback) {
  fs.readdir(dirName, 'utf8', (err, files) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, files.filter((file) => path.extname(file) === `.${extension}`));
  });
};
