import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Registration.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
