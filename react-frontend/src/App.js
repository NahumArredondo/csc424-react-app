import { Routes, Route, NavLink } from "react-router-dom";
import { Home } from "./Home";
import { Landing } from "./Landing";
import { CreateUser } from "./CreateUser";
import React from "react";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";

export const AuthContext = React.createContext(null);  // we will use this in other components

const App = () => {
  const [token, setToken] = React.useState(null);
  // const [user, setUser] = React.useState(null);
  
  const handleLogout = () => {
    setToken(null);
  };
  
  <Navigation token={token} onLogout={handleLogout} />


  return (
    <AuthProvider>
    <Navigation />

    <Routes>
      <Route index element={<Home />} />
      <Route
  path="landing"
  element={
    <ProtectedRoute>
      <Landing />
    </ProtectedRoute>
  }
  />
      <Route path="home" element={<Home />} />
      <Route path="createUser" element={<CreateUser />} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  </AuthProvider>
  );
  };

  const Navigation = () => {
    const { value } = useAuth();
    return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/landing">Landing</NavLink>
  {value.token && (
      <button type="button" onClick={value.onLogout}>
        Sign Out
    </button>
  )}
    </nav>
);}

export default App;