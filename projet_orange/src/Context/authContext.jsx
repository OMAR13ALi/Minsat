import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Attach JWT to every outgoing request
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// On 401, clear stored auth and redirect to login
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("currentUser");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const initialCurrentUser =
    JSON.parse(sessionStorage.getItem("currentUser")) || {};
  const [currentUser, setCurrentUser] = useState(initialCurrentUser);

  useEffect(() => {
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  const isTokenExpired = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return true;
    }
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = tokenData.exp * 1000;
    if (Date.now() >= expiryTime) {
      setCurrentUser({});
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, isTokenExpired }}
    >
      {children}
    </AuthContext.Provider>
  );
};