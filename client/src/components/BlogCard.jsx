import React from "react";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const BlogCard = ({
  title,
  category,
  date,
  readTime,
  author,
  image,
  onClick,
  onEdit,
}) => {
  const location = useLocation();
  const isMyBlogsPage = location.pathname === "/account/myblogs";

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-52 object-cover" />

      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {(category ?? []).map((cat, index) => (
            <span
              key={index}
              className="text-xs font-semibold text-white bg-blue-600 px-3 py-1 rounded-full"
            >
              {cat.category_name}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-2 text-gray-900">{title}</h3>

        <div className="text-sm text-gray-500 mt-2 flex items-center">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{readTime} mins read</span>
        </div>

        <div className="flex items-center mt-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <span className="ml-2 text-sm text-gray-700">{author}</span>
          <div className="mt-4 flex justify-between">
            <Button
              onClick={onClick}
              label="View"
              className="text-blue-600 hover:underline"
            />

            {isMyBlogsPage && (
              <Button
                onClick={onEdit}
                label="Edit"
                className="text-green-600 hover:underline"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
