import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaRegFileAlt, FaTools, FaRocket } from "react-icons/fa"; // Icons for graphics

function Slider() {
  const slides = [
    {
      id: 1,
      title: "Build Professional Resumes",
      description: "Tailor high-quality resumes for your dream job.",
      bgColor: "bg-gradient-to-r from-green-400 via-green-600 to-green-400",
      icon: <FaRegFileAlt className="text-6xl mb-4 text-white/90" />,
      link: "/build-resume",
    },
    {
      id: 2,
      title: "Modern & Customizable Templates",
      description: "Select sleek, modern templates to stand out.",
      bgColor: "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600",
      icon: <FaTools className="text-6xl mb-4 text-white/90" />,
      link: "/templates",
    },
    {
      id: 3,
      title: "Land Opportunities Faster",
      description: "Create resumes that make an impact and land interviews.",
      bgColor: "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600",
      icon: <FaRocket className="text-6xl mb-4 text-white/90" />,
      link: "/get-started",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slide transition every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const safeIndex = (index) => (index + slides.length) % slides.length;

  // Make sure the slides loop in a circular order
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => safeIndex(prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => safeIndex(prevIndex - 1));
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-2xl">
      {/* Slider Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full flex items-center justify-center h-[400px] ${slide.bgColor} relative`}
          >
            {/* Glassmorphism Effect */}
            <div className="absolute inset-0 w-full h-full bg-white/10 backdrop-blur-lg rounded-lg flex flex-col justify-center items-center p-4 text-white border border-white/20">
              {slide.icon}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-wide text-center">
                {slide.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-center px-6 sm:px-16 font-light mb-6">
                {slide.description}
              </p>
              {/* NavLink Button */}
              <NavLink
                to={slide.link}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
              >
                Explore
              </NavLink>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl bg-black/40 backdrop-blur-md p-3 rounded-full hover:bg-black/70 transition duration-300"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl bg-black/40 backdrop-blur-md p-3 rounded-full hover:bg-black/70 transition duration-300"
      >
        &#10095;
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex
                ? "bg-green-400 scale-125"
                : "bg-white/40 hover:bg-green-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
