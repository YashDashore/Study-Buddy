import { Link } from "react-router-dom";
import {
  Home,
  User,
  BookOpenCheck,
  CalendarCheck,
  NotebookPen,
  ListChecks,
  Layers,
  BarChart2,
  Settings,
  Mail,
  Info,
} from "lucide-react"; // optional icons

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const linkClasses =
    "flex items-center gap-3 py-2 px-4 text-gray-100 rounded-md hover:bg-gray-900 transition text-base font-medium";

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="px-3 pt-20 pb-3 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <BookOpenCheck className="text-white" size={24} />
          <h2 className="text-2xl font-bold text-white">StudyBuddy</h2>
        </div>
      </div>

      <nav className="mt-3 space-y-2">
        <p className="text-xs text-gray-400 uppercase tracking-wide pl-2">
          Main
        </p>
        <Link to="/dashboard" onClick={toggleSidebar} className={linkClasses}>
          <Home size={18} />
          Home
        </Link>
        <Link to="/profile" onClick={toggleSidebar} className={linkClasses}>
          <User size={18} />
          Profile
        </Link>

        <div className="border-t border-gray-700 my-4" />

        <p className="text-xs text-gray-400 uppercase tracking-wide pl-2">
          Productivity
        </p>
        <Link to="/assignments" onClick={toggleSidebar} className={linkClasses}>
          <NotebookPen size={18} />
          Assignments
        </Link>
        <Link to="/todos" onClick={toggleSidebar} className={linkClasses}>
          <ListChecks size={18} />
          Daily To-dos
        </Link>
        <Link to="/group-tasks" onClick={toggleSidebar} className={linkClasses}>
          <Layers size={18} />
          Group Tasks
        </Link>
        <Link to="/attendance" onClick={toggleSidebar} className={linkClasses}>
          <CalendarCheck size={18} />
          Attendance Tracker
        </Link>
        <Link to="/studyProgress" onClick={toggleSidebar} className={linkClasses}>
          <BarChart2 size={18} />
          Study Progress
        </Link>

        <div className="border-t border-gray-700 my-4" />

        <p className="text-xs text-gray-400 uppercase tracking-wide pl-2">
          Others
        </p>
        <Link to="/settings" onClick={toggleSidebar} className={linkClasses}>
          <Settings size={18} />
          Settings
        </Link>
        <Link to="/contact" onClick={toggleSidebar} className={linkClasses}>
          <Mail size={18} />
          Contact Us
        </Link>
        <Link to="/about" onClick={toggleSidebar} className={linkClasses}>
          <Info size={18} />
          About Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
