import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { authF, advertsF } from "./reduces"; // no funciona si lo paso as reducer...
import * as actionCreators from "./actions.js";

const reducer = combineReducers({
  auth: authF,
  adverts: advertsF,
});

export default function confiStore(preLoadState) {
  const store = createStore(
    reducer,
    preLoadState,
    composeWithDevTools({ actionCreators })()
  );
  return store;
}
