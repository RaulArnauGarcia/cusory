import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Auth from "../../utils/auth";
import "./profile.css";

const defaulImg = "https://placehold.co/100x100";

const Profile = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Por favor seleciona un archivo");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", file);

    const token = Auth.getToken();

    try {
      const response = await axios.post(`users/avatar`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/from-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isAuthenticated) {
    return <div>Por favor, logeate</div>;
  }

  if (!user) {
    return <div>Cargando perfil de usuario...</div>;
  }

  console.log(user);
  return (
    <div className="containerProfile">
      <h2 className="titleProfile">Perfil de Usuario</h2>
      <p className="parrafName">Nombre de Usuario: {user.username}</p>
      <p className="parrafEmail">Email: {user.email}</p>
      <img src={user.photo || defaulImg} alt="" />
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Cambiar</button>
      </form>
    </div>
  );
};

export default Profile;
