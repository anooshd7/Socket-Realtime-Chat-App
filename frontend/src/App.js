import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Landing from "./landing";
import Signup from "./Signup";
import Login from "./login";

import Avatar from "./Avatar";
import Chat from "./chatroom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chatroom" element={<Chat />} />
        <Route path="/avatar" element={<Avatar />} />
      </Routes>
    </Router>
  );
}
export default App;
