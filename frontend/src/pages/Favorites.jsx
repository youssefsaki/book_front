import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

const Favorites = () => {
  const { userData } = useUserContext();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(favorites);
    if (!userData || !userData.token) {
      setError("You need to be logged in to see your favorites.");
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/favorites", {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });
        console.log("Favorites response:", res.data);
        setFavorites(res.data);
      } catch (err) {
        setError("Failed to load favorites");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.token) {
      fetchFavorites();
    }
  }, [userData]);
  const handleRemoveFromFavorites = async (bookId) => {
    if (!userData) {
      alert("You must be logged in to remove from favorites");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/favorites/${bookId}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      alert("Book removed from favorites!");
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.bookId !== bookId)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to remove from favorites");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }
  if (favorites.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No favorites yet!</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Your Favorite Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((favorite) => (
          <div
            key={favorite.bookId}
            className="cursor-pointer bg-white shadow-md rounded-xl p-4"
          >
            <h3 className="text-lg font-semibold mb-2">{favorite.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{favorite.author}</p>
            {favorite.coverId ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${favorite.coverId}-M.jpg`}
                alt={favorite.title}
                className="rounded-lg w-full h-48 object-cover"
              />
            ) : (
              <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <button
              onClick={() => handleRemoveFromFavorites(favorite.bookId)}
              className="mt-2 px-4 py-2 bg-red-400 text-white rounded hover:bg-red-600"
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
