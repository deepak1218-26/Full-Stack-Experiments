import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let user = null;

  if (token) {
    try {
      user = jwtDecode(token);
    } catch {
      user = null;
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="navbar">

      <h2>Secure Portal</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        {user.role === "admin" && (
          <>
            <Link to="/admin">
              Admin
            </Link>

            <Link to="/users">
              Users
            </Link>
          </>
        )}

        {(user.role === "admin" ||
          user.role === "editor") && (
          <Link to="/editor">
            Editor
          </Link>
        )}

        <Link to="/viewer">
          Viewer
        </Link>

        <span className="user-role">
          {user.username} ({user.role})
        </span>

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;