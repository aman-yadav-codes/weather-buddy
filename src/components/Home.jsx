import React, { useState, useEffect, useRef } from "react";
import gifIcons from "../assets/GifIcons";
import { Link } from "react-router-dom";
import gsap from "gsap"; // Import GSAP

const Home = () => {
  const gifKeys = Object.keys(gifIcons); // Get all keys from the gifIcons object
  const [currentIcon, setCurrentIcon] = useState(gifIcons[gifKeys[0]]); // Initialize with the first icon
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index
  const imageRef = useRef(null); // Create a reference to the image element

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % gifKeys.length); // Increment index safely
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [gifKeys.length]);

  useEffect(() => {
    setCurrentIcon(gifIcons[gifKeys[currentIndex]]); // Update the current icon based on the index
  }, [currentIndex, gifKeys, gifIcons]);

  useEffect(() => {
    // GSAP animation to bring the image from top to center and then move it down
    gsap.fromTo(
      imageRef.current,
      { y: -450, opacity: 0 }, // Start position (above screen and transparent)
      {
        y: 0, // End position (center)
        opacity: 1, // Fully visible
        duration: 1.5, // Slightly slower for a smoother feel
        ease: "power4.out", // Smoother easing for a more fluid motion
        onComplete: () => {
          // After reaching the center, move it downwards
          gsap.to(imageRef.current, {
            y: 450, // Move downwards smoothly
            duration: 1.5, // Extend the duration for a smoother descent
            ease: "power4.inOut", // Smooth ease-in and ease-out for downward motion
          });
        },
      }
    );
  }, [currentIcon]); // Trigger animation every time the currentIcon changes

  return (
    <section
      id="home"
      className="min-h-screen grid place-items-center dark:bg-black dark:text-white pt-24 relative"
    >
      <div className="flex flex-wrap-reverse md:flex-nowrap items-center justify-center gap-6 px-4 md:p-6 w-full">
        {/* Left Section */}
        <div className="text-center md:text-left p-6 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to WeatherBuddy 🌤️
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Stay updated with real-time weather data at your fingertips.
          </p>
          <Link
            to="/WeatherBuddy"
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xl transition-transform duration-200"
          >
            Get Started
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex justify-center items-center rounded-full bg-white p-2 w-full max-w-sm md:max-w-md mx-auto md:mx-0 overflow-hidden relative transform hover:scale-105 transition-transform duration-300 z-0">
          <div className="absolute inset-0 rounded-full"></div>
          <img
            id="weather-image"
            ref={imageRef} // Set the ref to image element
            src={currentIcon} // Dynamically updates with gifIcons
            alt="Weather Icon"
            className="w-full rounded-full h-auto shadow-lg relative z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
