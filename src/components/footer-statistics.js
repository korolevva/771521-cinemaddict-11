import {createElement} from "../utils.js";

const createFooterStatisticsTemplate = (count) => {
  const formattedNumber = new Intl.NumberFormat(`ru-RU`).format(count);
  return (
    `<p>${formattedNumber} movies inside</p>`
  );
};

export default class FooterStatistics {
  constructor(count) {
    this._count = count;

    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._count);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
