import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bgImage from "../assets/travel-bg-image.jpg";
import BlogSection from "../components/BlogSection";

const HomePage = () => {
  return (
    <>
      <Navbar />

      <div
        className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold">
            Exploring the Wonders of World
          </h1>
          <p className="mt-2 text-lg md:text-xl">
            Join us on a journey to discover breathtaking landscapes, vibrant
            cultures, and unforgettable experiences.
          </p>
        </div>
      </div>

      <div className="px-8 py-12">
        <h2 className="text-2xl font-bold">Blog</h2>
        <p className="text-gray-500">
          Here, we share travel tips, destination guides, and stories that
          inspire your next adventure.
        </p>
        <BlogSection />
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
