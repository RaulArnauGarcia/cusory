import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import auth from "../../../utils/auth";
import "./entryTasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const logged = auth.loggedIn();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/tasks");
        console.log(response.data.data);
        setTasks(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <h1>LOADING...</h1>}
      {logged &&
        tasks.map(({ title, id, name, file_path, description }) => (
          <div key={id} className="divContainer">
            <Link className="taskContainer" to={`/tasks/${id}`}>
              <h3>Titulo: {title}</h3>
              <h3>{name}</h3>
              <h3>Nombre del archivo: {file_path}</h3>
              <h3>Descripción: {description}</h3>
            </Link>
          </div>
        ))}
      {!logged &&
        tasks.map(({ title, id, name, file_path, description }) => (
          <div key={id} className="divContainer">
            <div className="taskContainer">
              <h3>Titulo: {title}</h3>
              <h3>{name}</h3>
              <h3>Nombre del archivo: {file_path}</h3>
              <h3>Descripción:{description}</h3>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Tasks;
