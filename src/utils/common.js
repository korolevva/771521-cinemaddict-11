export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomNumber(0, array.length);

  return array[randomIndex];
};

export const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomListItems = (items, minCount = 1, maxCount = 5) => {
  const countItems = getRandomNumber(minCount, maxCount);

  const randomArrayItems = Array(countItems).fill(``).map(() => {
    const randomIndex = getRandomNumber(0, items.length - 1);
    return items[randomIndex];
  });

  return Array.from(new Set(randomArrayItems));
};
