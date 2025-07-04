import { Pencil, Trash2 } from "lucide-react";

const TaskCard = ({ title, subject, deadline, status, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg flex justify-between items-start w-[85%]">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {subject && (
          <p className="text-sm text-gray-500">Subject : {subject}</p>
        )}
        {deadline && (
          <p className="text-sm text-gray-500">Deadline : {deadline}</p>
        )}
        {status && <p className="text-sm text-gray-500">Status : {status}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onEdit}
          className="p-1 rounded hover:bg-gray-100 transition"
          title="Edit"
        >
          <Pencil className="w-6 h-8 text-blue-600" />
        </button>   

        <button
          onClick={onDelete}
          className="p-1 rounded hover:bg-gray-100 transition"
          title="Delete"
        >
          <Trash2 className="w-6 h-8 text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
