import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import BlogCard from "../components/BlogCard";
import { useAuth } from "../contexts/AuthContext";
import { format } from "date-fns";
import Button from "../components/Button";

const MyBlogs = () => {
  const { action } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState([]);
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  const { user } = useAuth();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleUploadPhotos = async (e) => {
    const files = Array.from(e.target.files);
    const uploadPromises = files.map(async (file) => {
      const storageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    });

    const uploaded = await Promise.all(uploadPromises);
    setPhotos((prev) => [...prev, ...uploaded]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/blog/",
        {
          title,
          content,
          categories: selectedCategories, // ✅ send as array
          images: photos,
        },
        {
          withCredentials: true, // ✅ include cookies for auth
        }
      );
      alert("Blog Created!");
      navigate("/blogs");
    } catch (err) {
      alert("Failed to create blog");
      console.error(err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/blog/?user_only=true",
        {
          withCredentials: true, // ✅ cookies sent to fetch only user's blogs
        }
      );
      console.log("Blogs fetched", res.data);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs", err);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/categories/");
        setCategoryList(res.data);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    if (user) {
      fetchBlogs();
      fetchCategories();
    }
  }, [user]);

  return (
    <div className="p-4">
      {action !== "new" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {blogs.map((blog, ind) => (
              <BlogCard
                key={ind}
                title={blog.title}
                category={blog.categories}
                author={blog.author_name || ""}
                date={format(new Date(blog.created_at), "dd MMM yyyy")}
                image={
                  blog.images && blog.images.length > 0 ? blog.images[0] : null
                }
                onClick={() => {
                  navigate(`/blog/${blog.id}`);
                }}
                onEdit={() => navigate(`/account/myblogs/edit/${blog.id}`)} // 👈 EDIT route
              />
            ))}
          </div>

          <div className="text-center pb-8">
            <Link
              to={"/account/myblogs/new"}
              className="bg-black text-white py-2 px-6 rounded-full inline-flex gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add New Blog
            </Link>
          </div>
        </>
      ) : (
        <form className="max-w-3xl mx-auto" onSubmit={handleSubmit}>
          <h2 className="text-2xl mt-4">Blog Title</h2>
          <input
            type="text"
            placeholder="A journey through Spiti Valley"
            className="w-full border my-1 py-2 px-3 rounded-2xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <h2 className="text-2xl mt-4">Categories</h2>
          <div className="flex flex-wrap gap-2 my-2">
            {categoryList.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded-full cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={cat.id}
                  checked={selectedCategories.includes(cat.id)}
                  onChange={(e) => {
                    const id = parseInt(e.target.value);
                    if (e.target.checked) {
                      setSelectedCategories((prev) => [...prev, id]);
                    } else {
                      setSelectedCategories((prev) =>
                        prev.filter((c) => c !== id)
                      );
                    }
                  }}
                />
                {cat.name}
              </label>
            ))}
          </div>

          <h2 className="text-2xl mt-4">Photos</h2>
          <input
            type="file"
            multiple
            onChange={handleUploadPhotos}
            className="mt-2 mb-4"
          />
          <div className="grid grid-cols-3 gap-2">
            {photos.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt="Uploaded"
                className="h-32 w-full object-cover rounded-2xl"
              />
            ))}
          </div>

          <h2 className="text-2xl mt-4">Blog Content</h2>
          <textarea
            rows={8}
            className="w-full border my-1 py-2 px-3 rounded-2xl"
            placeholder="Write your experience here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Button
            className="mt-6 bg-black text-white py-2 px-6 rounded-full"
            label="Publish Blog"
            onClick={handleSubmit}
          />
        </form>
      )}
    </div>
  );
};

export default MyBlogs;
