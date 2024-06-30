import { Outlet, Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="navbar-brand" to="/">About</Link>
              <Link className="navbar-brand" to="/login">Login</Link>
              <Link className="navbar-brand" to="/registration">Register</Link>
              <Link className="navbar-brand" to="/profile">Profile</Link>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default Navbar;
