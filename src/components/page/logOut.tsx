import { logOutUser } from "@/redux/auth/operation";
import { selectUser } from "@/redux/auth/selector";
import type { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function LogOut() {
  const useR = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  const handlLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <>
      <p>Hi {useR.name}</p>{" "}
      <button
        onClick={handlLogout}
        type="button"
        className="bg-none w-7 h-7 cursor-pointer">
        <svg className="fill-none stroke-yellow-500" width={20} height={20}>
          <use href="/symbol-defs.svg#icon-logIn"></use>
        </svg>
      </button>
    </>
  );
}
