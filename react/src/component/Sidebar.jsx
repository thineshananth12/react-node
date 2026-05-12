import {
  Users,
  Building2,
  User,
  Briefcase,
  Ticket,
  Settings,
  X,
  Menu
} from "lucide-react";
import "./Sidebar.css";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
   const [isOpen, setIsOpen] =
    useState(true);
  return (
    <div className="min-h-screen bg-gray-100">
      <button
          onClick={() =>
            setIsOpen(!isOpen)
          }
          className="
            p-2
            rounded-lg
            hover:bg-gray-100
          "
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      {/* LEFT SIDEBAR */}
       <aside
        className={`
          sidebar
          ${isOpen
            ? "sidebar-open"
            : "sidebar-close"}
        `}
      >
        {/* MENU */}
        <nav className="flex flex-col gap-3">
          <div>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-black text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Users size={18} />
            <span>Manage Users</span>
          </NavLink>
          </div>
          <div>
          <NavLink
            to="/personal-profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100"
          >
            <User size={18} />
            <span>Personal Profile</span>
          </NavLink>
          </div>
          <div>
          <NavLink
            to="/business-profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100"
          >
            <Briefcase size={18} />
            <span>Business Profile</span>
          </NavLink>
          </div>
          
          <div>
          <NavLink
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100"
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
          </div>
        </nav>
      </aside>

      {/* PAGE CONTENT */}
      <main
        className={`
          transition-all
          duration-300
          pt-[80px]
          p-5
          min-h-screen

          ${
            isOpen
              ? "ml-[260px]"
              : "ml-[90px]"
          }
        `}
      >
        
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;