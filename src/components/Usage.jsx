import React from "react";
import { Link } from "react-router-dom";

const Usage = () => {
  return (
    <div className="pt-20 bg-gradient-to-b from-black to-gray-800 min-h-screen text-white">
      <div className="container mx-auto px-8 py-12">
        <h1 className="text-5xl font-extrabold mb-6 text-center">
          How to Use Weather Buddy 🌦️
        </h1>
        <div className="text-center mb-8">
          <p className="text-lg mb-4">
            Weather Buddy is your all-in-one solution for accurate, real-time
            weather updates and forecasts. Stay prepared for any weather
            conditions with these simple steps!
          </p>
          <p className="text-lg italic">
            "Your weather companion for love, friendship, and memorable
            moments."
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Follow These Steps:</h2>
          <ol className="list-decimal list-inside text-lg space-y-6">
            <li>
              <strong className="text-yellow-400">Search for Your Location:</strong>{" "}
              Use the search bar at the top of the app to enter your city or
              location. Weather Buddy will instantly fetch weather details
              tailored to your area.
            </li>
            <li>
              <strong className="text-blue-400">View Current Weather:</strong>{" "}
              Instantly access key metrics like temperature, humidity, wind
              speed, and conditions (e.g., cloudy, sunny).
            </li>
            <li>
              <strong className="text-green-400">Check the Weekly Forecast:</strong>{" "}
              Stay ahead with a detailed daily forecast, including temperature
              trends, precipitation chances, and sunrise/sunset times.
            </li>
            <li>
              <strong className="text-purple-400">Interactive Animations:</strong>{" "}
              Engage with realistic animations such as falling rain, snowfall,
              or sunshine that align with live weather conditions.
            </li>
            <li>
              <strong className="text-pink-400">Dark Mode:</strong> Toggle between
              light and dark modes for a visually comfortable experience,
              whether it's day or night.
            </li>
            <li>
              <strong className="text-red-400">Weather Alerts:</strong> Receive
              instant notifications about severe weather, so you're always
              prepared for emergencies.
            </li>
          </ol>
        </div>
        <div className="mt-8 bg-gray-700 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Why Choose Weather Buddy?</h2>
          <p className="text-lg mb-4">
            Weather Buddy isn't just a weather app—it's a tool designed with
            love and care for everyone who values precise weather updates while
            enjoying a unique and friendly interface.
          </p>
          <ul className="list-disc list-inside text-lg space-y-4">
            <li>
              **Love-Inspired Themes**: Plan romantic evenings under the stars
              with confidence.
            </li>
            <li>
              **Adventure-Ready**: Check for clear skies before hiking, beach
              trips, or outdoor fun.
            </li>
            <li>
              **Stay Connected**: Weather Buddy keeps you informed while
              ensuring your plans go smoothly.
            </li>
          </ul>
        </div>
        <div className="text-center mt-12">
          <p className="text-xl font-semibold mb-4">
            Start your journey with Weather Buddy and never be caught off guard
            by the weather!
          </p>
          <Link to="/WeatherBuddy"
            className="px-6 py-3 bg-blue-500 rounded-lg shadow-md text-white font-bold text-lg hover:bg-blue-600 transition"
          >
            Explore Now 🌈
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Usage;
