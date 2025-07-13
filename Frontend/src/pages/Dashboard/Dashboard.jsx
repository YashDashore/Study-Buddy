import Navbar from "../../components/Dashboard/Navigation/NavBars/Navbar.jsx";
import Sidebar from "../../components/Dashboard/Navigation/NavBars/Sidebar.jsx";
import Container from "../../components/Dashboard/Layouts/Header.jsx";
import SlidingTabs from "../../components/Dashboard/Navigation/SlidingTabs.jsx"
import AssignmentWidget from "../../components/Dashboard/Widgets/AssignmentWidget.jsx";
import TodoWidget from "../../components/Dashboard/Widgets/TodoWidget.jsx";
import StudyProgress from "../../components/Dashboard/Widgets/StudyProgress.jsx";
import Footer from "../../components/Dashboard/Layouts/Footer.jsx";
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
