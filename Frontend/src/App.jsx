import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import CreateAssignment from "./pages/CreateAssignment.jsx";
import CreateTodo from "./pages/CreateTodo.jsx";
import Assignment from "./pages/Assignment.jsx";
import Todos from "./pages/Todos.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route
            path="/create-assignment"
            element={<CreateAssignment />}
          ></Route>
          <Route path="/create-todo" element={<CreateTodo />}></Route>
          <Route path="/assignments" element={<Assignment />}></Route>
          <Route path="/todos" element={<Todos />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Dashboard></Dashboard> */}
    </>
  );
}

export default App;
