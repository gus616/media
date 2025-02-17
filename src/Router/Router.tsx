import { Route, Routes } from "react-router";
import Login from "../Auth/Pages/Login";
import Users from "../Users/Pages/Users";


export const Router = () => {
  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
};