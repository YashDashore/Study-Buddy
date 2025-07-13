import BasicForm from "../../../components/Tasks/TaskForm";
import { BookOpenCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../../components/Dashboard/Navigation/NavBars/Navbar";
import Sidebar from "../../../components/Dashboard/Navigation/NavBars/Sidebar";

const CreateGroupTask = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="min-h-screen bg-red-100 ">
      <div>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} />
      </div>
      <div className="max-w-3xl mx-auto mt-10 bg-slate-700 shadow-xl rounded-2xl p-8 border border-red-300">
        <div className="flex items-center justify-center mb-6 gap-2">
          <BookOpenCheck className="text-red-400" />
          <h1 className="text-4xl font-extrabold text-red-400">
            Create Group Task
          </h1>
        </div>

        <p className="text-center text-red-300 text-base font-medium mb-8">
          Finalize project, Meet with group... 📝
        </p>

        <BasicForm
          type="groupTask"
          onSuccess={() => navigate("/groupTask")}
        />
      </div>
    </div>
  );
};

export default CreateGroupTask;
