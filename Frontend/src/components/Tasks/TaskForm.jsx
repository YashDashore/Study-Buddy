import { useState } from "react";
import InputField from "../Registration_Login/Input.jsx";
import {
  createAssignment,
  createTodo,
  createStudySession,
} from "../../services/Tasks.js"
import { createGroupTask } from "../../services/groupTask.js";

const BasicForm = ({ type, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    deadline: "",
    Total_topics: "",
    Covered_topics: "",
    Subject: "", 
    invitations: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      Total_topics: Number(formData.Total_topics),
      Covered_topics: Number(formData.Covered_topics),
    };

    if (type === "groupTask") {
      const updatedPayload = {
        ...formData,
        invitations: formData.invitations
          .split(",")
          .map((username) => username.trim()),
      };
      await createGroupTask(updatedPayload);
      alert("Group Task created!");
      if (onSuccess) onSuccess();
      return;
    }

    try {
      if (type === "assignment") {
        await createAssignment(formData);
      } else if (type === "studysession") {
        await createStudySession(payload);
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
      if (onSuccess) onSuccess();
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

      {(type === "assignment" || type === "groupTask") && (
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

      {type === "groupTask" && (
        <InputField
          label="Invited Usernames (comma separated)"
          name="invitations"
          value={formData.invitations}
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
