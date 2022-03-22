import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { useAppSelector } from "../redux/index";

const Main = () => {
  const loginStatus: boolean = useAppSelector((state) => {
    return state.isAuthenticated;
  });
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route
            path="/signup"
            element={!loginStatus ? <SignUp /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={loginStatus ? <Home /> : <Navigate to="/signup" />}
          />
        </Routes>
      </div>
    </>
  );
};
export default Main;
