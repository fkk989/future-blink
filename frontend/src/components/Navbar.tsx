import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import { buttonStyle } from "../utils/constants";

export default function Navbar() {
  const navigate = useNavigate();
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `rounded w-[150px] h-[40px] flex justify-center items-center text-[20px]  ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  const { user, checkIfUserIsLogedIn } = useUser();

  useEffect(() => {
    checkIfUserIsLogedIn();
  }, []);
  return (
    <nav className="w-full flex items-center justify-between h-[80px] bg-gray-100 shadow ">
      <div className="ml-[30px] flex gap-[20px]">
        <NavLink to="/sequence" className={navItemClass}>
          Sequence
        </NavLink>
        <NavLink to="/list" className={navItemClass}>
          List
        </NavLink>
        <NavLink to="/email-template" className={navItemClass}>
          Email
        </NavLink>
      </div>
      <div
        onClick={() => {
          localStorage.removeItem("user-token");
          navigate("/login");
        }}
        className="flex items-center gap-[20px]"
      >
        <div className="mr-[20px]">Hello! {user?.name}</div>
        <button className={`${buttonStyle} mr-[30px]`}>Log out</button>
      </div>
    </nav>
  );
}
