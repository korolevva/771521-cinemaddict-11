export const createProfileTemplate = (profile) => {
  const {avatar, grade} = profile;
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${grade}</p>
      <img class="profile__avatar" src="images/${avatar}" alt="Avatar" width="35" height="35">
    </section>`
  );
};
