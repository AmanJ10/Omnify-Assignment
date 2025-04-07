import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageSlider from "../components/ImageSlider";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const [isImageSliderOpen, setImageSliderOpen] = useState(false);

  function handleImageClick() {
    setImageSliderOpen(true);
  }

  function handleImageSliderClose() {
    setImageSliderOpen(false);
  }
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/blog/${id}/`
        );
        setBlog(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load blog.");
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (error) {
    return <div className="text-center text-red-600 mt-6">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center mt-6">Loading blog details...</div>;
  }

  const { title, content, images, author_name } = blog;

  return (
    <div className="p-8 mt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
        {title}
      </h1>

      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <img
            src={images[0]}
            alt={images[0].title}
            onClick={handleImageClick}
            className="w-full h-96 object-cover bg-center rounded-2xl"
          />
        </div>

        <div className="flex-1 mt-4 md:mt-0 md:ml-4 grid grid-cols-2 gap-4">
          {images.slice(1).map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt="phtot"
              onClick={handleImageClick}
              className="w-full h-48 object-cover bg-center rounded-2xl"
            />
          ))}
          {images.slice(1).length < 2 && (
            <div className="w-full h-48 bg-transparent"></div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 p-4">
        Categories:
        {(blog.categories ?? []).map((cat, index) => (
          <span
            key={index}
            className="text-xs font-semibold text-white bg-blue-600 px-3 py-1 rounded-full"
          >
            {cat.category_name}
          </span>
        ))}
      </div>

      <div className="my-4 border-t border-gray-200"></div>

      <div className="mt-4 flex items-center">
        <div className="hidden md:block flex-shrink-0">
          {/* You can replace this with Avatar component */}
        </div>
        <p className="p-2 text-lg text-gray-800 leading-relaxed">
          Author: {author_name}
        </p>
      </div>

      <div className="my-4 border-t border-gray-200"></div>

      <div className="mt-8 pb-2 rounded-lg">
        <p className="text-lg text-gray-800 leading-relaxed">{content}</p>
      </div>

      {images?.length > 0 && isImageSliderOpen && (
        <ImageSlider
          images={images}
          isOpen={isImageSliderOpen}
          onClose={handleImageSliderClose}
        />
      )}
    </div>
  );
};

export default BlogPage;
