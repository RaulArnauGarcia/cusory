import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import auth from "../../../utils/auth";
import { Link } from "react-router-dom";
import "./details.css";

function TasksDetails() {
  const { taskId } = useParams();
  const [task, setTask] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const logged = auth.loggedIn();
  const defaulImg = "https://placehold.co/100x100";

  if (logged) {
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(`/tasks/${taskId}`);
          console.log(response.data.data);
          setTask(response.data.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchTasks();
    }, [taskId]);

    if (!task) {
      return <div>Cargando...</div>;
    }

    return (
      <div className="containerDetails">
        {error && <p>{error}</p>}
        {loading && <h1>LOADING...</h1>}
        <h2 className="titleDetails">Titulo: {task.title}</h2>
        <p className="descriptionDetails">Descripción: {task.description}</p>
        <img src={defaulImg} alt="" />
        <Link className="linkDetails" to={`/tasks/${taskId}/solutions`}>
          Add Solution
        </Link>
      </div>
    );
  }
}

export default TasksDetails;
