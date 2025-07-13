import InvitesList from "../../components/Tasks/GroupTask/InvitesList";
import Navbar from "../../components/Dashboard/Navigation/NavBars/Navbar"
import Sidebar from "../../components/Dashboard/Navigation/NavBars/Sidebar";
import { useState } from "react";
const Notifications = () => {
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
          <InvitesList />
        </div>
      </div>
    </div>
  );
};
export default Notifications;
