import AdvertsPage from "./pages/Adverts/adverts.js";
import LoginUser from "./pages/login/login.js";
import NewAdvert from "./pages/Adverts/create-adverts.js";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdvertPage from "./pages/Adverts/advert.js";
import RequireAuth from "./pages/login/tools/require-auth.js";
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

      <Route path="/404" element={<div> 400 | not found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
