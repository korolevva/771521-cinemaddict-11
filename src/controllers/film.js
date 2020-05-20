import FilmComponent from "../components/film.js";
import FilmDetailsComponent from "../components/film-details.js";
import {cloneDeep} from 'lodash';
import {show, hide, remove, render, replace, RenderPosition} from "../utils/render.js";

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
      this._onAddToWatchlistButtonClick(film, evt);
    });

    this._filmDetailsComponent.setAddToWatchlistButtonClickHandler((evt) => {
      this._onAddToWatchlistButtonClick(film, evt);
    });

    this._filmComponent.setMarkAsWatchedButtonClickHandler((evt) => {
      this._onMarkAsWatchedButtonClick(film, evt);
    });

    this._filmDetailsComponent.setMarkAsWatchedButtonClickHandler((evt) => {
      this._onMarkAsWatchedButtonClick(film, evt);
    });

    this._filmComponent.setMarkAsFavoritedButtonClickHandler((evt) => {
      this._onMarkAsFavoritedButtonClick(film, evt);
    });

    this._filmDetailsComponent.setMarkAsFavoritedButtonClickHandler((evt) => {
      this._onMarkAsFavoritedButtonClick(film, evt);
    });

    this._filmDetailsComponent.setDeleteButtonClickHandler(() => {
      console.log(`delete`);
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

  destroy() {
    remove(this._filmDetailsComponent);
    remove(this._filmComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
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

  _onAddToWatchlistButtonClick(film, evt) {
    evt.preventDefault();
    const filmCopy = cloneDeep(film);
    filmCopy.userDetails.isAddToWatchlist = !(filmCopy.userDetails.isAddToWatchlist);
    this._onDataChange(this, film, filmCopy);
  }

  _onMarkAsWatchedButtonClick(film, evt) {
    evt.preventDefault();
    const filmCopy = cloneDeep(film);
    filmCopy.userDetails.isAlreadyWatched = !(filmCopy.userDetails.isAlreadyWatched);
    this._onDataChange(this, film, filmCopy);
  }

  _onMarkAsFavoritedButtonClick(film, evt) {
    evt.preventDefault();
    const filmCopy = cloneDeep(film);
    filmCopy.userDetails.isFavorite = !(filmCopy.userDetails.isFavorite);
    this._onDataChange(this, film, filmCopy);
  }

}
