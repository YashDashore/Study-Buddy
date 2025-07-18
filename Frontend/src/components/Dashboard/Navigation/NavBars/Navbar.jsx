import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, Bell } from "lucide-react";
import Sidebar from "./Sidebar";
import HamburgerMenu from "./HamburgerMenu";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../services/auth";

const Navbar = function () {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to logged out of current device?`
      );
      if (!confirmed) return;
      await logoutUser();
      navigate("/login");
    } catch (err) {
      console.error("Logout Error:", err.message);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-blue-700 text-white shadow-md relative">
        <HamburgerMenu toggleSidebar={toggleSidebar} />
        <h1 className="text-xl font-bold">Study-Buddy</h1>

        <div className="w-7 md:hidden" />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </header>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="text-purple-700 hover:text-purple-900"
          >
            <Menu size={28} />
          </button>
          <div className="text-2xl font-bold text-purple-700 font-logo">
            Study-Buddy
          </div>
        </div>
        <div className="flex gap-6 text-gray-700 font-medium text-sm md:text-base">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-purple-600 font-semibold text-xl"
                : "hover:text-purple-600 transition text-xl"
            }
          >
            Home{" "}
          </NavLink>
          <NavLink
            to="/groupTask"
            className={({ isActive }) =>
              isActive
                ? "text-purple-600 font-semibold text-xl"
                : "hover:text-purple-600 transition text-xl"
            }
          >
            Group Tasks{" "}
          </NavLink>
          <NavLink
            to="/attendanceTracker"
            className={({ isActive }) =>
              isActive
                ? "text-purple-600 font-semibold text-xl"
                : "hover:text-purple-600 transition text-xl"
            }
          >
            Attendance tracker{" "}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-purple-600 font-semibold text-xl"
                : "hover:text-purple-600 transition text-xl"
            }
          >
            About Us{" "}
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-purple-600 font-semibold text-xl"
                : "hover:text-purple-600 transition text-xl"
            }
          >
            Contact Us{" "}
          </NavLink>
        </div>
        <div className="flex items-center gap-10 mr-6">
          <NavLink
            to="/notifications"
            className="text-gray-700 hover:text-purple-600 transition text-xl relative"
            title="Notifications"
          >
            <Bell size={24} />
          </NavLink>

          <NavLink
            to="/dashboard"
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 transition text-xl"
          >
            Logout
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
