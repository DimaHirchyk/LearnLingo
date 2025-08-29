import { NavLink } from "react-router-dom";
import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header>
      <div className="container mx-auto py-8 px-16">
        <div className="flex items-center justify-between">
          <Logo />
          <Navigation />
          <div className="flex items-center justify-center gap-4">
            <NavLink
              to="/login"
              className="flex items-center justify-center gap-2 font-bold text-base">
              <svg
                className="fill-none stroke-yellow-500"
                width={20}
                height={20}>
                <use href="/symbol-defs.svg#icon-logIn"></use>
              </svg>
              Log in
            </NavLink>
            <NavLink to="/registration">
              <Button>Registration</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
