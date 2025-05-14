import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userData } = useUserContext();
  const navigate = useNavigate();

  const genres = [
    { name: "Fantasy", path: "/genre/fantasy" },
    { name: "Science Fiction", path: "/genre/sci-fi" },
    { name: "Romance", path: "/genre/romance" },
  ];

  const handleGenreClick = (path) => {
    if (userData) {
      navigate(path);
    } else {
      alert("Please login to access genres.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-100 to-pink-100 flex flex-col items-center justify-center px-4 py-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to BookFinder
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Discover your next favorite book by exploring personalized genres!
        </p>
      </div>

      {/* Display Genres if Logged In */}
      {userData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((genre) => (
            <button
              key={genre.name}
              onClick={() => handleGenreClick(genre.path)}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 flex justify-center items-center text-lg font-semibold text-blue-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500"
            >
              {genre.name}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-red-500 text-lg font-medium mb-6">
            Please log in to explore book genres.
          </p>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
