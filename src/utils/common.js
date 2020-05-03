export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomNumber(0, array.length);

  return array[randomIndex];
};

export const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};
