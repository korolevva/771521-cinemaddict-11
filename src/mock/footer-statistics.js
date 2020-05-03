import {getRandomNumber} from "../utils/common.js";

const generateCountFilms = () => {
  return getRandomNumber(1, 1000000);
};

export {generateCountFilms};
