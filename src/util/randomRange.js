const randomRange = (min, max) => {
  return min + Math.random() * (max - min);
};

const randomRangeInt = (min, max) => {
  return Math.round(randomRange(min, max));
};

module.exports.randomRange = randomRange;
module.exports.randomRangeInt = randomRangeInt;
