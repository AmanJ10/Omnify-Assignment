import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import AccountPage from "./pages/AccountPage";
import Navbar from "./components/Navbar"; // import your Navbar
import EditBlogPage from "./pages/EditBlogPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/:subpage?" element={<AccountPage />} />
        <Route path="/account/:subpage/:action" element={<AccountPage />} />
        <Route path="/account/myblogs/edit/:id" element={<EditBlogPage />} />

        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/myblogs/:id" element={<BlogPage />} />
      </Routes>
    </>
  );
}

export default App;
