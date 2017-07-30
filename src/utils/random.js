const random = (minimum = 0, maximum = 10) =>
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

export default random;
