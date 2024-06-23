import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as reducers from "./reduces";
import * as actionCreate from "./actions";

const reducer = combineReducers(reducers);

export default function confiStore() {
  const store = createStore(reducer, composeWithDevTools({ actionCreate })(),);
  return store;
}
