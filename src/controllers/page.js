// import FilmComponent from "../components/film.js";
import FilmContainerComponent from "../components/films-container.js";
import FilmController from "./film.js";
// import FilmDetailsComponent from "../components/film-details.js";
import FilmListComponent from "../components/film-list.js";
import FilmListContainerComponent from "../components/film-list-container.js";
import FilmListExtraComponent from "../components/film-list-extra.js";
import NoDataComponent from "../components/no-data.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import SortingComponent, {SortType} from "../components/sorting.js";
// import {show, hide, remove, render, RenderPosition} from "../utils/render.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {getRandomListItems} from "../utils/common.js";

const EXTRA_FILMS_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

function areSame(arr) {
  return Array.from(new Set(arr)).length === 1 ? true : false;
}

const renderFilms = (filmListElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const filmController = new FilmController(filmListElement, onDataChange, onViewChange);

    filmController.render(film);

    return filmController;
  });
};

const getSortedExtraFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();
  const ratings = films.map((it) => it.rating);
  const countComments = films.map((it) => it.countComments);

  switch (sortType) {
    case SortType.RATING:
      if (areSame(ratings)) {
        sortedFilms = getRandomListItems(showingFilms, EXTRA_FILMS_COUNT, EXTRA_FILMS_COUNT);
      } else {
        sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      }
      break;
    case SortType.COMMENTS:
      if (areSame(countComments)) {
        sortedFilms = getRandomListItems(showingFilms, EXTRA_FILMS_COUNT, EXTRA_FILMS_COUNT);
      } else {
        sortedFilms = showingFilms.sort((a, b) => b.countComments - a.countComments);
      }
      break;
  }

  return sortedFilms.slice(from, to);
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.COMMENTS:
      sortedFilms = showingFilms.sort((a, b) => b.countComments - a.countComments);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};


export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showedFilmControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._noDataComponent = new NoDataComponent();
    this._filmContainerComponent = new FilmContainerComponent();
    this._filmListComponent = new FilmListComponent();
    this._filmListContainerComponent = new FilmListContainerComponent();
    this._sortingComponent = new SortingComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._renderExtraFilmsList = this._renderExtraFilmsList.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;
    render(this._container, this._sortingComponent, RenderPosition.BEFOREEND);

    const isNoData = films.length === 0;
    if (isNoData) {
      render(this._container, this._noDataComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._filmContainerComponent, RenderPosition.BEFOREEND);

    const filmContainerElement = this._filmContainerComponent.getElement();
    render(filmContainerElement, this._filmListComponent, RenderPosition.BEFOREEND);

    const filmListElement = this._filmListComponent.getElement();
    render(filmListElement, this._filmListContainerComponent, RenderPosition.BEFOREEND);

    const filmListContainerElement = this._filmListContainerComponent.getElement();

    const newFilms = renderFilms(filmListContainerElement, this._films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._renderShowMoreButton();

    this._renderExtraFilmsList(filmContainerElement, this._onDataChange, this._onViewChange);
  }

  _renderShowMoreButton() {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }

    const filmListElement = this._filmListComponent.getElement();
    const filmListContainerElement = this._filmListContainerComponent.getElement();

    render(filmListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(this._films, this._sortingComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
      const newFilms = renderFilms(filmListContainerElement, sortedFilms, this._onDataChange, this._onViewChange);

      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    filmController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    const filmListContainerElement = this._filmListContainerComponent.getElement();

    const sortedFilms = getSortedFilms(this._films, sortType, 0, this._showingFilmsCount);

    filmListContainerElement.innerHTML = ``;

    const newFilms = renderFilms(filmListContainerElement, sortedFilms, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = newFilms;

    this._renderShowMoreButton();
  }

  _renderExtraFilmsList(filmContainerElement, onDataChange, onViewChange) {
    const renderExtraFilms = (extraFilmsComponent, sortType) => {
      const filmListExtraElement = extraFilmsComponent.getElement();
      render(filmContainerElement, extraFilmsComponent, RenderPosition.BEFOREEND);

      const filmListContainerComponent = new FilmListContainerComponent();
      render(filmListExtraElement, filmListContainerComponent, RenderPosition.BEFOREEND);

      const sortedFilms = getSortedExtraFilms(this._films, sortType, 0, EXTRA_FILMS_COUNT);
      const newFilms = renderFilms(filmListContainerComponent.getElement(), sortedFilms.slice(0, this._showingFilmsCount), onDataChange, onViewChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    };

    const topRatedComponent = new FilmListExtraComponent(`Top rated`);
    const mostCommentedComponent = new FilmListExtraComponent(`Most commented`);

    if (this._films.every((it) => it.rating === 0)) {
      topRatedComponent.removeElement();
    } else {
      renderExtraFilms(topRatedComponent, SortType.RATING);
    }

    if (this._films.every((it) => it.countComments === 0)) {
      mostCommentedComponent.removeElement();
    } else {
      renderExtraFilms(mostCommentedComponent, SortType.COMMENTS);
    }
  }
}
