import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Emergency from "./pages/Emergency";
import Telemedicine from "./pages/Telemedicine";
import Wellness from "./pages/Wellness";
import Insurance from "./pages/Insurance";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";

const isAuthenticated = () => Boolean(localStorage.getItem("token"));

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Sidebar />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="telemedicine" element={<Telemedicine />} />
          <Route path="wellness" element={<Wellness />} />
          <Route path="insurance" element={<Insurance />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;