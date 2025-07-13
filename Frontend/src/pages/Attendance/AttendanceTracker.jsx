import { useState } from "react";
import Navbar from "../../components/Dashboard/Navigation/NavBars/Navbar"
import Sidebar from "../../components/Dashboard/Navigation/NavBars/Sidebar";
import Footer from "../../components/Dashboard/Layouts/Footer";
import { CalendarCheck } from "lucide-react";

const AttendanceTracker = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col min-h-screen bg-purple-100">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />

      <main className="flex-grow max-w-3xl mx-auto px-6 py-20 text-center text-gray-800">
        <div className="flex flex-col items-center justify-center">
          <CalendarCheck className="w-16 h-16 text-purple-600 mb-4" />
          <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Attendance Tracker Coming Soon!
          </h1>
          <p className="text-lg text-gray-700 max-w-xl">
            We're working hard to bring you a smart and easy-to-use attendance
            tracking feature that helps you monitor your daily class attendance
            and session history effortlessly. Stay tuned for updates!
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AttendanceTracker;
