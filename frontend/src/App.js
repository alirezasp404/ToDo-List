import "bootstrap/dist/css/bootstrap.min.css";
import Signin from "./components/user/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/user/Signup";
import Home from "./components/task/Home";
import EditTask from "./components/task/EditTask";
import CreateTask from "./components/task/CreateTask";
import "./style.css";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home/:id" element={<Home />}></Route>
        <Route path="/edit/:taskID/:id" element={<EditTask />}></Route>
        <Route path="/create/:id" element={<CreateTask />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
