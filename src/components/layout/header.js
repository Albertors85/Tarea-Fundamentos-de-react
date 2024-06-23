import { logout } from "../../pages/login/service.js";

//import { useAuth } from "../../pages/login/context.js";
import { Link, NavLink } from "react-router-dom";

import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLogged } from "../../store/selectors.js";
import { authLogOut } from "../../store/actions.js";

export default function Header() {
  // const { isLogged, onLogout } = useAuth();
  const isLogged = useSelector(getIsLogged);
  //const { onLogout } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(authLogOut());
    alert("hasta la proxima");
  };

  return (
    <header>
      <Link to="/">
        <h3>inicio</h3>
      </Link>

      <nav>
        {isLogged ? (
          <Fragment>
            <NavLink to="/">
              <button onClick={handleLogout}>Logout</button>
            </NavLink>

            <NavLink to="/adverts/new" end>
              <button> create</button>
            </NavLink>
          </Fragment>
        ) : (
          <NavLink to="/login"></NavLink>
        )}
      </nav>
    </header>
  );
}
