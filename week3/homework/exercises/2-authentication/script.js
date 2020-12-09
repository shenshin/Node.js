/* eslint-disable no-console */
/**
 * 2. Authentication
 *
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */
const fetch = require('node-fetch');
const base64 = require('base-64');

async function checkStatus(res) {
  if (res.status === 401) {
    const response = await res.json();
    throw new Error(response.error.message);
  }
  return res;
}

async function printBooks() {
  // YOUR CODE GOES IN HERE
  const credentials = base64.encode('admin:hvgX8KlVEa');
  try {
    let response = await fetch('https://restapiabasicauthe-sandbox.mxapps.io/api/books', { headers: { Authorization: `Basic ${credentials}` } });
    response = await checkStatus(response);
    const books = await response.json();
    console.log(books);
  } catch (err) {
    console.error('Response error:', err.message);
  }
}

printBooks();
