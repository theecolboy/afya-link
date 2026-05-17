import { NavLink, Outlet } from "react-router-dom";

function Sidebar() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/appointments", label: "Appointments" },
    { to: "/emergency", label: "Emergency" },
    { to: "/telemedicine", label: "Telemedicine" },
    { to: "/wellness", label: "Wellness" },
    { to: "/insurance", label: "Insurance" },
  ];

  if (isAuthenticated) {
    links.push({ to: "/logout", label: "Logout" });
  } else {
    links.push({ to: "/login", label: "Login" }, { to: "/signup", label: "Sign Up" });
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="w-64 bg-gray-800 text-white h-screen p-4 flex-shrink-0">
        <h2 className="text-xl font-bold px-2 mb-6">AfyaLink</h2>
        <nav>
          <ul className="space-y-1">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-cyan-600 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Sidebar;