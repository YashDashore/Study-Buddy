import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.js";
import InputField from "../components/Registration_Login/Input.jsx";
import SubmitButton from "../components/Registration_Login/SubmitButton.jsx";


function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    Organization: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("Profile_Photo", profilePhoto);

    try {
      await registerUser(data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert(
        `Registration failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
  <div className="flex justify-center items-center min-h-screen bg-gray-300">
    <div className="flex w-[65%] max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden">
      
      <div className="w-1/2 p-10 flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold font-logo text-gray-900 mb-2">Study-Buddy</h1>
        <p className="text-gray-500 mb-6">Create your account to get started</p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <InputField
            label="Username"
            name="Username"
            type="text"
            value={formData.Username}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            name="Email"
            type="email"
            value={formData.Email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            name="Password"
            type="password"
            value={formData.Password}
            onChange={handleChange}
          />
          <InputField
            label="Organization"
            name="Organization"
            type="text"
            value={formData.Organization}
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Photo
            </label>
            <input
              type="file"
              name="Profile_Photo"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                file:rounded-md file:border-0 file:text-sm file:font-semibold
                file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>

          <SubmitButton text="Register" />
        </form>
      </div>

      <div className="w-1/2 h-full">
        <img
          src="https://plus.unsplash.com/premium_photo-1664372145591-f7cc308ff5da?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZHl8ZW58MHx8MHx8fDA%3D"
          alt="Study Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);

}

export default Register;
