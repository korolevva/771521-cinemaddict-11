import FilmComponent from "../components/film.js";
import FilmContainerComponent from "../components/films-container.js";
import FilmDetailsComponent from "../components/film-details.js";
import FilmListExtraComponent from "../components/film-list-extra.js";
import NoDataComponent from "../components/no-data.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import SortingComponent, {SortType} from "../components/sorting.js";
import {show, hide, remove, render, RenderPosition} from "../utils/render.js";
import {getRandomListItems} from "../utils/common.js";

const EXTRA_FILMS_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilm = (filmListElement, film) => {
  const openFilmCard = (evt) => {

    const target = evt.target.className;
    const isFilmCardOpened = !!document.querySelector(`.film-details`);
    const isFilmCardClicked = target === `film-card__poster` || target === `film-card__title` || target === `film-card__comments`;
    if (isFilmCardClicked && !isFilmCardOpened) {
      show(filmDetailsComponent);
      filmDetailsComponent.getElement().classList.remove(`visually-hidden`);
    }
  };

  const closeFilmCard = () => {
    hide(filmDetailsComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closeFilmCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const filmComponent = new FilmComponent(film);
  filmComponent.setClickHandler((evt) => {
    openFilmCard(evt);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const filmDetailsComponent = new FilmDetailsComponent(film);

  filmDetailsComponent.setButtonCloseClickHandler(() => {
    closeFilmCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
};

function areSame(arr) {
  return Array.from(new Set(arr)).length === 1 ? true : false;
}

const renderExtraFilmsList = (filmContainer, films) => {
  const renderExtraFilms = (ExtraFilmsComponent, sortType) => {
    render(filmContainer, ExtraFilmsComponent, RenderPosition.BEFOREEND);
    const filmListElement = ExtraFilmsComponent.getElement().querySelector(`.films-list__container`);
    const sortedFilms = getSortedExtraFilms(films, sortType, 0, EXTRA_FILMS_COUNT);
    renderFilms(filmListElement, sortedFilms);
  };

  const topRatedComponent = new FilmListExtraComponent(`Top rated`);
  const mostCommentedComponent = new FilmListExtraComponent(`Most commented`);

  if (films.every((it) => it.rating === 0)) {
    topRatedComponent.removeElement();
  } else {
    renderExtraFilms(topRatedComponent, SortType.RATING);
  }

  if (films.every((it) => it.countComments === 0)) {
    mostCommentedComponent.removeElement();
  } else {
    renderExtraFilms(mostCommentedComponent, SortType.COMMENTS);
  }
};

const renderFilms = (filmListElement, films) => {
  films.forEach((film) => {
    renderFilm(filmListElement, film);
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

    this._noDataComponent = new NoDataComponent();
    this._filmContainerComponent = new FilmContainerComponent();
    this._sortingComponent = new SortingComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    const renderShowMoreButton = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }

      render(filmListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      const onShowMoreButtonClick = () => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        const sortedFilms = getSortedFilms(films, this._sortingComponent.getSortType(), prevFilmsCount, showingFilmsCount);
        renderFilms(filmElement, sortedFilms);

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      };

      this._showMoreButtonComponent.setClickHandler(onShowMoreButtonClick);
    };

    render(this._container, this._sortingComponent, RenderPosition.BEFOREEND);

    const isNoData = films.length === 0;
    if (isNoData) {
      render(this._container, this._noDataComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._filmContainerComponent, RenderPosition.BEFOREEND);

    const filmContainerElement = this._filmContainerComponent.getElement();
    const filmListElement = filmContainerElement.querySelector(`.films-list`);
    const filmElement = filmListElement.querySelector(`.films-list__container`);

    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    renderFilms(filmElement, films.slice(0, showingFilmsCount));
    renderShowMoreButton();

    renderExtraFilmsList(filmContainerElement, films);

    this._sortingComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);
      filmElement.innerHTML = ``;

      renderFilms(filmElement, sortedFilms);

      renderShowMoreButton();

    });
  }
}
