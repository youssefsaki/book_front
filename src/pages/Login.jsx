import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loginUser, userData } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (userData && userData.token) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );
      loginUser(res.data); // Save user data in context
      console.log("Login Response:", res.data);
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      console.error("Login error:", message);

      if (
        err.response?.status === 404 ||
        err.response?.status === 400 ||
        message === "Invalid credentials"
      ) {
        alert("Invalid credentials. Please register first.");
        navigate("/register");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        value={formData.password}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors"
      >
        Login
      </button>

      <p className="text-sm text-center text-gray-500">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Register
        </a>
      </p>
    </form>
  );
};

export default Login;
