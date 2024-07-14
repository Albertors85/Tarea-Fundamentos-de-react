import { Advert_Create, Adverts_Load, Auth_Login, Auth_LogOut } from "./types";

export const authLogin = () => ({
  type: Auth_Login,
});

export const authLogOut = () => ({
  type: Auth_LogOut,
});

export const advertsLoad = (adverts) => ({
  type: Adverts_Load,
  payload: adverts,
});

export const advertCreate = (advert) => ({
  type: Advert_Create,
  payload: advert,
});
