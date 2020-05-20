import PageController from "./controllers/page.js";
import FilterController from "./controllers/filter.js";
import FooterStatisticsComponent from "./components/footer-statistics.js";
import ProfileComponent from "./components/profile.js";
import FilmsModel from "./models/films.js";
import SiteMenuComponent from "./components/site-menu.js";
import StatisticComponent from "./components/statistic.js";
import {generateCountFilms} from "./mock/footer-statistics.js";
import {generateFilms} from "./mock/film.js";
import {generateProfileData} from "./mock/profile.js";
import {render, RenderPosition} from "./utils/render.js";

const FILM_COUNT = 10;

const headerElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const countFilmsElement = siteFooterElement.querySelector(`.footer__statistics`);

const films = generateFilms(FILM_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);
const totalCountFilms = generateCountFilms();

const profile = generateProfileData();
const profileComponent = new ProfileComponent(profile);
render(headerElement, profileComponent, RenderPosition.BEFOREEND);

const siteMenuComponent = new SiteMenuComponent();
render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);

const filterController = new FilterController(siteMenuComponent, filmsModel);
filterController.render();

const statisticComponent = new StatisticComponent();
render(siteMenuComponent.getElement(), statisticComponent, RenderPosition.BEFOREEND);

const footerStatisticsComponent = new FooterStatisticsComponent(totalCountFilms);
render(countFilmsElement, footerStatisticsComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(siteMainElement, filmsModel);
pageController.render(films);
