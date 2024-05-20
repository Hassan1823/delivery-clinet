// * imports
import React, { useEffect, useState } from "react";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaArrowRight, FaShippingFast } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineInventory2, MdBorderColor } from "react-icons/md";
import { FaPersonRays } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DashboardMain } from "../Dashboard/main/DashboardMain";
import { InventoryMain } from "../Dashboard/Inventory/InventoryMain";
import { CustomersMain } from "../Dashboard/Customers/CustomersMain";
import { Settings } from "../Dashboard/settings/Settings";
import { Shipping } from "../Dashboard/Shipping/Shipping";
import { useAuthContext } from "../../context/AuthContext";

// * local imports

const variants = {
  expanded: {
    width: "120%",
  },
  nonExpanded: {
    width: "80%",
  },
};

const navItems = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    component: () => <DashboardMain />,
  },
  {
    name: "Inventory",
    icon: MdOutlineInventory2,
    component: () => <InventoryMain />,
  },
  {
    name: "Customers",
    icon: FaPersonRays,
    component: () => <CustomersMain />,
  },
  { name: "shipping", icon: FaShippingFast, component: () => <Shipping /> },

  {
    name: "Settings",
    icon: IoSettingsSharp,
    component: () => <Settings />,
  },
];

const AdminSidebar = () => {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [IsExpanded, setIsExpanded] = useState(false);
  const { logoutHandler } = useAuthContext();

  const logout = async () => {
    await logoutHandler();
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderContent = () => {
    const selectedItem = navItems[activeNavIndex];
    return selectedItem.component ? selectedItem.component() : null;
  };

  return (
    <>
      <div className="flex center bg-[#E5E5E5]">
        <div>
          <motion.section
            animate={IsExpanded ? "expanded" : "nonExpanded"}
            // initial='expanded'
            variants={variants}
            className={
              "w-1/5 bg-gray-950 h-full flex flex-col justify-between items-center gap-10 relative" +
              (IsExpanded ? " py-8 px-6" : " py-8 px-6")
            }
          >
            <div
              id="expanded-icon"
              className="bg-[#04BBEE] text-black p-2 rounded-full cursor-pointer absolute -right-4 top-40 md:button-40 md:flex hidden "
              onClick={() => setIsExpanded(!IsExpanded)}
            >
              <FaArrowRight />
            </div>
            <div className="flex flex-col items-center justify-center gap-8">
              {IsExpanded ? (
                <div id="logo-box">
                  <Link to="/">
                    <h1 className="text-[#DF6951] font-bold text-4xl">
                      Delivery{" "}
                      <span className="italic text-[#FFF1DA]"> Hero</span>{" "}
                    </h1>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Link to="/">
                    <h1 className="text-[#DF6951] font-bold text-3xl">D</h1>
                    <span className="italic text-[#FFF1DA] text-3xl">E</span>
                  </Link>
                </div>
              )}
              <div
                id="navlinks-box"
                className="flex flex-col items-start justify-center w-full gap-5 mt-5 "
              >
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      id="link-box"
                      className={
                        "flex justify-center items-center w-full gap-4 py-4 px-4 rounded-xl cursor-pointer" +
                        (activeNavIndex === index
                          ? " bg-[#FFF1DA] text-black"
                          : " text-white") +
                        (IsExpanded ? " px-6 py-2" : " p-2")
                      }
                      onClick={() => setActiveNavIndex(index)}
                    >
                      <div className="bg-[#04BBEE] text-black p-2 rounded-full">
                        <Icon className="w-4 h-4 md:w-6 md:h-6" />
                      </div>
                      <span
                        className={
                          "text-lg" + (IsExpanded ? " flex" : " hidden")
                        }
                      >
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              id="logout-box"
              className="flex flex-col items-center justify-start w-full gap-4 cursor-pointer"
            >
              <div className="bg-slate-700 w-full h-[0.5px]">
                <div
                  className="flex items-center justify-center gap-2"
                  role="button"
                  onClick={logout}
                >
                  <MdLogout className="w-6 h-6 text-white" />
                  <span
                    className={
                      "text-white text-lg" + (IsExpanded ? " flex" : " hidden")
                    }
                  >
                    Logout
                  </span>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        <div className="flex flex-col w-full">
          <div>
            <div className="shadow-md navbar">
              <div className="navbar-start">
                <p className="px-20 py-5 text-3xl text-black ">Hello Seller</p>
              </div>
              <div className="navbar-end">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
                  >
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <button onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
