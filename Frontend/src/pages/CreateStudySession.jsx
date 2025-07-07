import { Link } from "react-router-dom";
import BasicForm from "../components/Assignments/BasicForm";
import { BookOpenCheck } from "lucide-react";

const CreateStudySession = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-red-200 py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-red-200 transition-all duration-300 hover:shadow-red-300">
        {/* Header Section */}
        <div className="flex items-center justify-center mb-6 gap-3">
          <BookOpenCheck className="text-red-500 w-8 h-8" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-red-500">
            Create Study Session
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-center text-gray-600 text-base font-medium mb-10">
          Plan your study roadmap, track topic progress, and boost productivity
          🚀
        </p>

        {/* Form Component */}
        <BasicForm type="studysession" />
      </div>
    </div>
  );
};

export default CreateStudySession;
