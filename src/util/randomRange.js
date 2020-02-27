const randomRange = (min, max) => {
  return min + Math.random() * (max - min);
};

const randomRangeInt = (min, max) => {
  return Math.round(randomRange(min, max));
};

const getRandomArrayIndex = arr => {
  try {
    // reject if supplied object is not an array or
    // is an array with no items.
    if (!Array.isArray(arr) || arr.length <= 0) {
      throw new Error(
        `Expected array with at least one item. Received ${arr} (${typeof arr})`
      );
    }

    // if the supplied argument meets all requiremments,
    // fish out a random element to return
    const maxIndex = arr.length - 1;
    return randomRangeInt(0, maxIndex);
  } catch (e) {
    throw e;
  }
};

module.exports.randomRange = randomRange;
module.exports.randomRangeInt = randomRangeInt;
module.exports.getRandomArrayIndex = getRandomArrayIndex;
