// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCSRFToken = async () => {
    try {
      await axios.get("http://localhost:8000/auth/csrf/", {
        withCredentials: true,
      });
    } catch (error) {
      console.error("CSRF Token fetch failed", error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/user/", {
        withCredentials: true,
      });
      console.log("User data:", response.data.user);
      setUser(response.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      await fetchCSRFToken();
      const response = await axios.post(
        "http://localhost:8000/auth/login/",
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Invalid credentials.");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/auth/logout/",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
      throw new Error("Logout failed.");
    }
  };

  useEffect(() => {
    fetchCurrentUser(); // check if user is already logged in
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
