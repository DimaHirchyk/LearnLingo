import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <div>
      <nav className="flex gap-7 font-normal">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/teachers">Teachers</NavLink>
      </nav>
    </div>
  );
}
