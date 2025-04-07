import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h2 className="text-xl font-bold">
              <div className="flex items-center text-2xl font-bold space-x-2">
                <span>Travel</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-6 h-6 text-blue-500"
                >
                  <path
                    fill="#f5f5f5"
                    d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144L0 368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144l-16 0 0 96 16 0c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48l0-224z"
                  />
                </svg>
                <span>log</span>
              </div>
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Our mission is to provide a platform for travelers to share their
              experiences, tips, and stories. We believe that every journey is
              unique and deserves to be documented.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              ©2025 Travel Blog. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">About</h3>
            <ul className="mt-2 space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="mt-2 space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Get Updates</h3>
            <div className="mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 text-black rounded-md"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-2 p-2 rounded-md">
                Subscribe
              </button>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Privacy & Terms */}
        <div className="mt-6 text-center text-gray-500 text-xs">
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>{" "}
          |
          <a href="#" className="hover:text-white ml-2">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
