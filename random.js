function randomBetween(min, max) {
  const randomNumber = Math.random() * (max - min) + min;
  return Math.round(randomNumber, 0);
}

module.exports = randomBetween;