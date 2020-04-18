import {createProfileTemplate} from "./components/profile.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortTemplate} from "./components/sort.js";
import {createFilmsContainerTemplate} from "./components/films-container.js";
import {createFilmTemplate} from "./components/film.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmListExtraTemplate} from "./components/film-list-extra.js";
import {createFooterStatisticsTemplate} from "./components/footer-statistics.js";
import {generateFilms} from "./mock/film.js";
import {generateMenuItems} from "./mock/site-menu.js";
import {generateProfileData} from "./mock/profile.js";
import {generateCountFilms} from "./mock/footer-statistics.js";

const FILM_COUNT = 10;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const userRankElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const countFilmsElement = siteFooterElement.querySelector(`.footer__statistics`);

const profile = generateProfileData();
const siteMenu = generateMenuItems();
const films = generateFilms(FILM_COUNT);
const totalCountFilms = generateCountFilms();

render(userRankElement, createProfileTemplate(profile));
render(siteMainElement, createSiteMenuTemplate(siteMenu));
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsContainerTemplate());

const filmContainerElement = siteMainElement.querySelector(`.films`);
const filmListElement = filmContainerElement.querySelector(`.films-list`);
const filmElement = filmListElement.querySelector(`.films-list__container`);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

films.slice(0, showingFilmsCount)
  .forEach((film) => render(filmElement, createFilmTemplate(film)));

render(filmListElement, createShowMoreButtonTemplate());
const showMoreButton = filmContainerElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmElement, createFilmTemplate(film)));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});

render(filmContainerElement, createFilmListExtraTemplate(`Top rated`, films));
render(filmContainerElement, createFilmListExtraTemplate(`Most commented`, films));
render(countFilmsElement, createFooterStatisticsTemplate(totalCountFilms));
render(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);
