import { useNavigate } from "react-router-dom";
import BasicForm from "../../../components/Tasks/TaskForm";
import { BookOpenCheck } from "lucide-react";
import Navbar from "../../../components/Dashboard/Navigation/NavBars/Navbar"
import Sidebar from "../../../components/Dashboard/Navigation/NavBars/Sidebar";
import { useState } from "react";

const CreateStudySession = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-red-200 px-4">
      <div>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} />
      </div>
      <div className="max-w-3xl mx-auto mt-10 bg-slate-700 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-red-200 transition-all duration-300 hover:shadow-red-300">
        
        <div className="flex items-center justify-center mb-6 gap-3">
          <BookOpenCheck className="text-red-400 w-8 h-8" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-red-400">
            Create Study Session
          </h1>
        </div>

        <p className="text-center text-red-300 text-base font-medium mb-10">
          Plan your study roadmap, track topic progress, and boost productivity
          🚀
        </p>

        <BasicForm
          type="studysession"
          onSuccess={() => navigate("/studyProgress")}
        />
      </div>
    </div>
  );
};

export default CreateStudySession;
