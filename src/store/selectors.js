export const getIsLogged = (state) => state.auth;

export const getAdvertsR = (state) => state.adverts;

export const getAdvertId = (state, advertId) =>
  getAdvertsR(state).find((advert) => advert.id === Number(advertId));
