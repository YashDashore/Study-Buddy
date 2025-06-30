import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SplitText from "./Animations/SplitText";

const Container = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (type) => {
    setShowModal(false);
    navigate(`/create-${type.toLowerCase()}`); // routes: /create-assignment or /create-task
  };
  return (
    <div className="flex flex-col md:flex-row h-[500px] gap-4 bg-purple-100">
      {/* Left Section */}
      <div className="w-full md:w-1/2 h-full flex flex-col gap-4 p-4">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Small Image"
          className="rounded-lg shadow-md w-full h-[60%] object cover"
        />
        <button
          className="bg-black text-white px-14 py-2.5 rounded-md hover:bg-gray-800 transition w-max mx-auto"
          onClick={() => setShowModal(true)}
        >
          Add task / Assignment
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-extrabold leading-tight text-center mb-4">
            <SplitText
              text="Welcome to your Study-Buddy!"
              className="inline-block"
              delay={60}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </h1>
          <h3>
            <SplitText
              text="(Track.Plane.Achieve. With your Study-Buddy)"
              className="inline-block"
              delay={40}
              duration={0.5}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </h3>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center space-y-4">
            <h2 className="text-xl font-semibold">What do you want to add?</h2>
            <div className="flex justify-around">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleOptionSelect("Assignment")}
              >
                Assignment
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => handleOptionSelect("Task")}
              >
                Task
              </button>
            </div>
            <button
              className="text-red-500 hover:underline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Container;

// https://res.cloudinary.com/dhhxwychk/image/upload/v1750334731/Screenshot_2025-06-19_160414_klkilv.png

// https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
