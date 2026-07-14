import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Destinations from "./Pages/Destinations";
import Lessons from "./Pages/Lessons";
import Trips from "./Pages/Trips";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;