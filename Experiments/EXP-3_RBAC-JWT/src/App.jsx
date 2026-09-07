import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Viewer from "./pages/Viewer";
import Users from "./pages/Users";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "editor", "viewer"]}
            >
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "editor", "viewer"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Editor */}
        <Route
          path="/editor"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "editor"]}
            >
              <Editor />
            </ProtectedRoute>
          }
        />

        {/* Viewer */}
        <Route
          path="/viewer"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "editor", "viewer"]}
            >
              <Viewer />
            </ProtectedRoute>
          }
        />

        {/* Users */}
        <Route
          path="/users"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <Users />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized */}
        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

        {/* Default */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;