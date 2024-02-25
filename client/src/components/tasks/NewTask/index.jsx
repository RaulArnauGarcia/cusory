import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import auth from "../../../utils/auth";
import "./newTask.css";

axios.defaults.baseURL = "http://localhost:3000/api";

const NewTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

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
    fromDataToSend.append("title", formData.title);
    fromDataToSend.append("description", formData.description);
    fromDataToSend.append("file", file);

    const token = auth.getToken();

    try {
      const response = await axios.post("/tasks", fromDataToSend, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/from-data",
        },
      });
      console.log("New entry create:", response.data);
      if (response.data.status === "ok") {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="containerCont">
      <div className="containerPost">
        <h2 className="titlePost">Postea</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="inputPost">
            <label htmlFor="title">Titulo:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <label htmlFor="description">Description:</label>
            <input
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
    </div>
  );
};

export default NewTask;
