import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotFound from "./pages/notFound/NotFound";
import StudentManagement from "./pages/StudentManagement";

const App = () => {
  return (
    <Router>
      <div role="application">
        <Routes>

          <Route
            path="/"
            element={<Navigate to="/student" replace />}
          />

          {/* Student Management Page */}
          <Route path="/student" element={<StudentManagement />} />

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
