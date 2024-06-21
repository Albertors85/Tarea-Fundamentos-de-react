import { logout } from "../../pages/login/service.js";
import { useAuth } from "../../pages/login/context.js";
import { Link, NavLink } from "react-router-dom";
import { Fragment } from "react";
export default function Header() {
  const { isLogged, onLogout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onLogout();
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
