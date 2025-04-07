import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import BlogFilterBar from "./BlogFilterBar";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/blog/");
        console.log(response.data);
        setBlogs(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch blogs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // 🔁 Filter blogs based on selected category
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((post) =>
          post.categories?.some((cat) => cat.category_name === selectedCategory)
        );

  // ⏱ Sort blogs based on date
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    return sortOrder === "Newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-gray-800">Latest Blogs</h2>

      <BlogFilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {loading ? (
        <p className="text-center mt-4">Loading blogs...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-4">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {sortedBlogs.length > 0 ? (
            sortedBlogs.map((blog, ind) => (
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
              />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No blogs found.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default BlogSection;
