import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import storage from "./util/storage.js";
import { authHeader } from "./api/client.js";
//import { AuthContextProvider } from "./pages/login/context.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import confiStore from "./store/index.js";

const accessToken = storage.get("auth");
if (accessToken) {
  authHeader(accessToken);
}

const store = confiStore({ auth: !!accessToken });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
/*<AuthContextProvider isDefaultLogged={!!accessToken}>
<App />
</AuthContextProvider>
*/
