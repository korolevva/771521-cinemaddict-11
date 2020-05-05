import AbstractComponent from "./abstract-component.js";

const createFooterStatisticsTemplate = (count) => {
  const formattedNumber = new Intl.NumberFormat(`ru-RU`).format(count);
  return (
    `<p>${formattedNumber} movies inside</p>`
  );
};

export default class FooterStatistics extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._count);
  }
}
