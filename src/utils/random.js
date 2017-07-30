const random = (minimum = 0, maximum = 10) =>
  Math.floor(Math.random() * maximum) + minimum;

module.exports = random;
