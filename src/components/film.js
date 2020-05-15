import AbstractComponent from "./abstract-component.js";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

const MAX_COUNT_CHARACTERS = 140;

const creatUserDetailsMarkup = (userDetails) => {
  const {isAddToWatchlist, isAlreadyWatched, isFavorite} = userDetails;
  return (
    `<button class="film-card__controls-item${isAddToWatchlist ? `--active` : ``} button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item${isAlreadyWatched ? `--active` : ``} button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item${isFavorite ? `--active` : ``} button film-card__controls-item--favorite">Mark as favorite</button>`
  );
};

const createFilmTemplate = (film) => {
  const {title, rating, releaseDate, duration, genres, poster, description, countComments, userDetails} = film;

  const year = moment(releaseDate).format(`YYYY`);
  const descriptionFilm = description.length <= MAX_COUNT_CHARACTERS ? description : `${description.slice(0, MAX_COUNT_CHARACTERS)}...`;
  const userDetailsMarkup = creatUserDetailsMarkup(userDetails);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${descriptionFilm}</p>
      <a class="film-card__comments">${countComments} comments</a>
      <form class="film-card__controls">
        ${userDetailsMarkup}
      </form>
    </article>`
  );
};

momentDurationFormatSetup(moment);

export default class Film extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  setAddToWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
    // this._addToWatchlistButtonClickHandler = handler;
  }

  setMarkAsWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setMarkAsFavoritedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
