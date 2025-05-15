// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const GenrePage = () => {
//   const { genreName } = useParams();
//   const navigate = useNavigate();
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get(
//           `https://openlibrary.org/subjects/${genreName.toLowerCase()}.json?limit=50`
//         );
//         if (res.data.works.length === 0) {
//           setError("Genre not found");
//         } else {
//           setBooks(res.data.works);
//           setFilteredBooks(res.data.works);
//         }
//         setLoading(false);
//       } catch (err) {
//         setError("Genre not found");
//         setLoading(false);
//         console.log(err);
//       }
//     };

//     fetchBooks();
//   }, [genreName]);

//   useEffect(() => {
//     const filtered = books.filter(
//       (book) =>
//         book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.authors?.some((author) =>
//           author.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );
//     setFilteredBooks(filtered);
//   }, [searchTerm, books]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center mt-10 text-xl text-red-500">{error}</div>
//     );
//   }

//   return (
//     <div className="p-6 min-h-screen bg-gradient-to-br from-white via-blue-100 to-pink-50">
//       <h2 className="text-3xl font-bold mb-6 capitalize text-center text-blue-800">
//         {genreName} Books
//       </h2>

//       {/* Search input */}
//       <div className="mb-8 max-w-md mx-auto">
//         <input
//           type="text"
//           placeholder="Search by title or author..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {filteredBooks.map((book) => (
//           <div
//             key={book.key}
//             onClick={() => navigate(`/book/${book.key.split("/").pop()}`)}
//             className="cursor-pointer bg-white rounded-2xl p-4 shadow-md hover:shadow-2xl hover:-translate-y-2 active:scale-95 transform transition duration-300 flex flex-col justify-between"
//           >
//             {book.cover_id ? (
//               <img
//                 src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
//                 alt={book.title}
//                 className="rounded-xl w-full h-56 object-cover mb-4 shadow-sm"
//               />
//             ) : (
//               <div className="bg-gradient-to-r from-gray-200 to-gray-300 w-full h-56 rounded-xl flex items-center justify-center text-gray-500 italic mb-4 shadow-sm">
//                 No Image
//               </div>
//             )}

//             <h3
//               className="text-lg font-semibold text-gray-800 truncate hover:text-blue-600 transition"
//               title={book.title}
//             >
//               {book.title}
//             </h3>
//             <p className="text-sm text-gray-500 mt-1 italic">
//               {book.authors?.[0]?.name || "Unknown author"}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GenrePage;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

const GenrePage = () => {
  const { genreName } = useParams();
  const navigate = useNavigate();
  const { userData } = useUserContext();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `https://openlibrary.org/subjects/${genreName.toLowerCase()}.json?limit=50`
        );
        if (res.data.works.length === 0) {
          setError("Genre not found");
        } else {
          setBooks(res.data.works);
          setFilteredBooks(res.data.works);
        }
        setLoading(false);
      } catch (err) {
        setError("Genre not found");
        setLoading(false);
        console.log(err);
      }
    };

    fetchBooks();
  }, [genreName]);

  useEffect(() => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.authors?.some((author) =>
          author.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  const toggleLike = (bookKey) => {
    setLikedBooks((prev) =>
      prev.includes(bookKey)
        ? prev.filter((key) => key !== bookKey)
        : [...prev, bookKey]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-xl text-red-500">{error}</div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white via-blue-100 to-pink-50">
      <h2 className="text-3xl font-bold mb-6 capitalize text-center text-blue-800">
        {genreName} Books
      </h2>

      {/* Search input */}
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredBooks.map((book) => {
          const bookKey = book.key;
          const isLiked = likedBooks.includes(bookKey);

          return (
            <div
              key={bookKey}
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-2xl transform transition duration-300 flex flex-col justify-between"
            >
              <div
                onClick={() => navigate(`/book/${bookKey.split("/").pop()}`)}
                className="cursor-pointer"
              >
                {book.cover_id ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                    alt={book.title}
                    className="rounded-xl w-full h-56 object-cover mb-4 shadow-sm"
                  />
                ) : (
                  <div className="bg-gradient-to-r from-gray-200 to-gray-300 w-full h-56 rounded-xl flex items-center justify-center text-gray-500 italic mb-4 shadow-sm">
                    No Image
                  </div>
                )}

                <h3
                  className="text-lg font-semibold text-gray-800 truncate hover:text-blue-600 transition"
                  title={book.title}
                >
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 italic">
                  {book.authors?.[0]?.name || "Unknown author"}
                </p>
              </div>

              {userData && (
                <div
                  className="text-4xl cursor-pointer mt-3 self-end"
                  onClick={() => toggleLike(bookKey)}
                >
                  <span style={{ color: isLiked ? "red" : "gray" }}>♥</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenrePage;
