import { NavLink } from "react-router-dom";
import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { Button } from "./ui/button";
import LogOut from "./page/logOut";
import { selectIsLoggedIn } from "../redux/auth/selector";
import { useSelector } from "react-redux";

export function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header>
      <div className="container mx-auto py-8 px-16">
        <div className="flex items-center justify-between">
          <Logo />
          <Navigation />

          <div className="flex items-center justify-center gap-4">
            {isLoggedIn ? (
              <LogOut />
            ) : (
              <>
                {" "}
                <NavLink
                  to="/login"
                  className="flex items-center justify-center gap-2 font-bold text-base">
                  Log in
                </NavLink>
                <NavLink to="/registration">
                  <Button>Registration</Button>
                </NavLink>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
