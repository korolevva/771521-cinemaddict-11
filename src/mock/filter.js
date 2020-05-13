const filtersNames = [`All movies`, `Watchlist`, `History`, `Favorites`];

const generatFilters = () => {
  return filtersNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generatFilters};
