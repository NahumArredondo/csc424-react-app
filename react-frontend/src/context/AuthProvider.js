import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    var setUsername = document.getElementById("Username").value;
    var setPassword = document.getElementById("Password").value;

    const token = await axios.post('http://localhost:5000/account/login', {
      username: setUsername,
      password: setPassword
    })
    .then(function (response) {
      console.log(response.data)
      setToken(response.data);
      navigate("/landing");
    })
      .catch(function (error) {
      navigate("/home");
      alert(error.response.data);
    });
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={{ value }}>
      {children}
    </AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);