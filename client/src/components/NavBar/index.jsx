import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
    <nav className="navContainer">
      <ul className="ulContainer">
        {isAuthenticated ? (
          // Usuario logged
          <>
            <h1 className="cusoryTitle">Cusory.com</h1>
            <div className="linkContainer">
              <li>
                <Link className="linkTitle" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="linkTitle" to="/user/publica">
                  Post
                </Link>
              </li>
              <li>
                <Link className="linkTitle" to="/user/profile">
                  Profile
                </Link>
              </li>
              <li onClick={logout}>
                <Link className="linkTitle" to="/">
                  Exit
                </Link>
              </li>
            </div>
          </>
        ) : (
          // Usuario Unlogged
          <>
            <h1 className="cusoryTitle">Cusory.com</h1>
            <div className="linkContainer">
              <li>
                <Link className="linkTitle" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="linkTitle" to="/auth/login">
                  Join
                </Link>
              </li>
              <li>
                <Link className="linkTitle" to="/auth/signin">
                  Sign In
                </Link>
              </li>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
