import BasicForm from "../components/Assignments/BasicForm";
import { Sparkles } from "lucide-react"; // optional icon

const CreateTodo = () => {
  return (
    <div className="min-h-screen bg-purple-100 py-20">
      <div className="max-w-3xl mx-auto bg-slate-700 shadow-xl rounded-2xl p-8 border border-orange-200">
        <div className="flex items-center justify-center mb-6 gap-2">
          <Sparkles className="text-orange-500" />
          <h1 className="text-4xl font-extrabold text-orange-500">
            Create To-Do
          </h1>
        </div>

        <p className="text-center text-orange-500 text-base-medium mb-8">
          Add your task, set subject, and plan your day effectively ✨
        </p>

        <BasicForm type="todo" />
      </div>
    </div>
  );
};

export default CreateTodo;
