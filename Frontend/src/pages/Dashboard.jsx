import Navbar from "../components/Dashboard/NavBars/Navbar";
import Sidebar from "../components/Dashboard/NavBars/Sidebar";
import Container from "../components/Dashboard/Container";
import SlidingTabs from "../components/Dashboard/SlidingTabs";
import AssignmentWidget from "../components/Dashboard/Widgets/AssignmentWidget";
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
      <AssignmentWidget></AssignmentWidget>
      <SlidingTabs />
    </>
  );
};

export default Dashboard;
