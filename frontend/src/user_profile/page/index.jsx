import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserById, updateUser } from "../api/user";
import { getAuthData } from "../../config/authConfig";

// User Profile Page
const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    // Add other fields like bio, etc.
  });
  const [initialProfileData, setInitialProfileData] = useState({});

  const { user, token } = getAuthData();

  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      const userDetails = await getUserById(user.id);
      setProfileData({
        username: userDetails?.result?.username || "",
        email: userDetails?.result?.email || "",
      });
      setInitialProfileData({
        username: userDetails?.result?.username || "",
        email: userDetails?.result?.email || "",
      });
    } catch (error) {
      toast.error("Could not load profile data.");
      console.error("Profile fetch error:", error);
      setProfileData({
        username: "Error User",
        email: "error@example.com",
      });
      setInitialProfileData({
        username: "Error User",
        email: "error@example.com",
      });
    }
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(user.id, profileData, token);
      fetchProfile();
      setInitialProfileData(profileData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to update profile.";
      toast.error(errorMsg);
      console.error("Profile update error:", error);
    }
  };

  const handleCancelEdit = () => {
    setProfileData(initialProfileData);
    setIsEditing(false);
  };

  if (!profileData.email) {
    // Basic loading state or if user data is not available
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
          Loading Profile...
        </h1>
        <p className="text-gray-600">
          If this takes too long, please try refreshing or logging in again.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
        User Profile
      </h1>
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username-profile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username-profile"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={profileData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email-profile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email-profile"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={profileData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Username</h3>
              <p className="mt-1 text-lg text-gray-900">
                {profileData.username || "Not set"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-lg text-gray-900">
                {profileData.email || "Not set"}
              </p>
            </div>

            <div className="pt-6 text-right">
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
