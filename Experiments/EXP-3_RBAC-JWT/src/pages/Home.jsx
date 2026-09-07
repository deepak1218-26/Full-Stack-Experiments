import { jwtDecode } from "jwt-decode";

function Home() {

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  return (
    <div className="page">
      <h1>Welcome, {user.username}!</h1>

      <p>
        You are successfully authenticated using JWT.
      </p>

      <div className="info-card">
        <h2>Authentication Status</h2>

        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <p>
          <strong>Authentication:</strong> JWT
        </p>

        <p>
          <strong>Authorization:</strong> RBAC
        </p>
      </div>
    </div>
  );
}

export default Home;