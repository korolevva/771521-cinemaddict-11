import FilmComponent from "../components/film.js";
import FilmContainerComponent from "../components/films-container.js";
import FilmDetailsComponent from "../components/film-details.js";
import FilmListExtraComponent from "../components/film-list-extra.js";
import NoDataComponent from "../components/no-data.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import SortingComponent from "../components/sorting.js";
import {show, hide, remove, render, RenderPosition} from "../utils/render.js";

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

const renderExtraFilmsList = (filmContainer, films) => {
  const topRatedComponent = new FilmListExtraComponent(`Top rated`);
  const mostCommentedComponent = new FilmListExtraComponent(`Most commented`);

  const renderExtraFilms = (ExtraFilmsComponent) => {
    render(filmContainer, ExtraFilmsComponent, RenderPosition.BEFOREEND);
    const filmListElement = ExtraFilmsComponent.getElement().querySelector(`.films-list__container`);
    films.slice(0, EXTRA_FILMS_COUNT)
    .forEach((film) => renderFilm(filmListElement, film));
  };

  renderExtraFilms(topRatedComponent);
  renderExtraFilms(mostCommentedComponent);
};

export default class PageController  {
  constructor(container) {
    this._container = container;

    this._noDataComponent = new NoDataComponent();
    this._filmContainerComponent = new FilmContainerComponent();
    this._sortingComponent = new SortingComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    const rendershowMoreButton = (filmListElement, filmElement, showingFilmsCount) => {
      render(filmListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      const onShowMoreButtonClick = () => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        films.slice(prevFilmsCount, showingFilmsCount)
          .forEach((film) => renderFilm(filmElement, film));

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

    films.slice(0, showingFilmsCount)
      .forEach((film) => renderFilm(filmElement, film));

    if (films.length > SHOWING_FILMS_COUNT_ON_START) {
      rendershowMoreButton(filmListElement, filmElement, showingFilmsCount);
    }

    renderExtraFilmsList(filmContainerElement, films);

    this._sortingComponent.setSortTypeChangeHandler(() => {
      showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

      filmElement.innerHTML = ``;

      films.slice(0, showingFilmsCount)
        .forEach((film) => renderFilm(filmElement, film));

      if (films.length > SHOWING_FILMS_COUNT_ON_START) {
        rendershowMoreButton(filmListElement, filmElement, showingFilmsCount);
      }
    });
  }
}
