import {FilterType} from "../const.js";

export const getFilmsInWatchList = (films) => {
  return films.filter((film) => film.userDetails.isAddToWatchlist);
};

export const getWatchedFilms = (films) => {
  return films.filter((film) => film.userDetails.isAlreadyWatched);
};

export const getFavoriteFilms = (films) => {
  return films.filter((film) => film.userDetails.isFavorite);
};


export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return getFilmsInWatchList(films);
    case FilterType.HISTORY:
      return getWatchedFilms(films);
    case FilterType.FAVORITES:
      return getFavoriteFilms(films);
  }
  return films;
};
