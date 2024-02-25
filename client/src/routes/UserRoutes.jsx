import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile";
import NewTask from "../components/tasks/NewTask";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/publica" element={<NewTask />} />
    </Routes>
  );
}

export default UserRoutes;
