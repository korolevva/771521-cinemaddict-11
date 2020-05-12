import AbstractComponent from "./abstract-component.js";

export const createFilmListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`
  );
};

export default class FilmList extends AbstractComponent {
  getTemplate() {
    return createFilmListTemplate();
  }
}
