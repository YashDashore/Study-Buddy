import { useEffect, useState } from "react";
import {
  getGroupTaskDetails,
  updateGroupMembers,
  removeUserFromGroup,
  leaveGroupTask,
} from "../services/groupTask";
import { getCurrentUser } from "../services/auth";
import { X } from "lucide-react";

const GroupDetailsModal = ({ taskId, onClose }) => {
  const [groupTask, setGroupTask] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [inviteUsername, setInviteUsername] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser(); 
        setCurrentUser(user);

        const task = await getGroupTaskDetails(taskId);
        setGroupTask(task);
        setCurrentUser(user);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchData();
  }, [taskId]);

  const isTeamLeader =
    currentUser &&
    groupTask?.Team_Leader &&
    currentUser._id === groupTask.Team_Leader._id;

  const handleInvite = async () => {
    if (!inviteUsername.trim()) return;
    try {
      setLoading(true);
      const updated = await updateGroupMembers(taskId, {
        invite: [inviteUsername.trim()],
      });
      setInviteUsername("");
      alert("Successfully invited.")
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (userId) => {
    if (!window.confirm("Remove user from group?")) return;
    try {
      const updated = await removeUserFromGroup(taskId, userId);
      setGroupTask(updated.groupTask);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLeave = async () => {
    if (!window.confirm("Are you sure you want to leave the group?")) return;
    try {
      await leaveGroupTask(taskId);
      onClose(); 
    } catch (err) {
      alert(err.message);
    }
  };

  if (!groupTask || !currentUser)
    return <p className="text-center">Loading...</p>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-xl relative">
      <button
        className="absolute top-2 right-2 text-gray-500"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      <h2 className="text-2xl font-bold mb-4">{groupTask.title}</h2>
      <p className="text-lg text-gray-700 mb-2">
        Subject: <span className="font-medium">{groupTask.subject}</span>
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Deadline: {new Date(groupTask.deadline).toLocaleDateString()}
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">Team Leader</h3>
      <p className="text-blue-600 font-medium">
        {groupTask.Team_Leader?.Username}
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">Assigned Members</h3>
      <ul className="space-y-1 mb-4">
        {groupTask.assignedUsers.map((user) => (
          <li key={user._id} className="flex justify-between items-center">
            <span>{user.Username}</span>
            {isTeamLeader && user._id !== currentUser._id && (
              <button
                onClick={() => handleRemove(user._id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>

      {isTeamLeader && (
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-2">Invite New Member</h4>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter username"
              value={inviteUsername}
              onChange={(e) => setInviteUsername(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
            <button
              onClick={handleInvite}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Inviting..." : "Invite"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 text-right">
        <button
          onClick={handleLeave}
          className="text-sm text-white rounded border-2 px-4 py-1.5  bg-red-500 hover:text-red-700"
        >
          Leave Group
        </button>
      </div>
    </div>
  );
};

export default GroupDetailsModal;
