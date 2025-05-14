import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
  });

  const { error } = formData;
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      let { message } = err.response.data;
      setFormData((prev) => ({
        ...prev,
        error: message,
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

      <div>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div>
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          value={formData.password}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors"
      >
        Register
      </button>

      <p className="text-sm text-center text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </form>
  );
};

export default Register;
