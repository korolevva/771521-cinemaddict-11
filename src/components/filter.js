import AbstractComponent from "./abstract-component.js";

const FILTER_HREF_PREFIX = `#`;

const getFilterName = (href) => {
  return href.substring(FILTER_HREF_PREFIX.length);
};

const createFilterMarkup = (filter, isActive) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(`\n`);

  return (
    `<div class="main-navigation__items">
      ${filtersMarkup}
    </div>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }

      const activeElement = Array.from(this.getElement().querySelectorAll(`.main-navigation__item`)).find((it) => it.classList.contains(`main-navigation__item--active`));
      if (activeElement.className !== evt.target.className) {
        activeElement.classList.remove(`main-navigation__item--active`);
        evt.target.classList.add(`main-navigation__item--active`);
      }

      const filterName = getFilterName(evt.target.getAttribute(`href`));
      handler(filterName);
    });
  }
}
