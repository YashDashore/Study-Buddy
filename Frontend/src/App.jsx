import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Registration.jsx";
import Login from "./pages/Auth/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import CreateAssignment from "./pages/Tasks/Create/CreateAssignment.jsx";
import CreateTodo from "./pages/Tasks/Create/CreateTodo.jsx";
import Assignment from "./pages/Tasks/Assignment.jsx";
import Todos from "./pages/Tasks/Todos.jsx";
import StudyProgress from "./pages/Tasks/StudyProgress.jsx";
import CreateStudySession from "./pages/Tasks/Create/CreateStudySession.jsx";
import GroupTask from "./pages/Tasks/GroupTask.jsx";
import CreateGroupTask from "./pages/Tasks/Create/CreateGroupTask.jsx";
import Notifications from "./pages/Tasks/Notifications.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ContactUs from "./pages/Info/ContactUs.jsx";
import AboutUs from "./pages/Info/AboutUs.jsx";
import AttendanceTracker from "./pages/Attendance/AttendanceTracker.jsx";

function App() {
  return (
    <div className="min-h-screen bg-[#f5edff] text-gray-900">
      <div className="max-w-6xl mx-auto px-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route
            path="/create-assignment"
            element={<CreateAssignment />}
          ></Route>
          <Route path="/create-todo" element={<CreateTodo />}></Route>
          <Route
            path="/create-studySession"
            element={<CreateStudySession />}
          ></Route>
          <Route path="/assignments" element={<Assignment />}></Route>
          <Route path="/todos" element={<Todos />}></Route>
          <Route path="/studyProgress" element={<StudyProgress />}></Route>
          <Route path="/create-groupTask" element={<CreateGroupTask />}></Route>
          <Route path="/groupTask" element={<GroupTask />}></Route>
          <Route path="/notifications" element={<Notifications />}></Route>
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/attendanceTracker" element={<AttendanceTracker />} />
        </Routes>
      </BrowserRouter>
    </div>
      </div>
  );
}

export default App;
