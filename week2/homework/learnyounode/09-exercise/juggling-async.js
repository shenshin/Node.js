/* eslint-disable no-console */

/* 
  Create a file named juggling-async.js.  
   
  This problem is the same as the previous problem (HTTP COLLECT) in that  
  you need to use http.get(). However, this time you will be provided with  
  three URLs as the first three command-line arguments.  
   
  You must collect the complete content provided to you by each of the URLs  
  and print it to the console (stdout). You don't need to print out the  
  length, just the data as a String; one line per URL. The catch is that you  
  must print them out in the same order as the URLs are provided to you as  
  command-line arguments.
*/

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
