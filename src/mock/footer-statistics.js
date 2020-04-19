import {getRandomIntegerNumber} from "../utils.js";

const generateCountFilms = () => {
  return getRandomIntegerNumber(1, 1000000);
};

export {generateCountFilms};
