import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from "../components/Button";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/blog/${id}/`, {
          withCredentials: true,
        });
        const blog = res.data;
        console.log(blog.categories);
        setTitle(blog.title);
        setContent(blog.content);
        setPhotos(blog.images || []);
        setSelectedCategories(blog.categories.map((cat) => cat.category));
      } catch (err) {
        console.error("Failed to fetch blog", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${backendURL}/categories/`);
        setCategoryList(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchBlog();
    fetchCategories();
  }, [backendURL, id]);

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
      await axios.put(
        `${backendURL}/api/blog/${id}/`,
        {
          title,
          content,
          images: photos,
          categories: selectedCategories,
        },
        {
          withCredentials: true,
        }
      );
      alert("Blog updated!");
      navigate("/account/myblogs");
    } catch (err) {
      alert("Failed to update blog");
      console.error(err);
    }
  };

  return (
    <form className="max-w-3xl mx-auto p-4 mt-20" onSubmit={handleSubmit}>
      <h2 className="text-2xl mt-4">Edit Blog Title</h2>
      <input
        type="text"
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
                  setSelectedCategories((prev) => prev.filter((c) => c !== id));
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
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button
        className="mt-6 bg-black text-white py-2 px-6 rounded-full"
        label="Update Blog"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default EditBlogPage;
