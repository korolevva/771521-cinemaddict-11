const menuItemsNames = [`All movies`, `Watchlist`, `History`, `Favorites`];

const generateMenuItems = () => {
  return menuItemsNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateMenuItems};
