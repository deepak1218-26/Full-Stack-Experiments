import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRoles }) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Check token expiry
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    // Check role
    if (
      allowedRoles &&
      !allowedRoles.includes(decoded.role)
    ) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;

  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;