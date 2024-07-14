import AdvertsPage from "./pages/Adverts/adverts.js";
import LoginUser from "./pages/login/login.js";
import NewAdvert from "./pages/Adverts/create-adverts.js";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdvertPage from "./pages/Adverts/advert.js";
import RequireAuth from "./pages/login/tools/require-auth.js";
import NotFoundPage from "./pages/notFound.js";
//probando
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/login" element={<LoginUser />} />

      <Route
        path="/adverts"
        element={
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        }
      >
        <Route index element={<AdvertsPage />} />
        <Route path=":advertId" element={<AdvertPage />} />
        <Route path="new" element={<NewAdvert />} />
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
