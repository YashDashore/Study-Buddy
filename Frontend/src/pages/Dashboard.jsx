import Navbar from "../components/Dashboard/NavBars/Navbar";
import Sidebar from "../components/Dashboard/NavBars/Sidebar";
import Container from "../components/Dashboard/Container";
import SlidingTabs from "../components/Dashboard/SlidingTabs";
import AssignmentWidget from "../components/Dashboard/Widgets/AssignmentWidget";
import TodoWidget from "../components/Dashboard/Widgets/TodoWidget";
import StudyProgress from "../components/Dashboard/Widgets/StudyProgress";
import { useState } from "react";
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <div>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} />
      </div>
      <Container />
      <div className="flex flex-col lg:flex-row gap-6 px-4 items-stretch bg-white-600 justify-center">
        <div className="flex-1">
          <AssignmentWidget />
        </div>
        <div className="flex-1">
          <TodoWidget />
        </div>
        <div className="flex-1">
          <StudyProgress />
        </div>
        <hr/>
      </div>
      <SlidingTabs />
    </>
  );
};

export default Dashboard;
