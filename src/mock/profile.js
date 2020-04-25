import {getRandomNumber} from "../utils.js";

const getGrade = () => {
  const randomGrade = getRandomNumber(0, 25);
  let grade = ``;

  if (randomGrade >= 1 && randomGrade <= 10) {
    grade = `novice`;
  } else if (randomGrade >= 11 && randomGrade <= 20) {
    grade = `fun`;
  } else {
    grade = `movie buff`;
  }

  return grade;
};

const generateProfileData = () => {
  return {
    avatar: `bitmap@2x.png`,
    grade: getGrade(),
  };
};

export {generateProfileData};
