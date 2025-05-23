import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const profileString = localStorage.getItem("profile");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userProfile, setUserProfile] = useState(
    profileString && profileString !== "undefined" ? JSON.parse(profileString) : null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile && profile !== "undefined") {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  const login = (newToken, user) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("profile", JSON.stringify(user)); // ✅ Store full user profile (including role)
    setToken(newToken);
    setUserProfile(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile"); // ✅ Remove profile on logout
    setToken(null);
    setUserProfile(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, userProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
