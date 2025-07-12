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
import {
  getGroupTask,
  updateGroupTask,
  deleteGroupTask,
} from "../../services/groupTask";
import TaskCard from "./TaskCard";
import { useState, useEffect } from "react";
import EditTaskModal from "./EditTaskModal";
import GroupDetailsModal from "../GroupDetailsModal";
import AddItemButton from "./AddItemButton";
import { useNavigate } from "react-router-dom";
import { BookOpenText, CheckSquare, GraduationCap, Users } from "lucide-react";

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
        } else if (type === "Group Tasks") {
          const data = await getGroupTask();
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
        const data = await fetchUserAssignments(); 
        setTasks(data);
      } else if (type === "Todos") {
        await deleteTodo(id);
        const data = await fetchUserTodos();
        setTasks(data);
      } else if (type === "Group Tasks") {
        await deleteGroupTask(id);
        const data = await getGroupTask();
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

  const handleEdit = (task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const filteredTasks = tasks.filter((a) => {
    if (filter === "pending")
      return a.status === "pending" || a.status === "In-progress";
    if (filter === "completed") return a.status === "completed";
    return true;
  });

  const getEmptyText = () => {
    if (type === "Assignment") return "No assignments available.";
    if (type === "Todos") return "No to-dos available.";
    if (type === "Group Tasks") return "No group task available , create!";
    return "No study sessions available.";
  };

  const getIcon = (type) => {
    switch (type) {
      case "Assignment":
        return <BookOpenText className="text-blue-600 w-8 h-10" />;
      case "Todos":
        return <CheckSquare className="text-blue-600 w-8 h-10" />;
      case "Study Progress":
        return <GraduationCap className="text-purple-600 w-8 h-10" />;
      case "Group Tasks":
        return <Users className="text-blue-600 w-8 h-10" />;
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
      } else if (type === "Group Tasks") {
        await updateGroupTask(id, { status: newStatus });
        const data = await getGroupTask();
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
        : type === "Group Tasks"
        ? "/create-groupTask"
        : "/create-studySession"
    );
  };

  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const handleViewGroupDetails = (groupTaskId) => {
    setSelectedGroupId(groupTaskId);
  };

  const closeModal = () => {
    setSelectedGroupId(null);
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
              _id={task._id}
              type={type}
              title={task.title}
              subject={type === "Study Progress" ? task.Subject : task.subject}
              onStatusChange={(newStatus) =>
                handleStatusChange(task._id, newStatus)
              }
              deadline={
                type === "Assignment" || type === "Group Tasks"
                  ? task.deadline
                  : null
              }
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
              assignedUser={type === "Group Tasks" ? task.assignedUsers : null}
              Team_Leader={type === "Group Tasks" ? task.Team_Leader : null}
              onEdit={() => handleEdit(task)}
              onDelete={() => handleDelete(task._id)}
              onViewGroupDetails={handleViewGroupDetails}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">{getEmptyText()}</p>
        )}
      </div>
      {selectedGroupId && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
          <GroupDetailsModal taskId={selectedGroupId} onClose={closeModal} />
        </div>
      )}
      {editModalOpen && (
        <EditTaskModal
          type={type}
          task={selectedTask}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedTask(null);
          }}
          onSuccess={async () => {
            if (type === "Assignment") {
              const data = await fetchUserAssignments();
              setTasks(data);
            } else if (type === "Todos") {
              const data = await fetchUserTodos();
              setTasks(data);
            } else if (type === "Group Tasks") {
              const data = await getGroupTask();
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
