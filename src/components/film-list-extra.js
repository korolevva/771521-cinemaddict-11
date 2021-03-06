import AbstractComponent from "./abstract-component.js";

export const createFilmListExtraTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
    </section>`
  );
};

export default class FilmListExtra extends AbstractComponent {
  constructor(title) {
    super();

    this._title = title;
  }

  getTemplate() {
    return createFilmListExtraTemplate(this._title);
  }
}
