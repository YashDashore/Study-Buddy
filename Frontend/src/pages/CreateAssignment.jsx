import BasicForm from "../components/Assignments/BasicForm";
import { BookOpenCheck } from "lucide-react"; // icon for assignment

const CreateAssignment = () => {
  return (
    <div className="min-h-screen bg-red-100 py-20">
      <div className="max-w-3xl mx-auto bg-slate-700 shadow-xl rounded-2xl p-8 border border-red-300">
        <div className="flex items-center justify-center mb-6 gap-2">
          <BookOpenCheck className="text-red-400" />
          <h1 className="text-4xl font-extrabold text-red-400">
            Create Assignment
          </h1>
        </div>

        <p className="text-center text-red-300 text-base font-medium mb-8">
          Set deadlines and track your assignment goals 📝
        </p>

        <BasicForm type="assignment" />
      </div>
    </div>
  );
};

export default CreateAssignment;