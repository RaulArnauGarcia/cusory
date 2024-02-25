import { createContext, useEffect, useState } from "react";
import Auth from "../utils/auth";
import axios from "axios";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(`user/${"" || userId}`);
      setUser(response.data.data);
      console.log(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  // // verifica si el usuario esta logIn al iniciar la aplicación
  // useEffect(() => {
  //   if (Auth.loggedIn()) {
  //     const profile = Auth.getProfile();
  //     setUser(profile);
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  // const login = (token) => {
  //   Auth.login(token);
  //   const profile = Auth.getProfile();
  //   setUser(profile);
  //   setIsAuthenticated(true);
  // };

  useEffect(() => {
    if (Auth.loggedIn()) {
      const profile = Auth.getProfile();
      fetchUserProfile(profile.id);
    }
  }, []);

  const login = async (token) => {
    Auth.login(token);
    const profile = Auth.getProfile();
    await fetchUserProfile(profile.id);
  };

  const logout = () => {
    Auth.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updatePhoto = (updatePhotoData) => {
    setUser(updatePhotoData);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, updatePhoto }}
    >
      {children}
    </AuthContext.Provider>
  );
};
