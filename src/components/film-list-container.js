import AbstractComponent from "./abstract-component.js";

export const createFilmListContainerTemplate = () => {
  return (`<div class="films-list__container"></div>`);
};

export default class FilmListContainer extends AbstractComponent {
  getTemplate() {
    return createFilmListContainerTemplate();
  }
}
