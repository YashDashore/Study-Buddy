import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import CreateAssignment from "./pages/CreateAssignment.jsx";
import CreateTodo from "./pages/CreateTodo.jsx";
import Assignment from "./pages/Assignment.jsx";
import Todos from "./pages/Todos.jsx";
import StudyProgress from "./pages/StudyProgress.jsx";
import CreateStudySession from "./pages/CreateStudySession.jsx";
import GroupTask from "./pages/GroupTask.jsx";
import CreateGroupTask from "./pages/CreateGroupTask.jsx";
import Notifications from "./pages/Notifications.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import AttendanceTracker from "./pages/AttendanceTracker.jsx";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
