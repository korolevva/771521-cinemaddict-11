import {createFilmTemplate} from "./film.js";
export const createFilmListExtraTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container">${createFilmTemplate()}${createFilmTemplate()}</div>
    </section>`
  );
};