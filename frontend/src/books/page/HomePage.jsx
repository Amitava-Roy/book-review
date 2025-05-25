import { useEffect, useState } from "react";
import { addBook, getAllBooks } from "../api/books";
import { Link } from "react-router-dom";
import { getAuthData } from "../../config/authConfig";
import toast from "react-hot-toast";

const options = [
  "Fiction",
  "Non-fiction",
  "Fantasy",
  "Science",
  "Biography",
  "Other",
];

const HomePage = ({ isLoggedIn }) => {
  const [books, setBooks] = useState([]);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    shortDescription: "",
    genre: "",
    thumbnailUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = getAuthData();

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      const booksData = await getAllBooks();
      setBooks(booksData?.result?.docs || []);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitBook = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addBook(token, newBook);

      // Reset form and close modal
      setNewBook({
        title: "",
        shortDescription: "",
        genre: "",
        thumbnailUrl: "",
      });
      setShowAddBookModal(false);

      // Refresh books list
      await fetchAllBooks();
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("something went wrong");
      }
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowAddBookModal(false);
    setNewBook({
      title: "",
      shortDescription: "",
      genre: "",
      thumbnailUrl: "",
    });
  };

  console.log(books);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to BookReviewz!
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          Discover and share your favorite book reviews.
        </p>
        {!isLoggedIn && (
          <Link
            to="/signup"
            className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-base sm:text-lg"
          >
            Get Started - Sign Up Now!
          </Link>
        )}
      </header>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 text-center flex-1">
            Featured Books
          </h2>
          {isLoggedIn && (
            <button
              onClick={() => setShowAddBookModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              Add Book
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {books && books.length > 0 ? (
            books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-56 sm:h-64 flex items-center justify-center">
                  {book.thumbnailUrl ? (
                    <img
                      src={book.thumbnailUrl}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : (
                    <div className="text-center text-white p-4">
                      <div className="text-4xl mb-2">📚</div>
                      <div className="text-sm opacity-80">{book.genre}</div>
                    </div>
                  )}
                  <div
                    className="text-center text-white p-4"
                    style={{ display: "none" }}
                  >
                    <div className="text-4xl mb-2">📚</div>
                    <div className="text-sm opacity-80">{book.genre}</div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mb-2 text-sm sm:text-base">
                    Genre: <span className="font-medium">{book.genre}</span>
                  </p>
                  <p className="text-gray-600 mb-3 text-sm sm:text-base">
                    Published: {formatDate(book.publishedDate)}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700 mb-4 line-clamp-3">
                    {book.shortDescription}
                  </p>
                  <Link
                    to={`/book/${book._id}`}
                    className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 text-sm sm:text-base text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg">
                {books
                  ? "No books available at the moment."
                  : "Loading books..."}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Add Book Modal */}
      {showAddBookModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Add New Book
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmitBook} className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter book title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="genre"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Genre *
                  </label>
                  <select
                    id="genre"
                    name="genre"
                    value={newBook.genre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a genre</option>
                    {options?.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="shortDescription"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Short Description *
                  </label>
                  <textarea
                    id="shortDescription"
                    name="shortDescription"
                    value={newBook.shortDescription}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Enter a brief description of the book"
                  />
                </div>

                <div>
                  <label
                    htmlFor="thumbnailUrl"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    id="thumbnailUrl"
                    name="thumbnailUrl"
                    value={newBook.thumbnailUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Adding..." : "Add Book"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
