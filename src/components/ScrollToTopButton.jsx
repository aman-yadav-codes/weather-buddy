import React, { useState, useEffect } from "react";
import { CiLocationArrow1 } from "react-icons/ci";

const ScrollToTopButton = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Function to handle scroll
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    showScrollToTop && (
      <button
        onClick={scrollToTop}
        className="fixed w-12 h-12 flex justify-center items-center bottom-2 right-2 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
      >
        <CiLocationArrow1 className="text-2xl font-extrabold" style={{rotate:"-45deg"}}/>
      </button>
    )
  );
};

export default ScrollToTopButton;
