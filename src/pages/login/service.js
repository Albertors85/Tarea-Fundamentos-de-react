import { client, authHeader, removeAuth } from "../../api/client.js";
import storage from "../../util/storage.js";

export const login = (credentials, memory) => {
  return client.post("/auth/login", credentials).then(({ accessToken }) => {
    authHeader(accessToken);
    if (memory) {
      storage.set("auth", accessToken);
    }
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuth();
    storage.remove("auth");
  });
};
