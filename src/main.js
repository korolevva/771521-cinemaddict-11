import PageController from "./controllers/page.js";
import FilterController from "./controllers/filter.js";
import FooterStatisticsComponent from "./components/footer-statistics.js";
import ProfileComponent from "./components/profile.js";
import FilmsModel from "./models/films.js";
import SiteMenuComponent from "./components/site-menu.js";
import {generateCountFilms} from "./mock/footer-statistics.js";
import {generateFilms} from "./mock/film.js";
import {generateProfileData} from "./mock/profile.js";
import {render, RenderPosition} from "./utils/render.js";

const FILM_COUNT = 10;

const headerElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const countFilmsElement = siteFooterElement.querySelector(`.footer__statistics`);

const profile = generateProfileData();
const films = generateFilms(FILM_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);
const totalCountFilms = generateCountFilms();

const profileComponent = new ProfileComponent(profile);
const siteMenuComponent = new SiteMenuComponent();

render(headerElement, profileComponent, RenderPosition.BEFOREEND);
const filterController = new FilterController(siteMenuComponent, filmsModel);
filterController.render();
const footerStatisticsComponent = new FooterStatisticsComponent(totalCountFilms);


render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);
render(countFilmsElement, footerStatisticsComponent, RenderPosition.BEFOREEND);

const filmsListController = new PageController(siteMainElement, filmsModel);
filmsListController.render(films);
