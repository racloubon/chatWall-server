'use strict';
const noswears = require('no-swears');

const noSwearWordsPromise = (badString) => {
  return new Promise((resolve, reject) => {
    noswears.filter(badString, goodString => {
      resolve(goodString);
    });
  }
  );
};

module.exports = noSwearWordsPromise;
