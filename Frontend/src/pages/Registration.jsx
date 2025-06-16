import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.js";
import InputField from "../components/Input";
import SubmitButton from "../components/SubmitButton";

function Register() {   
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    Organization: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    if (profilePhoto) data.append("Profile_Photo", profilePhoto);

    try {
      await registerUser(data);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border mt-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          name="Username"
          placeholder="Username"
          onChange={handleChange}
        />
        <InputField
          name="Email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />
        <InputField
          name="Password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <InputField
          name="Organization"
          placeholder="Organization"
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="my-2"
          required
        />

        <SubmitButton label="Register" />
      </form>
    </div>
  );
}

export default Register;
