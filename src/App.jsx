import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotFound from "./pages/notFound/NotFound";
import UserManagement from "./pages/UserManagement";

const App = () => {
  return (
    <Router>
      <div role="application">
        <Routes>
          {/* Redirect from "/" to "/users" */}
          <Route
            path="/"
            element={<Navigate to="/users" replace />}
          />

          {/* User Management Page */}
          <Route path="/users" element={<UserManagement />} />

          {/* Catch-all for unknown routes */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
          <Route
            path="/not-found"
            element={<NotFound aria-live="assertive" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
