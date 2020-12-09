/* eslint-disable no-console */
/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */
const fetch = require('node-fetch');

const url = 'https://reservation100-sandbox.mxapps.io/api/reservations';

async function makeReservation(name, numberOfPeople) {
  // YOUR CODE GOES IN HERE
  try {
    let response = await fetch(url, {
      method: 'post',
      body: JSON.stringify({ name, numberOfPeople }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 200) {
      response = await response.json();
      console.log(response.message);
    } else {
      throw new Error(`status: ${response.status}, description: ${response.statusText}`);
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

makeReservation('Alexander Shenshin', 3);
