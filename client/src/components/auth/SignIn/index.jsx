import { useState } from "react";
import axios from "axios";
import Modal from "../../Modal";
import { useNavigate } from "react-router-dom";
import "./signIn.css";

axios.defaults.baseURL = "http://localhost:3000/api";

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
  });

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("users/register", credentials);
      console.log(response.data.status);
      if (response.data.status === "OK") {
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleClose = () => {
    setShowModal(false);
    setCredentials({
      username: "",
      email: "",
      password: "",
      bio: "",
    });
    navigate("/auth/login");
  };

  return (
    <>
      <div className="container">
        <form className="inputContainer" onSubmit={handleSubmit}>
          <h3 className="containerTitle">Registrate</h3>
          <input
            className="signIn_input"
            type="email"
            name="email"
            value={credentials.email}
            placeholder="Ingresa tu correo"
            onChange={handleChange}
          />
          <input
            className="signIn_input"
            type="text"
            name="username"
            value={credentials.username}
            placeholder="nombre de usuario"
            onChange={handleChange}
          />
          <input
            className="signIn_input"
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Ingresa tu Contraseña"
            onChange={handleChange}
          />
          <input
            className="signIn_input"
            type="text"
            name="bio"
            value={credentials.bio}
            placeholder="Biografia"
            onChange={handleChange}
          />
          <button className="buttonInput" type="submit">
            Ingresar
          </button>
        </form>
        {showModal && (
          <Modal>
            <p>Registro exitoso, por favor loggeate</p>
            <button onClick={handleClose}>Log In</button>
          </Modal>
        )}
      </div>
    </>
  );
};

export default SignIn;
