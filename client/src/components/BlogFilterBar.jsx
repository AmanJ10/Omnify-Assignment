import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";

const sortingOptions = ["Newest", "Oldest"];

const BlogFilterBar = ({
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
}) => {
  const [categories, setCategories] = useState(["All"]);
  const [error, setError] = useState("");
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  console.log("Backend URL:", backendURL);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendURL}/categories/`);
        setCategories(["All", ...response.data.map((cat) => cat.name)]);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, [backendURL]);

  return (
    <div className="flex flex-wrap justify-between items-center py-4">
      <div className="flex gap-4 flex-wrap">
        {categories.map((category, ind) => (
          <Button
            key={ind}
            label={category}
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }
          />
        ))}
      </div>

      <div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          {sortingOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default BlogFilterBar;
