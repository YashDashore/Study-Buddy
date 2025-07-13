import { useState } from "react";
import Navbar from "../../components/Dashboard/Navigation/NavBars/Navbar"
import Sidebar from "../../components/Dashboard/Navigation/NavBars/Sidebar";
import Footer from "../../components/Dashboard/Layouts/Footer";

const AboutUs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col min-h-screen bg-purple-100">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />

      <main className="flex-grow max-w-3xl mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          About Study-Buddy
        </h1>

        <p className="mb-4 text-lg">
          Study-Buddy is a student-focused productivity tool built with the MERN stack. It helps you manage:
        </p>

        <ul className="list-disc list-inside text-base mb-6 space-y-2">
          <li>📚 Assignments & To-dos</li>
          <li>🤝 Group Projects</li>
          <li>📊 Study Progress</li>
          <li>🧠 Attendance Tracking</li>
        </ul>

        <p className="mb-4 text-lg">
          Our aim is to make student life more organized, collaborative, and stress-free. Stay tuned for upcoming features like ChatGPT integration, group chat, and smart study analytics.
        </p>

        <p className="text-base text-gray-600">
          Built with ❤️ using React, Node.js, Express, and MongoDB.
        </p>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
