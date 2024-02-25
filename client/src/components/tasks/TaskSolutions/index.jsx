import { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import auth from "../../../utils/auth";
import "./taskSolutions.css";
// import AuthContext from "../../../context/AuthContext";

axios.defaults.baseURL = "http://localhost:3000/api";

const NewTask = () => {
  const [formData, setFormData] = useState({
    description: "",
  });

  const { taskId } = useParams();

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Por favor seleciona un archivo");
      return;
    }

    const fromDataToSend = new FormData();
    fromDataToSend.append("description", formData.description);
    fromDataToSend.append("file", file);

    const token = auth.getToken();

    try {
      const response = await axios.post(
        `/tasks/${taskId}/solutions`,
        fromDataToSend,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/from-data",
          },
        }
      );
      console.log("New Solution create:", response.data);
      if (response.data.status === "ok") {
        navigate(`/tasks/${taskId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="containerSolutions">
      <h2 className="titleSolutions">Solución</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label className="labelInput" htmlFor="description">
            Description:
          </label>
          <input
            className="inputForm"
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Crear</button>
        </div>
      </form>
    </div>
  );
};

export default NewTask;
