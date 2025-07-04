import {
  fetchUserAssignments,
  deleteAssignment,
  fetchUserTodos,
  deleteTodo,
} from "../../services/assignments";
import TaskCard from "./TaskCard";
import { useState, useEffect } from "react";

const AllTasks = ({ type }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const getTasks = async () => {
      try {
        if (type === "Assignment") {
          const data = await fetchUserAssignments();
          setTasks(data);
        } else {
          const data = await fetchUserTodos();
          setTasks(data);
        }
      } catch (error) {
        console.error(`❌ Error fetching ${type} :`, error);
      }
    };
    getTasks();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${type}?`
    );
    if (!confirmed) return;
    try {
      if (type === "Assignment") {
        await deleteAssignment(id);
        const data = await fetchUserAssignments(); // refresh list after delete
        setTasks(data);
      } else {
        await deleteTodo(id);
        const data = await fetchUserTodos();
        setTasks(data);
      }
    } catch (err) {
      console.error(`❌ Failed to delete ${type}:`, err);
    }
  };

  // Will have to write it -
  const handleEdit = (assignment) => {
    // TODO: Open modal or navigate to edit page with this assignment
    console.log("Edit clicked:", assignment);
  };

  const filteredTasks = tasks.filter((a) => {
    if (filter === "pending") return a.status === "pending";
    if (filter === "completed") return a.status === "completed";
    return true; // 'all'
  });

  return (
    <div>
      <h1 className="py-5 text-center">
        <u>{type}</u>
      </h1>

      <div className="px-10 py-3 flex gap-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded ${
            filter === "pending" ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded ${
            filter === "completed" ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          Completed
        </button>
      </div>

      <div className="space-y-4 px-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              title={task.title}
              subject={task.subject}
              deadline={type === "Assignment" ? task.deadline : null}
              status={task.status}
              onEdit={() => handleEdit(task)}
              onDelete={() => handleDelete(task._id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No {type === "Assignment" ? "assignments" : "To-dos"} available.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllTasks;
