import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../../config/axiosConfig";
import { getAuthData } from "../../config/authConfig";
import { MoveLeft } from "lucide-react";

const BookDetails = ({ isLoggedIn }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBookDetails();
      fetchReviews();
    }
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/books/${id}`);
      setBook(response.data.result);
    } catch (err) {
      console.error("Error fetching book details:", err);
      setError("Failed to load book details");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const response = await apiClient.get("/reviews");
      // Filter reviews for this specific book
      const bookReviews = response.data.result.filter(
        (review) => review.book === id
      );
      setReviews(bookReviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setReviewsLoading(false);
    }
  };
  const { token } = getAuthData();
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      setIsSubmittingReview(true);
      await apiClient.post(
        "/reviews",
        {
          comment: newReview.trim(),
          book: id,
        },
        { headers }
      );

      fetchReviews();
      //   const newReviewData = response.data.result || response.data;
      //   setReviews((prev) => [newReviewData, ...prev]);
      setNewReview("");
    } catch (err) {
      console.error("Error submitting review:", err);
      // You might want to show an error message to the user
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-gray-600 text-lg mb-4">Book not found</div>
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <MoveLeft className="mr-2 w-4 h-4" />
          Back to Books
        </Link>
      </div>

      {/* Book Details */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/3">
            {book.thumbnailUrl ? (
              <img
                src={book.thumbnailUrl}
                alt={`Cover of ${book.title}`}
                className="w-full h-64 md:h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : (
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-64 md:h-full flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <div className="text-6xl mb-4">📚</div>
                  <div className="text-lg">{book.genre}</div>
                </div>
              </div>
            )}
            <div
              className="bg-gradient-to-br from-indigo-500 to-purple-600 h-64 md:h-full items-center justify-center"
              style={{ display: "none" }}
            >
              <div className="text-center text-white p-4">
                <div className="text-6xl mb-4">📚</div>
                <div className="text-lg">{book.genre}</div>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {book.title}
            </h1>

            <div className="space-y-3 mb-6">
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Genre:</span> {book.genre}
              </p>
              {book.publishedDate && (
                <p className="text-lg text-gray-600">
                  <span className="font-semibold">Published:</span>{" "}
                  {formatDate(book.publishedDate)}
                </p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {book.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Reviews ({reviews.length})
        </h2>

        {/* Add Review Form - Only for logged in users */}
        {isLoggedIn && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Write a Review
            </h3>
            <form onSubmit={handleSubmitReview}>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Share your thoughts about this book..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                required
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingReview || !newReview.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviewsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading reviews...</p>
            </div>
          ) : reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div
                key={review._id || index}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {review.user?.username
                        ? review.user.username.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-800">
                        {review.user?.username || "Anonymous User"}
                      </p>
                      {review.createdAt && (
                        <p className="text-sm text-gray-500">
                          {formatDate(review.createdAt)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed ml-11">
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500 text-lg mb-2">No reviews yet</div>
              <p className="text-gray-400">
                {isLoggedIn
                  ? "Be the first to write a review!"
                  : "Login to write the first review!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
