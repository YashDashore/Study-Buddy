import { useState } from "react";
import { loginUser } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/Registration_Login/Input";
import SubmitButton from "../../components/Registration_Login/SubmitButton";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    Password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(formData);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="w-full md:w-[420px] p-8 md:p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold font-logo text-gray-900 mb-2">
            Study-Buddy
          </h1>
          <p className="text-gray-500 mb-6">
            Welcome back, Login to continue to your Study Buddy
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Username or Email"
              name="identifier"
              type="text"
              value={formData.identifier}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              name="Password"
              type="Password"
              value={formData.Password}
              onChange={handleChange}
            />

            <SubmitButton text="Login" />

            <p className="text-sm text-center text-gray-500 mt-4">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-purple-600 font-medium hover:underline"
              >
                Sign Up
              </a>
            </p>
          </form>
        </div>

        <div className="hidden md:block w-[420px] h-full">
          <img
            src="https://plus.unsplash.com/premium_photo-1664372145591-f7cc308ff5da?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZHl8ZW58MHx8MHx8fDA%3D"
            alt="Study Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
