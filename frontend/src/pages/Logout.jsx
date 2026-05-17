import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Logout() {
  const [message, setMessage] = useState("Logging out...");

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMessage("You have been logged out successfully.");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg text-center">
        <h2 className="text-3xl font-bold text-slate-900">Logged Out</h2>
        <p className="mt-4 text-slate-600">{message}</p>
        <Link
          to="/login"
          className="mt-8 inline-flex rounded-2xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
}

export default Logout;
