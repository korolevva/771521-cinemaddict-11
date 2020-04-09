import {createUserRankTemplate} from "./components/user-rank.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortTemplate} from "./components/sort.js";
import {createFilmsContainerTemplate} from "./components/films-container.js";
import {createFilmTemplate} from "./components/film.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmListExtraTemplate} from "./components/film-list-extra.js";
import {createFooterStatisticsTemplate} from "./components/footer-statistics.js";
import {generateFilms} from "./mock/film.js";

const FILM_COUNT = 5;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const userRankElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const countFilmsElement = document.querySelector(`.footer__statistics`);

render(userRankElement, createUserRankTemplate());
render(siteMainElement, createSiteMenuTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsContainerTemplate());

const filmContainerElement = siteMainElement.querySelector(`.films`);
const filmListElement = filmContainerElement.querySelector(`.films-list`);
const filmElement = filmListElement.querySelector(`.films-list__container`);

const films = generateFilms(FILM_COUNT);
films.forEach(() => render(filmElement, createFilmTemplate()));

render(filmListElement, createShowMoreButtonTemplate());
render(filmContainerElement, createFilmListExtraTemplate(`Top rated`));
render(filmContainerElement, createFilmListExtraTemplate(`Most commented`));
render(countFilmsElement, createFooterStatisticsTemplate());
