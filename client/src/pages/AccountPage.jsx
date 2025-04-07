import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import MyBlogs from "../pages/MyBlogs";
import axios from "axios";

const AccountPage = () => {
  let { subpage } = useParams();
  const { user, setUser, loading } = useAuth();
  const [redirect, setRedirect] = useState(null);

  if (subpage === undefined) subpage = "profile";

  async function logout() {
    try {
      await axios.post(
        "http://localhost:8000/auth/logout/",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setRedirect("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  function linkClasses(type) {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full transition";
    if (type === subpage) {
      classes += " bg-black text-white";
    } else {
      classes += " bg-gray-200 text-black";
    }
    return classes;
  }

  if (loading) {
    return <div className="text-center mt-24">Loading...</div>;
  }

  // Redirect to home if not logged in
  if (!user && !loading) {
    return <Navigate to="/" />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="mt-24 px-4">
      <nav className="w-full flex justify-center gap-2 mb-8">
        <Link className={linkClasses("profile")} to="/account">
          {/* SVG for profile */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 
                     20.118a7.5 7.5 0 0 1 14.998 0A17.933 
                     17.933 0 0 1 12 21.75c-2.676 
                     0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={linkClasses("myblogs")} to="/account/myblogs">
          {/* SVG for blogs */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 
                     5.25h12M3.75 6.75h.007v.008H3.75V6.75Z"
            />
          </svg>
          My Blogs
        </Link>
      </nav>

      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as <strong>{user?.name || "User"}</strong> (
          {user?.email || "No Email"}) <br />
          <Button
            label="Logout"
            onClick={logout}
            className="w-full bg-black text-white hover:bg-gray-800 mt-4"
          />
        </div>
      )}

      {subpage === "myblogs" && <MyBlogs />}
    </div>
  );
};

export default AccountPage;
