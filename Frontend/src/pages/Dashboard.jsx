import Navbar from "../components/Dashboard/NavBars/Navbar";
import Sidebar from "../components/Dashboard/NavBars/Sidebar";
import Container from "../components/Dashboard/Header.jsx";
import SlidingTabs from "../components/Dashboard/SlidingTabs";
import AssignmentWidget from "../components/Dashboard/Widgets/AssignmentWidget";
import TodoWidget from "../components/Dashboard/Widgets/TodoWidget";
import StudyProgress from "../components/Dashboard/Widgets/StudyProgress";
import Footer from "../components/Dashboard/Footer.jsx";
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
      <div className="flex flex-col lg:flex-row gap-6 px-4 items-stretch bg-purple-100 justify-center">
        <div className="flex-1">
          <AssignmentWidget />
        </div>
        <div className="flex-1">
          <TodoWidget />
        </div>
        <div className="flex-1">
          <StudyProgress />
        </div >
      </div>
      <div className="bg-purple-100 py-14 px-2 flex justify-center">
        <SlidingTabs />
      </div>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
