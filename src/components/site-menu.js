import AbstractComponent from "./abstract-component.js";

// export const MenuItem = {
//   NEW_TASK: `control__new-task`,
//   STATISTICS: `control__statistic`,
//   TASKS: `control__task`,
// };

const createSiteMenuTemplate = () => {
  return (
    `<nav class="main-navigation">

      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenu extends AbstractComponent {
  getTemplate() {
    return createSiteMenuTemplate();
  }
}
