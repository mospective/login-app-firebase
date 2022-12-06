import React from "react";
import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>   
  );
}

export default App;
// 28.42 video - also visit your event planner project