import { useNavigate } from "react-router-dom";
import BasicForm from "../components/Assignments/BasicForm";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Dashboard/NavBars/Navbar";
import Sidebar from "../components/Dashboard/NavBars/Sidebar";

const CreateTodo = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="min-h-screen bg-purple-100">
      <div>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} />
      </div>
      <div className="max-w-3xl mx-auto mt-10 bg-slate-700 shadow-xl rounded-2xl p-8 border border-orange-200">
        <div className="flex items-center justify-center mb-6 gap-2">
          <Sparkles className="text-orange-500" />
          <h1 className="text-4xl font-extrabold text-orange-500">
            Create To-Do
          </h1>
        </div>

        <p className="text-center text-orange-500 text-base-medium mb-8">
          Add your task, set subject, and plan your day effectively ✨
        </p>

        <BasicForm type="todo" onSuccess={() => navigate("/todos")} />
      </div>
    </div>
  );
};

export default CreateTodo;
