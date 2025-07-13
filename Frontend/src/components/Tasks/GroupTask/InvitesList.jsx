import { useEffect, useState } from "react";
import {
  getPendingInvites,
  respondToGroupInvite,
} from "../../../services/groupTask";

const InvitesList = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInvites = async () => {
    try {
      setLoading(true);
      const data = await getPendingInvites();
      setInvites(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  const handleResponse = async (taskId, response) => {
    try {
      await respondToGroupInvite(taskId, response);
      setInvites((prev) => prev.filter((i) => i.taskId !== taskId)); 
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading invites...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Pending Group Task Invites</h2>
      {invites.length === 0 ? (
        <h4 className="text-xl font-semibold mb-4 text-center">(No pending invites 🎉)</h4>
      ) : (
        <ul className="space-y-4">
          {invites.map((invite) => (
            <li key={invite.taskId} className="border p-4 rounded-md bg-white shadow-sm">
              <p>
                <strong className="text-lg">Task:</strong> {invite.title}
              </p>
              <p>
                <strong className="text-base">👤 Leader:</strong> {invite.leader}
              </p>
              <div className="mt-2 space-x-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => handleResponse(invite.taskId, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleResponse(invite.taskId, "rejected")}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InvitesList;
