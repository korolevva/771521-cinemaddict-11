import PageController from "./controllers/page.js";
import FooterStatisticsComponent from "./components/footer-statistics.js";
import ProfileComponent from "./components/profile.js";
import SiteMenuComponent from "./components/site-menu.js";
import FilmsModel from "./models/films.js";
import {generateCountFilms} from "./mock/footer-statistics.js";
import {generateFilms} from "./mock/film.js";
import {generateMenuItems} from "./mock/site-menu.js";
import {generateProfileData} from "./mock/profile.js";
import {render, RenderPosition} from "./utils/render.js";

const FILM_COUNT = 10;

const headerElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const countFilmsElement = siteFooterElement.querySelector(`.footer__statistics`);

const profile = generateProfileData();
const siteMenu = generateMenuItems();
const films = generateFilms(FILM_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);
const totalCountFilms = generateCountFilms();

const profileComponent = new ProfileComponent(profile);
const siteMenuComponent = new SiteMenuComponent(siteMenu);
const footerStatisticsComponent = new FooterStatisticsComponent(totalCountFilms);

render(headerElement, profileComponent, RenderPosition.BEFOREEND);
render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);
render(countFilmsElement, footerStatisticsComponent, RenderPosition.BEFOREEND);

const filmsListController = new PageController(siteMainElement);
filmsListController.render(films);
