import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css";

function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="homeContainer">
      {isAuthenticated ? (
        <>
          <h1 className="homeTitle">Bienvenido a Cusory.</h1>
        </>
      ) : (
        <>
          <h1 className="homeTitle">
            Ingresa a tu cuenta para poder acceder a las tareas.
          </h1>
        </>
      )}
    </div>
  );
}

export default Home;
