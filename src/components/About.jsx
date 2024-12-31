import React from "react";
import weatherIcons from "../assets/WeatherIcons";

const About = () => {
  return (
    <section className="min-h-screen grid place-items-center pt-24 bg-white dark:bg-black bg-gradient-to-r dark:from-black dark:via-slate-950 dark:to-black text-black">
      <div className="flex flex-col items-center justify-center w-full p-6 gap-8">
        <h1 className="text-4xl md:text-5xl dark:text-white font-extrabold mb-8 text-center">
          Welcome to Weather Buddy 🌤️
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Weather Planning Section */}
          <div className="p-6 h-90 bg-gradient-to-b from-purple-400 to-purple-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-4">
              <img
                  src={weatherIcons.cloudyhaze}
                alt="Weather Planning"
                className="w-20 h-20"
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">
              Weather Planning
            </h2>
            <p className="text-center text-sm mb-4">
              Plan your day, week, or trip with accurate weather forecasts to
              avoid surprises and stay prepared.
            </p>
            <h3 className="text-lg font-semibold text-center">Key Benefits:</h3>
            <ul className="list-disc list-inside text-center text-sm">
              <li>Detailed Hourly Forecasts</li>
              <li>Weekly Weather Trends</li>
              <li>Location-Specific Predictions</li>
            </ul>
          </div>

          {/* Weather Alerts Section */}
          <div className="p-6 h-90 bg-gradient-to-b from-orange-400 to-orange-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-4">
              <img
                src={weatherIcons.thunderstormsrain}
                alt="Weather Alerts"
                className="w-20 h-20"
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">
              Weather Alerts
            </h2>
            <p className="text-center text-sm mb-4">
              Stay ahead of extreme weather conditions with real-time alerts and
              safety recommendations.
            </p>
            <h3 className="text-lg font-semibold text-center">Features Include:</h3>
            <ul className="list-disc list-inside text-center text-sm">
              <li>Storm Warnings</li>
              <li>Rain & Snow Alerts</li>
              <li>Temperature Extremes Notifications</li>
            </ul>
          </div>

          {/* Travel Forecasts Section */}
          <div className="p-6 h-90 bg-gradient-to-b from-teal-400 to-teal-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-4">
              <img
                  src={weatherIcons.compass}
                alt="Travel Forecasts"
                className="w-20 h-20"
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">
            Weather Insights
            </h2>
            <p className="text-center text-sm mb-4">
            Gain insights into current and historical weather patterns to better understand your environment.
            </p>
            <h3 className="text-lg font-semibold text-center">Why Choose Us:</h3>
            <ul className="list-disc list-inside text-center text-sm">
              <li>Climate Trends</li>
              <li>Interactive Weather Maps</li>
              <li>Global Weather Updates</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
