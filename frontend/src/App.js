import "bootstrap/dist/css/bootstrap.min.css";
import Signin from "./components/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
