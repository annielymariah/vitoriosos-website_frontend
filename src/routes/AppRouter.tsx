import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "../pages/Landing/Landing";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
