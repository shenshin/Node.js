/* eslint-disable no-console */
/**
 * 4. Fun with Handlebars
 *
 * Write a javascript function that simulates playing the game cards against humanity.
 * The code should choose a subject and a punchline at random,
 * then replace them in a sentece using handlebars.
 *
 * Hints:
 * - Check the handlebars npm page for examples and documentation
 */
const handlebars = require('handlebars');

/**
 * Given an array, return an element from it chosen at random
 */
function getRandomElement(array) {
  // YOUR CODE GOES IN HERE
  return array[Math.floor(Math.random() * array.length)];
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const subjects = [
  'shark',
  'popcorn',
  'poison',
  'fork',
  'cherry',
  'toothbrush',
  'cannon',
];

const punchlines = [
  'watch movie with',
  'spread some love',
  'put on cake',
  'clean toilets',
  'go to the moon',
  'achieve world piece',
  'help people learn programing',
];

function drawCard() {
  // YOUR CODE GOES IN HERE
  const cardData = {
    subject: capitalize(getRandomElement(subjects)),
    punchline: getRandomElement(punchlines),
  };
  const card = '{{subject}} is great to {{punchline}}.';
  const template = handlebars.compile(card);
  console.log(template(cardData));
}

drawCard();

// It's easier to achieve the same result as follows, isn't it?
function drawAnotherCard() {
  const cardData = {
    subject: capitalize(getRandomElement(subjects)),
    punchline: getRandomElement(punchlines),
  };
  console.log(`${cardData.subject} is great to ${cardData.punchline}.`);
}

drawAnotherCard();
