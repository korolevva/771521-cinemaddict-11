import FilmComponent from "./components/film.js";
import FilmContainerComponent from "./components/films-container.js";
import FilmDetailsComponent from "./components/film-details.js";
import FilmListExtraComponent from "./components/film-list-extra.js";
import FooterStatisticsComponent from "./components/footer-statistics.js";
import ProfileComponent from "./components/profile.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import SiteMenuComponent from "./components/site-menu.js";
import SortComponent from "./components/sort.js";
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

const renderFilmsList = () => {
  const filmListElement = filmContainerElement.querySelector(`.films-list`);
  const filmElement = filmListElement.querySelector(`.films-list__container`);

  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  films.slice(0, showingFilmsCount)
    .forEach((film) => renderFilm(filmElement, film));

  render(filmListElement, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);
  const showMoreButton = filmContainerElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => renderFilm(filmElement, film));

    if (showingFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
};

const renderExtraFilmsList = () => {
  const topRatedComponent = new FilmListExtraComponent(`Top rated`);
  const mostCommentedComponent = new FilmListExtraComponent(`Most commented`);

  const renderExtraFilms = (ExtraFilsmComponent) => {
    render(filmContainerElement, ExtraFilsmComponent.getElement(), RenderPosition.BEFOREEND);
    const filmListElement = ExtraFilsmComponent.getElement().querySelector(`.films-list__container`);
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

render(userRankElement, new ProfileComponent(profile).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuComponent(siteMenu).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmContainerComponent().getElement(), RenderPosition.BEFOREEND);
render(countFilmsElement, new FooterStatisticsComponent(totalCountFilms).getElement(), RenderPosition.BEFOREEND);

const filmContainerElement = siteMainElement.querySelector(`.films`);

renderFilmsList();
renderExtraFilmsList();
