import {createFilmTemplate} from "./film.js";
const COUNT_EXTRA_FILMS = 1;

export const createFilmListExtraTemplate = (title, films) => {

  const filmsMarkup = films.map((it, i) => {
    return (i <= COUNT_EXTRA_FILMS) ? createFilmTemplate(it) : ``;
  }).join(`\n`);

  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">${filmsMarkup}</div>
    </section>`
  );
};
