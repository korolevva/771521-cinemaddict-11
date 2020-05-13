import AbstractComponent from "./abstract-component.js";

const FILTER_HREF_PREFIX = `#`;

const getFilterNameById = (href) => {
  return href.substring(FILTER_HREF_PREFIX.length);
};

const createFilterMarkup = (filter, isActive) => {
  const {name, count} = filter;

  return (
    `<a href="#${isActive ? `all` : name.toLowerCase()}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${name} <span class="main-navigation__item-count">${count}</span></a>`
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
      const filterName = getFilterNameById(evt.target.getAttribute(`href`));
      handler(filterName);
    });
  }
}
