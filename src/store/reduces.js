import { Auth_Login, Auth_LogOut, Advert_Create, Adverts_Load } from "./types";

export const initialState = {
  auth: false,
  adverts: [],
};

export function authF(state = initialState.auth, action) {
  switch (action.type) {
    case Auth_Login:
      return true;
    case Auth_LogOut:
      return false;

    default:
      return state;
  }
}

export function advertsF(state = initialState.adverts, action) {
  switch (action.type) {
    case Adverts_Load:
      return action.payload;

    case Advert_Create:
      return [...state, action.payload]; //state.adverts

    default:
      return state;
  }
}
