import FilmComponent from "./components/film.js";
import FilmContainerComponent from "./components/films-container.js";
import FilmDetailsComponent from "./components/film-details.js";
import FilmListExtraComponent from "./components/film-list-extra.js";
import FooterStatisticsComponent from "./components/footer-statistics.js";
import ProfileComponent from "./components/profile.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import SiteMenuComponent from "./components/site-menu.js";
import SortingComponent from "./components/sorting.js";
import {generateCountFilms} from "./mock/footer-statistics.js";
import {generateFilms} from "./mock/film.js";
import {generateMenuItems} from "./mock/site-menu.js";
import {generateProfileData} from "./mock/profile.js";
import {render, RenderPosition} from "./utils.js";

const FILM_COUNT = 10;
const EXTRA_FILMS_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilm = (filmListElement, film) => {
  const onFilmCardClick = (evt) => {

    const target = evt.target.className;
    const isFilmCardOpened = !!document.querySelector(`.film-details`);
    const isFilmCardClicked = target === `film-card__poster` || target === `film-card__title` || target === `film-card__comments`;
    if (isFilmCardClicked && !isFilmCardOpened) {
      render(siteFooterElement, filmDetailsComponent.getElement(), RenderPosition.AFTEREND);
      filmDetailsComponent.getElement().classList.remove(`visually-hidden`);
    }
  };

  const onButtonCloseClick = () => {
    filmDetailsComponent.getElement().remove();
  };

  const filmComponent = new FilmComponent(film);
  const filmCard = filmComponent.getElement();
  filmCard.addEventListener(`click`, onFilmCardClick);

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const buttonCloseElement = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  buttonCloseElement.addEventListener(`click`, onButtonCloseClick);

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const rendershowMoreButton = (filmListElement, filmElement, showingFilmsCount) => {
  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmListElement, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = showMoreButtonComponent.getElement();

  const onShowMoreButtonClick = () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => renderFilm(filmElement, film));

    if (showingFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  };

  showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
};

const renderFilmsList = (filmContainer) => {
  const filmListElement = filmContainer.querySelector(`.films-list`);
  const filmElement = filmListElement.querySelector(`.films-list__container`);

  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  films.slice(0, showingFilmsCount)
    .forEach((film) => renderFilm(filmElement, film));

  rendershowMoreButton(filmListElement, filmElement, showingFilmsCount);
};

const renderExtraFilmsList = (filmContainer) => {
  const topRatedComponent = new FilmListExtraComponent(`Top rated`);
  const mostCommentedComponent = new FilmListExtraComponent(`Most commented`);

  const renderExtraFilms = (ExtraFilmsComponent) => {
    render(filmContainer, ExtraFilmsComponent.getElement(), RenderPosition.BEFOREEND);
    const filmListElement = ExtraFilmsComponent.getElement().querySelector(`.films-list__container`);
    films.slice(0, EXTRA_FILMS_COUNT)
    .forEach((film) => renderFilm(filmListElement, film));
  };

  renderExtraFilms(topRatedComponent);
  renderExtraFilms(mostCommentedComponent);
};

const userRankElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const countFilmsElement = siteFooterElement.querySelector(`.footer__statistics`);

const profile = generateProfileData();
const siteMenu = generateMenuItems();
const films = generateFilms(FILM_COUNT);
const totalCountFilms = generateCountFilms();

const profileComponent = new ProfileComponent(profile);
const siteMenuComponent = new SiteMenuComponent(siteMenu);
const sortingComponent = new SortingComponent();
const filmContainerComponent = new FilmContainerComponent();
const footerStatisticsComponent = new FooterStatisticsComponent(totalCountFilms);

render(userRankElement, profileComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, siteMenuComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, sortingComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, filmContainerComponent.getElement(), RenderPosition.BEFOREEND);
render(countFilmsElement, footerStatisticsComponent.getElement(), RenderPosition.BEFOREEND);

const filmContainerElement = siteMainElement.querySelector(`.films`);

renderFilmsList(filmContainerElement);
renderExtraFilmsList(filmContainerElement);
