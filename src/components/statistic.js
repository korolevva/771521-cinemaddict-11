import AbstractComponent from "./abstract-component.js";

const createStatisticTemplate = () => {
  return (
    `<a href="#stats" class="main-navigation__additional">Stats</a>`
  );
};

export default class Statistic extends AbstractComponent {
  getTemplate() {
    return createStatisticTemplate();
  }
}
