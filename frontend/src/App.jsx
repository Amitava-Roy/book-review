import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import SignupPage from "./auth/page/SignupPage";
import SigninPage from "./auth/page/SigninPage";
import Navbar from "./common-components/Navbar";
import { clearAuthData, getAuthData } from "./config/authConfig";
import UserProfilePage from "./user_profile/page";
import HomePage from "./books/page/HomePage";
import BookDetails from "./books/page/BookDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return false;
  });

  useEffect(() => {
    const { token } = getAuthData();
    if (token) setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    clearAuthData();
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
  };

  return (
    <BrowserRouter>
      {/* Configure react-hot-toast */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636", // Dark background
            color: "#fff", // White text
            borderRadius: "8px",
            padding: "12px 16px",
            fontSize: "15px",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
            iconTheme: {
              primary: "#10B981", // Tailwind green-500
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444", // Tailwind red-500
              secondary: "#fff",
            },
          },
        }}
      />
      <div className="flex flex-col min-h-screen font-inter">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
            <Route
              path="/book/:id"
              element={<BookDetails isLoggedIn={isLoggedIn} />}
            />

            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <SignupPage setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <SigninPage setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />

            <Route
              path="/profile"
              element={
                isLoggedIn ? <UserProfilePage /> : <Navigate to="/signin" />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white text-center p-6 rounded-t-lg">
          <p className="text-sm sm:text-base">
            &copy; {new Date().getFullYear()} BookReviewz. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Crafted with ❤️ for book lovers
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
