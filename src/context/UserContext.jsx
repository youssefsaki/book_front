import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const loginUser = (data) => {
    console.log("Logging in user:", data); // Log the user data and token for debugging
    setUserData({ ...data.user, token: data.token }); // Store only the user data
    localStorage.setItem("token", data.token); // Save token in localStorage
    localStorage.setItem("userName", data.user.name); // Save the username
  };

  const logoutUser = () => {
    console.log("Logging out user"); // Log out action
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("Checking localStorage for token:", token); // Log the token
    if (token && !userData) {
      axios
        .get("http://localhost:3000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Auto-login response:", res.data); // Log response for auto-login
          setUserData({ ...res.data, token });
        })
        .catch((err) => {
          console.log("Auto-login failed:", err.message);
          logoutUser(); // Log out if auto-login fails
        });
    }
  }, [userData]); // Add userData as a dependency to re-run this effect when userData changes

  return (
    <UserContext.Provider value={{ userData, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
