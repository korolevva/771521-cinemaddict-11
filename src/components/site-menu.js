const createSiteMenuMarkup = (menuItems, isActive) => {
  const {name, count} = menuItems;

  return (
    `${isActive ? `<a href="#watchlist" class="main-navigation__item main-navigation__item--active">${name} </a>` : `<a href="#watchlist" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`}`
  );
};

const createSiteMenuTemplate = (siteMenu) => {
  const siteMenuMarkup = siteMenu.map((it, i) => createSiteMenuMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${siteMenuMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export {createSiteMenuTemplate};
