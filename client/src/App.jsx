import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Outlet />
    </AuthProvider>
  );
}

export default App;
