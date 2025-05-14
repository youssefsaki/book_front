import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import axios from "axios";

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(null);
  const [authorName, setAuthorName] = useState("Unknown");
  const [loading, setLoading] = useState(true);
  const { userData } = useUserContext();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(
          `https://openlibrary.org/works/${bookId}.json`
        );
        const bookData = res.data;
        setBook(bookData);

        const authorKey = bookData.authors?.[0]?.author?.key;
        if (authorKey) {
          const authorRes = await axios.get(
            `https://openlibrary.org${authorKey}.json`
          );
          setAuthorName(authorRes.data.name);
        }

        fetchAverageRating();
        setLoading(false);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const fetchAverageRating = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/ratings/${bookId}`
      );
      if (res.data.average) {
        setAverageRating(res.data.average.toFixed(1));
      }
    } catch (err) {
      console.error("Failed to fetch average rating:", err);
    }
  };

  const submitRating = async () => {
    if (!userData) {
      alert("You must be logged in to rate books");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/api/ratings/${bookId}`,
        {
          rating,
          review: "", // You can add a review field later
        },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      alert("Rating submitted!");
      fetchAverageRating();
    } catch (err) {
      alert("Failed to rate");
      console.log(err);
    }
  };

  const handleAddToFavorites = async () => {
    if (!userData) {
      alert("You must be logged in to add favorites");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/favorites",
        {
          userId: userData.id,
          bookId,
          title: book.title,
          author: authorName,
          coverId: book.covers?.[0] || null,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      alert("Book added to favorites!");
    } catch (err) {
      console.error("Failed to add to favorites:", err);
      alert("Failed to add to favorites");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!book) {
    return <p className="text-center mt-10 text-red-500">Book not found.</p>;
  }

  const coverId = book.covers?.[0];

  return (
    <div className="p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <button
        onClick={handleAddToFavorites}
        className="ml-4 mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add to Favorites
      </button>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {coverId ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
            alt={book.title}
            className="w-64 rounded shadow"
          />
        ) : (
          <div className="w-64 h-96 bg-gray-300 flex items-center justify-center rounded">
            No Cover
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-700 mb-2">✍️ Author: {authorName}</p>
          {book.description && (
            <p className="mb-4 text-gray-700">
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}
          <p className="text-gray-600 mb-2">
            📅 First published: {book.first_publish_date || "Unknown"}
          </p>

          <div className="my-4">
            <p>Average Rating: {averageRating || "Not rated yet"}</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                ★
              </button>
            ))}
            <button
              onClick={submitRating}
              className="ml-2 px-2 py-1 bg-blue-600 text-white rounded"
            >
              Rate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
