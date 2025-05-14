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
    <div>
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white px-4 py-12"
        style={{
          backgroundImage:
            "url('https://th.bing.com/th/id/OIP.7iPB4-SZsrVyIVOC2Pia1AHaEJ?rs=1&pid=ImgDetMain')",
        }}
      >
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-extrabold mb-5">
            <span className="text-white">Welcome to BookFi</span>nder
          </h1>
          <p className="text-2xl font-fold mb-10">
            <span className="text-white">
              {" "}
              Explore the world of books tailored to your favorite genres!
            </span>
          </p>
        </div>

        {/* Genres */}
        {userData ? (
          <div className="flex flex-wrap justify-center gap-4">
            {genres.map((genre) => (
              <button
                key={genre.name}
                onClick={() => handleGenreClick(genre.path)}
                className="w-60 h-32 text-3xl font-bold text-[#292929]  rounded-xl hover:bg-white hover:text-black transition-all duration-300 ease-in-out shadow-lg"
              >
                {genre.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-white text-2xl font-medium mb-6">
              <span className="text-white ">
                Please log in to explore book genres.
              </span>
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3 bg-[#292929] text-white rounded-xl hover:bg-black hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-3 bg-[#292929] text-white rounded-xl hover:bg-black hover:text-white transition"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
