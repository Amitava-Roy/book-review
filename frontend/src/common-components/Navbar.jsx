import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-indigo-200 transition duration-300 mb-2 sm:mb-0"
        >
          BookReviewz
        </Link>
        <div className="space-x-2 sm:space-x-4 flex items-center">
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  navigate("/");
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition duration-300 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition duration-300 shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
