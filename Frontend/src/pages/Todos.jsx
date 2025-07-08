import AllTasks from "../components/Assignments/AllTasks";
import Navbar from "../components/Dashboard/NavBars/Navbar";
import Sidebar from "../components/Dashboard/NavBars/Sidebar";
import { useState } from "react";

const Todos = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div>
      <div>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} />
      </div>
      <div className="min-h-screen bg-purple-100 py-3 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6"></div>
          <AllTasks type={"Todos"} />;
        </div>
      </div>
    </div>
  );
};

export default Todos;
