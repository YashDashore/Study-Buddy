// components/SharedTaskForm/TaskForm.jsx
import { useState } from "react";
import InputField from "../Registration_Login/Input.jsx";
import { createAssignment, createTodo } from "../../services/assignments.js";

const BasicForm = ({ type }) => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    deadline: "", // only needed for assignment
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (type === "assignment") {
        await createAssignment(formData);
      } else {
        await createTodo(formData);
      }

      alert(`${type === "assignment" ? "Assignment" : "Task"} created!`);
    } catch (err) {
      console.error(err);
      alert("Failed to create task/assignment");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-xl mx-auto p-6 rounded-xl shadow-md space-y-4"
    >
      <InputField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <InputField
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />

      {type === "assignment" && (
        <InputField
          label="Deadline"
          name="deadline"
          type="date"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {type === "assignment" ? "Create Assignment" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
