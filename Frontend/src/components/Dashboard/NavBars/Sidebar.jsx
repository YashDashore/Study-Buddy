import { Link } from "react-router-dom";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-700 text-white shadow-lg transform transition-transform duration-300 z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-2xl font-semibold">Menu</h2>
      </div>
      <nav className="p-4 space-y-4">
        <Link
          to="/todos"
          onClick={toggleSidebar}
          className="block py-2 px-3 rounded hover:bg-gray-900 text-white hover:text-blue-900 transition"
        >
          Profile
        </Link>
        <hr className="my-2 border-white-900" />
        <Link
          to="/"
          onClick={toggleSidebar}
          className="block py-2 px-3 rounded hover:bg-gray-900 text-white hover:text-blue-700 transition"
        >
          Home
        </Link>
        <hr className="my-2 border-white-900" />
        <Link
          to="/assignments"
          onClick={toggleSidebar}
          className="block py-2 px-3 rounded hover:bg-gray-900 text-white hover:text-blue-700 transition"
        >
          Attendance Tracker
        </Link>
        <hr className="my-2 border-white-900" />
        <Link
          to="/assignments"
          onClick={toggleSidebar}
          className="block py-2 px-3 rounded hover:bg-gray-900 text-white hover:text-blue-700 transition"
        >
          Assignments
        </Link>
        <hr className="my-2 border-white-900" />
        <Link
          to="/todos"
          onClick={toggleSidebar}
          className="block py-2 px-3 rounded hover:bg-gray-900 text-white hover:text-blue-700 transition"
        >
          Daily To-dos
        </Link>
        <hr className="my-2 border-white-900" />
        <Link
          to="/todos"
          onClick={toggleSidebar}
          className="block py-2 px-3 rounded hover:bg-gray-900 text-white hover:text-blue-700 transition"
        >
          Group Tasks
        </Link>
        <hr className="my-2 border-white-900" />
        <Link
          to="/progress"
          onClick={toggleSidebar}
          className="block py-2 px-3 rounded hover:bg-gray-900 text-white hover:text-blue-700 transition"
        >
          Study Progress
        </Link>
        <hr className="my-2 border-white-900" />
        <Link
          to="/progress"
          onClick={toggleSidebar}
          className="block py-2 px-3 rounded hover:bg-gray-900 text-white hover:text-blue-700 transition"
        >
          Settings
        </Link>
        <hr className="my-2 border-white-900" />
        <Link
          to="/progress"
          onClick={toggleSidebar}
          className="block py-2 px-3 rounded hover:bg-gray-900 text-white hover:text-blue-700 transition"
        >
          Contact Us
        </Link>
        <hr className="my-2 border-white-900" />
        <Link
          to="/progress"
          onClick={toggleSidebar}
          className="block py-2 px-3 rounded hover:bg-gray-900 text-white hover:text-blue-700 transition"
        >
          About us
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
