import { NavLink } from "react-router-dom";

export function Logo() {
  return (
    <NavLink to="/" className="flex gap-2 items-center font-medium text-xl">
      <svg width={28} height={28}>
        <use href="/symbol-defs.svg#icon-ukraine"></use>
      </svg>
      LearnLingo
    </NavLink>
  );
}
