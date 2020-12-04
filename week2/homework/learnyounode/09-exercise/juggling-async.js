/* eslint-disable no-console */
const http = require('http');

const urlsInParams = [2, 3, 4].map((i) => process.argv[i]);

async function fetch(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      res.setEncoding('utf8');
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function fetchURLs(urls) {
  const fetchedData = await Promise.all(urls.map(async (url) => fetch(url)));
  fetchedData.forEach((line) => {
    console.log(line);
  });
}

fetchURLs(urlsInParams);
