import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { logoutUser } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to logged out of current device?`
      );
      if (!confirmed) return;
      await logoutUser();
      alert("Logged out successfully.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
      navigate("/login");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
      <div className="flex items-center space-x-6">
        <img
          src={user.Profile_Photo || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.Username}</h2>
          <p className="text-gray-600">Email : {user.Email}</p>
          <p className="text-sm text-gray-400 mt-1">
            Organization : {user.Organization}
          </p>
          <p className="text-sm text-gray-400">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Edit Profile
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <EditProfileModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        user={user}
      />
    </div>
  );
};

export default ProfileCard;
