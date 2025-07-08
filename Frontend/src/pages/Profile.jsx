import ProfileCard from "../components/Profile/ProfileCard";
import { useEffect, useState } from "react";
import Api from "../services/api";
import Navbar from "../components/Dashboard/NavBars/Navbar";
import Sidebar from "../components/Dashboard/NavBars/Sidebar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    // Call your backend route to fetch user profile
    const fetchProfile = async () => {
      try {
        const res = await Api.get("/users/details");
        setUser(res.data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-purple-100 ">
      <div>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} />
      </div>
      <h1 className="text-3xl font-bold py-4 mb-6 text-center">My Profile</h1>
      {user ? <ProfileCard user={user} /> : <p>Loading...</p>}
    </div>
  );
};

export default Profile;
