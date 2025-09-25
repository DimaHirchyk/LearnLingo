import { selectIsLoggedIn } from "@/redux/auth/selector";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      <nav className="flex gap-7 font-normal">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/teachers">Teachers</NavLink>
        {isLoggedIn ? <NavLink to="/favorites">Favorites</NavLink> : ""}
      </nav>
    </div>
  );
}
