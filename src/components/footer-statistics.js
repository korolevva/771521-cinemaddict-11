export const createFooterStatisticsTemplate = (count) => {
  const formattedNumber = new Intl.NumberFormat(`ru-RU`).format(count);
  return (
    `<p>${formattedNumber} movies inside</p>`
  );
};
