import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("viewer");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    // Mock JWT payload
    const payload = {
      username: username,
      role: role,
      exp: Math.floor(Date.now() / 1000) + 3600
    };

    // Simulated JWT
    const header = btoa(
      JSON.stringify({
        alg: "HS256",
        typ: "JWT"
      })
    );

    const encodedPayload = btoa(JSON.stringify(payload));

    const signature = btoa("mock-signature");

    const token = `${header}.${encodedPayload}.${signature}`;

    localStorage.setItem("token", token);

    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Secure Portal</h1>
        <p>JWT Authentication + RBAC</p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>

          <button type="submit">
            Login
          </button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;