import FilmComponent from "../components/film.js";
import FilmDetailsComponent from "../components/film-details.js";
import {cloneDeep} from 'lodash';
import {show, hide, render, replace, RenderPosition} from "../utils/render.js";

const State = {
  DEFAULT: `default`,
  OPEN: `open`,
};

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._onViewChange = onViewChange;
    this._state = State.DEFAULT;
    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmComponent.setClickHandler((evt) => {
      this._openFilmCard(evt);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmDetailsComponent.setButtonCloseClickHandler(() => {
      this._closeFilmCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmComponent.setAddToWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      const filmCopy = cloneDeep(film);
      filmCopy.userDetails.isAddToWatchlist = !(filmCopy.userDetails.isAddToWatchlist);
      this._onDataChange(this, film, filmCopy);
    });

    this._filmComponent.setMarkAsWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      const filmCopy = cloneDeep(film);
      filmCopy.userDetails.isAlreadyWatched = !(filmCopy.userDetails.isAlreadyWatched);
      this._onDataChange(this, film, filmCopy);
    });

    this._filmComponent.setMarkAsFavoritedButtonClickHandler((evt) => {
      evt.preventDefault();
      const filmCopy = cloneDeep(film);
      filmCopy.userDetails.isFavorite = !(filmCopy.userDetails.isFavorite);
      this._onDataChange(this, film, filmCopy);
    });

    if (oldFilmDetailsComponent && oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== State.DEFAULT) {
      this._closeFilmCard();
    }
  }

  _openFilmCard(evt) {
    this._onViewChange();
    const target = evt.target.className;
    const isFilmCardClicked = target === `film-card__poster` || target === `film-card__title` || target === `film-card__comments`;
    if (isFilmCardClicked) {
      show(this._filmDetailsComponent);
    }
    this._mode = State.OPEN;
  }

  _closeFilmCard() {
    hide(this._filmDetailsComponent);
    this._mode = State.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeFilmCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

}
