import { useSelector } from "react-redux";

//import { useAuth } from "../context.js";

import { Navigate, useLocation } from "react-router-dom";
import { getIsLogged } from "../../../store/selectors";

export default function RequireAuth({ children }) {
  const location = useLocation();

  //const { isLogged } = useAuth();
  const isLogged = useSelector(getIsLogged)
  

  return isLogged ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
}
