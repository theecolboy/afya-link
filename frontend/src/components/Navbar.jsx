import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">AfyaLink</h1>
        <ul className="flex space-x-4">
          <li><NavLink to="/" className={({ isActive }) => isActive ? "font-bold" : ""}>Dashboard</NavLink></li>
          <li><NavLink to="/appointments" className={({ isActive }) => isActive ? "font-bold" : ""}>Appointments</NavLink></li>
          <li><NavLink to="/emergency" className={({ isActive }) => isActive ? "font-bold" : ""}>Emergency</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;