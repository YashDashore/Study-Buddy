import { useState } from "react";
import InputField from "../Registration_Login/Input";
import {
  updateAssignment,
  updateTodo,
  updateStudySession,
} from "../../services/assignments";

const EditTaskModal = ({ type, task, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ ...task });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "Assignment") {
        await updateAssignment(task._id, formData);
      } else if (type === "Todos") {
        await updateTodo(task._id, formData);
      } else {
        await updateStudySession(task._id, formData);
      }
      alert(`${type} updated successfully!`);
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-xl relative shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-4 text-xl">
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Edit {type}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type !== "Study Progress" && (
            <InputField
              label="Title"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              required
            />
          )}
          {type === "Study Progress" ? (
            <InputField
              label="Subject"
              name="Subject"
              value={formData.Subject || ""}
              onChange={handleChange}
              required
            />
          ) : (
            <InputField
              label="Subject"
              name="subject"
              value={formData.subject || ""}
              onChange={handleChange}
              required
            />
          )}
          {type === "Assignment" && (
            <InputField
              label="Deadline"
              type="date"
              name="deadline"
              value={formData.deadline?.slice(0, 10) || ""}
              onChange={handleChange}
              required
            />
          )}
          {type === "Study Progress" && (
            <>
              <InputField
                label="Total Topics"
                name="Total_topics"
                value={formData.Total_topics}
                onChange={handleChange}
                required
              />
              <InputField
                label="Covered Topics"
                name="Covered_topics"
                value={formData.Covered_topics}
                onChange={handleChange}
                required
              />
            </>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
