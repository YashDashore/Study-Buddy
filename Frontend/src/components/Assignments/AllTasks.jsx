import {
  fetchUserAssignments,
  deleteAssignment,
  fetchUserTodos,
  fetchUserStudySessions,
  deleteTodo,
  deleteUserStudySession,
  updateAssignment,
  updateStudySession,
  updateTodo,
} from "../../services/assignments";
import TaskCard from "./TaskCard";
import { useState, useEffect } from "react";
import EditTaskModal from "./EditTaskModal";
import AddItemButton from "./AddItemButton";
import { useNavigate } from "react-router-dom";
import { BookOpenText, CheckSquare, GraduationCap } from "lucide-react";

const AllTasks = ({ type }) => {
  const [tasks, setTasks] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      try {
        if (type === "Assignment") {
          const data = await fetchUserAssignments();
          setTasks(data);
        } else if (type === "Todos") {
          const data = await fetchUserTodos();
          setTasks(data);
        } else {
          const data = await fetchUserStudySessions();
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
      } else if (type === "Todos") {
        await deleteTodo(id);
        const data = await fetchUserTodos();
        setTasks(data);
      } else {
        await deleteUserStudySession(id);
        const data = await fetchUserStudySessions();
        setTasks(data);
      }
    } catch (err) {
      console.error(`❌ Failed to delete ${type}:`, err);
    }
  };

  // Will have to write it -
  const handleEdit = (task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const filteredTasks = tasks.filter((a) => {
    if (filter === "pending")
      return a.status === "pending" || a.status === "In-progress";
    if (filter === "completed") return a.status === "completed";
    return true; // 'all'
  });

  const getEmptyText = () => {
    if (type === "Assignment") return "No assignments available.";
    if (type === "Todos") return "No to-dos available.";
    return "No study sessions available.";
  };

  const getIcon = (type) => {
    switch (type) {
      case "Assignment":
        return <BookOpenText className="text-blue-600 w-8 h-10" />;
      case "Todos":
        return <CheckSquare className="text-green-600 w-8 h-10" />;
      case "Study Progress":
        return <GraduationCap className="text-purple-600 w-8 h-10" />;
      default:
        return null;
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      if (type === "Assignment") {
        await updateAssignment(id, { status: newStatus });
        const data = await fetchUserAssignments();
        setTasks(data);
      } else if (type === "Todos") {
        await updateTodo(id, { status: newStatus });
        const data = await fetchUserTodos();
        setTasks(data);
      } else {
        await updateStudySession(id, { status: newStatus });
        const data = await fetchUserStudySessions();
        setTasks(data);
      }
    } catch (err) {
      console.error(`❌ Failed to update status:`, err);
      alert("Error updating status.");
    }
  };

  const Addbutton = () => {
    navigate(
      type === "Assignment"
        ? "/create-assignment"
        : type === "Todos"
        ? "/create-todo"
        : "/create-studySession"
    );
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-6">
        {getIcon(type)}
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
          {type}
        </h1>
      </div>

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

        <AddItemButton type={type} onClick={Addbutton} />
      </div>

      <div className="space-y-4 px-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              type={type}
              title={task.title}
              subject={type === "Study Progress" ? task.Subject : task.subject}
              onStatusChange={(newStatus) =>
                handleStatusChange(task._id, newStatus)
              }
              deadline={type === "Assignment" ? task.deadline : null}
              Total_topics={
                type === "Study Progress" ? task.Total_topics : null
              }
              Covered_topics={
                type === "Study Progress" ? task.Covered_topics : null
              }
              Remaining_topics={
                type === "Study Progress" ? task.Remaining_topics : null
              }
              PercentageProgress={
                type === "Study Progress" ? task.PercentageProgress : null
              }
              status={task.status}
              onEdit={() => handleEdit(task)}
              onDelete={() => handleDelete(task._id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">{getEmptyText()}</p>
        )}
      </div>
      {editModalOpen && (
        <EditTaskModal
          type={type}
          task={selectedTask}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedTask(null);
          }}
          onSuccess={async () => {
            // Refresh tasks
            if (type === "Assignment") {
              const data = await fetchUserAssignments();
              setTasks(data);
            } else if (type === "Todos") {
              const data = await fetchUserTodos();
              setTasks(data);
            } else {
              const data = await fetchUserStudySessions();
              setTasks(data);
            }
            setEditModalOpen(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default AllTasks;
