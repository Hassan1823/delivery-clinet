import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { useAuthContext } from "../../context/AuthContext";
import { adminLink } from "../../../lib/data";

export const NavBar = () => {
  const { logoutHandler, isLogged } = useAuthContext();
  const [admin, setAdmin] = useState(false);
  const [userData, setUserData] = useState([]);

  const handleLogout = async () => {
    try {
      await logoutHandler();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userData || userData.length === 0) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserData(user);
        if (user.role === "admin") {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      }
    }
  }, [userData]);

  return (
    <div className="navbar bg-[#E5E5E5] px-[4%]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/aboutus"}>AboutUS</Link>
            </li>
            <li>
              <Link to={"/contactus"}>ContactUS</Link>
            </li>
            <li>
              <Link to={"/features"}>Features</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/signup"}>Signup</Link>
            </li>
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <Link to={"/trackorder"}>Track Order</Link>
            </li>
          </ul>
        </div>
        <a className="text-xl ">
          <img src={Logo} alt="Logo" className="w-20 h-20" />
        </a>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 text-lg text-black menu menu-horizontal">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/aboutus"}>AboutUS</Link>
          </li>
          <li>
            <Link to={"/contactus"}>ContactUS</Link>
          </li>
          <li>
            <Link to={"/features"}>Features</Link>
          </li>
          <li>
            <Link to={"/Trackorder"}>Track Order</Link>
          </li>
        </ul>
      </div>
      <div className="hidden gap-5 navbar-end lg:flex">
        {/* <Link
					to={'/login'}
					className='px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl'
				>
					Login
				</Link>
				<Link
					to={'/signup'}
					className='px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl'
				>
					Signup
				</Link>
				<Link
					to={'/dashboard'}
					className='px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl'
				>
					Dashboard
				</Link> */}

        {isLogged ? (
          <>
            <Link
              to={!admin ? "/dashboard" : `${adminLink}/${userData?._id}`}
              className="px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl"
            >
              Dashboard
            </Link>
            <Link
              className="px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl"
              onClick={handleLogout}
            >
              Logout
            </Link>{" "}
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl"
            >
              Login
            </Link>

            <Link
              to={"/signup"}
              className="px-4 py-2 font-bold text-white bg-yellow-600 shadow-2xl"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
