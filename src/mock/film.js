import {EMOJIS} from "../const.js";
import {getRandomArrayItem, getRandomNumber, getRandomListItems} from "../utils/common.js";

export const genres = [
  `Action`,
  `Comedy`,
  `Crime`,
  `Drama`,
  `Epic`,
  `Horror`,
  `Musical`,
  `War`,
  `Western`,
];

const titlesFilms = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
];

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const directors = [
  `Steven Spielberg`,
  `Martin Scorsese`,
  `Alfred Hitchcock`,
  `Stanley Kubrick`,
  `Quentin Tarantino`,
];

const screenwriters = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Billy Wilder`,
  `Robert Towne`,
  `Quentin Tarantino`,
];

const actors = [
  `Morgan Freeman`,
  `Leonardo DiCaprio`,
  `Robert De Niro`,
  `Brad Pitt`,
  `Michael Caine`,
  `Matt Damon`,
  `Tom Hanks`,
  `Christian Bale`,
  `Al Pacino`,
  `Gary Oldman`,
];

const countries = [
  `USA`,
  `UK`,
  `Germany`,
  `France`,
  `Italy`,
  `Russia`,
];

const textComments = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const authorComments = [
  `Tim Macoveev`,
  `John Doe`,
  `Ivan Ivanov`
];

const getDescription = () => {
  const countSentence = getRandomNumber(1, 5);
  const description = Array(countSentence).fill(``).map(() => {
    return getRandomArrayItem(descriptions);
  }).join(` `);

  return description;
};

const getRating = () => {
  return (Math.random() * 10).toFixed(1);
};

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// const getRandomTime = () => {
//   const countMinutes = getRandomNumber(10, 210);
//   const hours = Math.trunc(countMinutes / 60);
//   const minutes = (countMinutes - (60 * hours));

//   if (countMinutes < 60) {
//     return `${minutes}m`;
//   } else if (countMinutes % 60 === 0) {
//     return `${hours}h`;
//   } else {
//     return `${hours}h ${minutes}m`;
//   }
// };

const generateComment = () => {
  const emoji = getRandomArrayItem(EMOJIS);
  const randomDate = getRandomDate(new Date(2019, 0, 1), new Date());
  // const formatedDate = `${randomDate.getFullYear()}/${randomDate.getMonth() + 1}/${randomDate.getDate()} ${randomDate.getHours()}:${randomDate.getMinutes()}`;

  return {
    textComment: getRandomArrayItem(textComments),
    emoji: `${emoji}.png`,
    author: getRandomArrayItem(authorComments),
    dateComment: randomDate,
    emojiType: emoji,
  };
};

const getUserDetails = () => {
  return {
    isAddToWatchlist: Math.random() > 0.5,
    isAlreadyWatched: Math.random() > 0.5,
    watchingDate: getRandomDate(new Date(2019, 0, 1), new Date()),
    isFavorite: Math.random() > 0.5,
  };
};

const generateFilm = () => {
  const countRandomComments = getRandomNumber(0, textComments.length);
  return {
    title: getRandomArrayItem(titlesFilms),
    rating: getRating(),
    releaseDate: getRandomDate(new Date(1900, 0, 1), new Date()),
    duration: getRandomNumber(10, 300),
    genres: getRandomListItems(genres),
    poster: getRandomArrayItem(posters),
    description: getDescription(),
    countComments: countRandomComments,
    originalTitle: getRandomArrayItem(titlesFilms),
    director: getRandomArrayItem(directors),
    screenwriters: getRandomListItems(screenwriters).join(`, `),
    actors: getRandomListItems(actors, 1, 5).join(`, `),
    country: getRandomListItems(countries).join(`, `),
    ageRating: `${getRandomNumber(6, 18)}+`,
    comments: textComments.map(() => generateComment()).filter((it, i) => i < countRandomComments),
    userDetails: getUserDetails(),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``).
    map(generateFilm);
};

export {generateFilm, generateFilms};
