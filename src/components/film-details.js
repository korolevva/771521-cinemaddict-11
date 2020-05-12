import AbstractSmartComponent from "./abstract-smart-component.js";
import {EMOJIS} from "../const.js";

const months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const createGenreMarkup = (genre) => {
  return (
    `<span class="film-details__genre">${genre}</span>`
  );
};

const createCommentsMarkup = (comment) => {
  const {textComment, emoji, author, dateComment} = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${textComment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${dateComment}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createEmojisMarkup = (emoji) => {

  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`
  );
};

const createUserDetailsMarkup = (userDetails) => {
  const {isAddToWatchlist, isAlreadyWatched, isFavorite} = userDetails;
  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isAddToWatchlist ? `checked` : ``}>
    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isAlreadyWatched ? `checked` : ``}>
    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>`
  );
};

const createImageEmojiMarkup = (emoji) => {
  return (`<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji"></img>`);
};

const createFilmDetailsTemplate = (film, emoji) => {
  const {title, rating, releaseDate, duration, genres, poster, description, countComments, originalTitle, director, screenwriters, actors, country, ageRating, comments, userDetails} = film;

  const date = `${releaseDate.getDate()} ${months[releaseDate.getMonth()]} ${releaseDate.getFullYear()}`;
  const genreMarkup = genres.map((it) => createGenreMarkup(it)).join(` `);
  const isOneGenre = genres.length > 1 ? true : false;
  const commentsMarkup = comments.map((it) => createCommentsMarkup(it)).join(` `);
  const emojisMarkup = EMOJIS.map((it) => createEmojisMarkup(it)).join(` `);
  const userDetailsMarkup = createUserDetailsMarkup(userDetails);
  const imageEmojiMarkup = createImageEmojiMarkup(emoji);

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">${ageRating}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${originalTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${screenwriters}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${date}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${isOneGenre ? `Genres` : `Genre`}</td>
                <td class="film-details__cell">${genreMarkup}</td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          ${userDetailsMarkup}
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${countComments}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsMarkup}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">
              ${imageEmojiMarkup}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              ${emojisMarkup}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._buttonCloseClickHandler = null;
    this._emoje = `smile`;

    this._onEmojiClick();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, this._emoje);
  }

  recoveryListeners() {
    this.setButtonCloseClickHandler(this._buttonCloseClickHandler);
    this._onEmojiClick();
  }

  rerender() {
    super.rerender();
  }

  setButtonCloseClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);

    this._buttonCloseClickHandler = handler;
  }

  _onEmojiClick() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName.toLowerCase() === `img`) {
        this._emoje = evt.target.parentElement.previousElementSibling.value;

        this.rerender();
      }
    });
  }
}
