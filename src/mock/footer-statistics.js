import {getRandomNumber} from "../utils.js";

const generateCountFilms = () => {
  return getRandomNumber(1, 1000000);
};

export {generateCountFilms};
