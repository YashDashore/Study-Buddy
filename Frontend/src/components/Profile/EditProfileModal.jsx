// components/Profile/EditProfileModal.jsx
import React, { useState, useEffect } from "react";
import Api from "../../services/api";

const EditProfileModal = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Organization: "",
    Profile_Photo: null, // file input
  });

  useEffect(() => {
    if (user) {
      setFormData({
        Username: user.Username || "",
        Email: user.Email || "",
        Organization: user.Organization || "",
        Profile_Photo: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      Profile_Photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("Username", formData.Username);
      data.append("Email", formData.Email);
      data.append("Organization", formData.Organization);
      if (formData.Profile_Photo) {
        data.append("Profile_Photo", formData.Profile_Photo);
      }

      await Api.patch("/users/changeDetails", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully");
      onClose();
      window.location.reload(); // Optional: reload profile data after update
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <p className="block text-sm font-medium"> Only provide the field you want to update.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Organization</label>
            <input
              type="text"
              name="Organization"
              value={formData.Organization}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Profile Photo</label>
            <input
              type="file"
              name="Profile_Photo"
              onChange={handleFileChange}
              className="w-full mt-1"
              accept="image/*"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
