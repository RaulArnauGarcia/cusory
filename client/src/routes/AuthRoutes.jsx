import { Routes, Route } from "react-router-dom";
import Login from "../components/auth/LogIn";
import SignIn from "../components/auth/SignIn";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

export default AuthRoutes;
