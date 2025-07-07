// components/SharedTaskForm/TaskForm.jsx
import { useState } from "react";
import InputField from "../Registration_Login/Input.jsx";
import {
  createAssignment,
  createTodo,
  createStudySession,
} from "../../services/assignments.js";

const BasicForm = ({ type }) => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    deadline: "",
    Total_topics: "",
    Covered_topics: "",
    Subject: "", // only needed for assignment
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    try {
      if (type === "assignment") {
        await createAssignment(formData);
      } else if (type === "studysession") {
        await createStudySession(formData);
      } else {
        await createTodo(formData);
      }

      alert(
        `${
          type === "assignment"
            ? "Assignment"
            : type === "studysession"
            ? "Study Session"
            : "Task"
        } created!`
      );
    } catch (err) {
      console.error(err);
      alert(`Errorrr - ${err.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-xl mx-auto p-6 rounded-xl shadow-md space-y-4"
    >
      {type !== "studysession" && (
        <InputField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      )}

      {type !== "studysession" && (
        <InputField
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      )}

      {type === "studysession" && (
        <InputField
          label="Subject"
          name="Subject"
          value={formData.Subject}
          onChange={handleChange}
          required
        />
      )}

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

      {type === "studysession" && (
        <InputField
          label="Total topics"
          name="Total_topics"
          value={formData.Total_topics}
          onChange={handleChange}
          required
        />
      )}

      {type === "studysession" && (
        <InputField
          label="Covered topics"
          name="Covered_topics"
          value={formData.Covered_topics}
          onChange={handleChange}
          required
        />
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {type === "assignment"
            ? "Create Assignment"
            : type === "studysession"
            ? "Create Study Session"
            : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
