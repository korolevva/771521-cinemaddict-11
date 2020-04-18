import {createFilmTemplate} from "./film.js";
export const createFilmListExtraTemplate = (title, films) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container">${createFilmTemplate(films[0])}${createFilmTemplate(films[1])}</div>
    </section>`
  );
};
