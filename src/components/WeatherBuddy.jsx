import React, { useEffect, useState } from "react";
import axios from "axios";
import { weatherIcons } from "../assets/WeatherIcons";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WeatherBuddy = () => {
  const [data, setdata] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [query, setquery] = useState("");
  const [isloading, setisloading] = useState(true);
  const [showskeleton, setshowskeleton] = useState(false);

  const getWeatherDetails = async () => {
    setshowskeleton(true);
    if (!query) {
      toast.error("Please Enter Place in Serch Box.");
      setisloading(true);
      setshowskeleton(false);
      return;
    }
    try {
      const api_key = "658f501ef3c9a9b358a743f605521cf7";
      const city = query;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=35&units=metric&appid=${api_key}`
      );

      const groupedData = response.data.list.reduce((acc, item) => {
        const date = item.dt_txt.split(" ")[0]; // Extract the date part
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
      }, {});

      const formattedData = Object.entries(groupedData).map(
        ([date, values]) => {
          const averageTemp =
            values.reduce((sum, val) => sum + val.main.temp, 0) / values.length;

          // Extracting the required data for each day
          const windSpeed = values[0].wind.speed; // Wind speed for the first entry of each date
          const windDeg = values[0].wind.deg; // Wind direction
          const humidity = values[0].main.humidity; // Humidity
          const tempMax = Math.max(...values.map((val) => val.main.temp_max)); // Max temperature
          const tempMin = Math.min(...values.map((val) => val.main.temp_min)); // Min temperature
          const icon = values[0].weather[0].icon; // Weather icon
          const description = values[0].weather[0].description; // Weather description
          const weatherMain = values[0].weather[0].main; // Main weather condition (e.g., Clear, Cloudy)
          const pressure = values[0].main.pressure; // Main weather condition (e.g., Clear, Cloudy)
          const feelslike = values[0].main.feels_like; // Main weather condition (e.g., Clear, Cloudy)
          const visibility = values[0].visibility; // Main weather condition (e.g., Clear, Cloudy)
          const pod = values[0].sys.pod; // Main weather condition (e.g., Clear, Cloudy)

          return {
            date,
            temp: Math.round(averageTemp), // Average temperature for the day
            windSpeed,
            windDeg,
            humidity,
            tempMax,
            tempMin,
            icon,
            description,
            weatherMain,
            pressure,
            feelslike,
            visibility,
            pod,
          };
        }
      );

      if (formattedData) {
        let searchcitydata = {
          cityname: response.data.city.name,
          citytimezone: response.data.city.timezone,
          citycountry: response.data.city.country,
          citypopulation: response.data.city.population,
          citytemp: formattedData[0].temp,
          citywindspeed: formattedData[0].windSpeed,
          citydescription: formattedData[0].description,
          cityweathericon: formattedData[0].icon,
          cityweathermain: formattedData[0].weatherMain,
          cityhumidity: formattedData[0].humidity,
          citypressure: formattedData[0].pressure,
          citysunrise: response.data.city.sunrise,
          citysunset: response.data.city.sunset,
          cityvisibility: formattedData[0].visibility,
          citypod: formattedData[0].pod,
          cityfeelslike: formattedData[0].feelslike,
          citywinddeg: formattedData[0].windDeg,
        };

        setdata(searchcitydata);
        setisloading(false);
      }

      setForecast(formattedData);
      setshowskeleton(false);
    } catch (error) {
      if (error.response.data.cod == 404) {
        toast.error(error.response.data.message);
        return;
      }
      console.error("Error fetching weather data:", error);
    }
  };

  function getFormattedDate() {
    const now = new Date();

    // Use toLocaleString for professional formatting
    const formattedDate = now.toLocaleString("en-US", {
      weekday: "long", // Full weekday name (e.g., "Monday")
      hour: "2-digit", // Two-digit hour
      minute: "2-digit", // Two-digit minute
      hour12: true, // 12-hour format with AM/PM
    });

    return formattedDate;
  }

  const getWindDirection = (degree) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(degree / 22.5) % 16;
    return directions[index];
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Pad minutes with leading zero
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  useEffect(() => {
    console.log(forecast);
    console.log(data);
  }, [forecast]);

  // Get today's date and the next 5 days
  const today = new Date();
  const nextFiveDays = Array.from({ length: 6 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() + i); // Increment the date
    return day.toISOString().split("T")[0]; // Get date in YYYY-MM-DD format
  });

  // Filter forecast data for the next 5 days
  const weekForecast = forecast.filter((item) =>
    nextFiveDays.includes(item.date)
  );

  const getCurrentTime = () => {
    const timezoneOffset = data.citytimezone / 3600;
    return printGMTWithAddedHours(timezoneOffset);
  };

  useEffect(() => {
    // Set initial time
    setCurrentTime(getCurrentTime());

    // Update time every second
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  function printGMTWithAddedHours(hoursToAdd) {
    const now = new Date();

    // Add the specified number of hours to the current time
    now.setUTCHours(now.getUTCHours() + hoursToAdd);

    const hours24 = now.getUTCHours();
    const minutes = String(now.getUTCMinutes()).padStart(2, "0");
    const seconds = String(now.getUTCSeconds()).padStart(2, "0");
    const day = String(now.getUTCDate()).padStart(2, "0");
    const month = String(now.getUTCMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = now.getUTCFullYear();

    // Convert 24-hour time to 12-hour time and determine AM/PM
    const hours12 = hours24 % 12 || 12; // Convert 0 to 12 (midnight case)
    const amPm = hours24 >= 12 ? "PM" : "AM";

    // Format the time in GMT with AM/PM
    const time = `${hours12}:${minutes}:${seconds} ${amPm}`;
    const date = ` UTC on ${month}-${day}-${year}`;

    return (
      <>
        <p>{time}</p>
        <p>{date}</p>
      </>
    );
  }

  // Days of the week for display
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen max-w-8xl pt-16 bg-black text-white font-sans">
      {/* Container */}
      <div className="container mx-auto py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-4">
          {/* Left Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              {/* Search Bar */}
              <div className="w-full flex gap-3 mb-6 relative">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      getWeatherDetails(); // Call the search function on Enter key press
                    }
                  }}
                  onChange={(e) => {
                    setquery(e.target.value);
                  }}
                  type="text"
                  placeholder="Search for places..."
                  className="w-full px-4 py-2 bg-gray-700  text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                />
                <button
                  onClick={getWeatherDetails}
                  className="bg-blue-500 h-10 flex justify-center items-center rotate-[45deg] aspect-square text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                  aria-label="Search"
                >
                  <CiLocationArrow1 className="text-2xl" />
                </button>
              </div>

              {/* Weather Icon */}
              {isloading ? (
                <div className="relative">
                  <div className="text-center bg-gray-800 p-6 rounded-lg shadow-lg w-full">
                    <p className="text-lg text-gray-400 font-semibold">
                      Please search for a city above to see the weather details.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center bg-gray-700 hover:bg-gray-600 mt-3 p-6 rounded-xl shadow-lg w-full max-w-sm mx-auto">
                  {/* Dynamically load the weather icon */}
                  <div className="flex justify-center items-center">
                    <img
                      className="w-60 h-60"
                      src={weatherIcons[data.cityweathericon]}
                      alt={data.citydescription}
                    />
                  </div>
                  {/* Temperature and Details */}
                  <div className="text-center bg-gray-700  p-4 rounded-lg shadow-lg mx-auto">
                    <h1 className="text-4xl font-extrabold text-blue-400 my-2">
                      {data.citytemp}°C
                    </h1>
                    <p className="text-gray-400 text-xs italic">
                      {getFormattedDate()}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-300 mt-1">
                        <span className="font-medium text-gray-400 mr-2">
                          Feels Like: {data.cityfeelslike}°C
                        </span>
                        <span>{data.citydescription}</span>
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-300 font-medium flex items-center justify-center">
                        <span className="text-base mx-1">
                          <FaLocationDot />
                        </span>
                        {`${data.cityname}, ${data.citycountry}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isloading ? null : (
                <div className="text-center hover:bg-gray-600 bg-gray-700 mt-3 p-6 rounded-xl shadow-lg w-full max-w-sm mx-auto">
                  <p className="text-sm text-gray-400 font-medium mb-2 flex justify-center items-center">
                    <span>Current Time in</span>
                    <span className="font-bold text-gray-300 ml-2">
                      {data.cityname}
                    </span>
                  </p>
                  <p className="text-2xl font-extrabold text-blue-400 my-2">
                    {printGMTWithAddedHours(data.citytimezone / 3600)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-2">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              {/* Tabs */}
              <div className="flex justify-between items-center border-b pb-4 mb-4 border-gray-700">
                <h4 className="text-2xl font-medium border-b-2 border-blue-400">
                  Forecast of next 5 Days
                </h4>
                <button className="px-4 py-2 bg-blue-600 text-white text-xs text-nowrap rounded-full">
                  Metric °C
                </button>
              </div>

              <div className="overflow-x-auto md:overflow-visible mb-6">
                {isloading ? (
                  <div className="w-full pb-5 flex gap-4 min-w-max justify-start">
                    <div className="flex bg-gray-700 hover:bg-gray-600 px-4 py-6 md:rounded-lg rounded-b-full rounded-t-full flex-col items-center space-y-2 w-full">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center">
                        <span className="text-7xl text-gray-400">N/A</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid pb-5 grid-cols-6 md:grid-cols-3 lg:grid-cols-5 gap-4 min-w-max md:min-w-full">
                    {weekForecast.map((forecastItem, index) => {
                      const date = new Date(forecastItem.date);
                      const dayName = daysOfWeek[date.getDay()];
                      return (
                        <div
                          key={forecastItem.date}
                          className="flex bg-gray-700 hover:bg-gray-600 px-4 py-6 md:rounded-lg rounded-b-full rounded-t-full flex-col items-center space-y-2"
                        >
                          <p className="text-gray-300">{dayName}</p>
                          <div className="w-20 h-20 rounded-full flex items-center justify-center">
                            <img
                              src={weatherIcons[forecastItem.icon]}
                              alt=""
                              className="bg-gray-600 rounded-full"
                            />
                          </div>
                          <p className="text-gray-300">
                            {forecastItem.tempMin.toFixed(0)}°C -{" "}
                            {forecastItem.tempMax.toFixed(0)}°C
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              {/* Highlights */}
              <h2 className="text-2xl font-medium inline-block mb-4 border-b-2 border-blue-400">
                Today's Highlights
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Wind Status */}
                <div
                  className={` ${
                    showskeleton ? "" : "p-4 bg-gray-700"
                  } hover:bg-gray-600 rounded-lg shadow`}
                >
                  {showskeleton ? (
                    <Skeleton
                      width="100%"
                      height={80}
                      shiver={true}
                      baseColor="#424242"
                      highlightColor="#6200EE"
                      borderRadius={12}
                    />
                  ) : (
                    <>
                      <h3 className="text-gray-400">Wind Status</h3>
                      {isloading ? (
                        <p className="text-gray-400">N/A</p>
                      ) : (
                        <div>
                          <p className="text-3xl font-bold text-white">
                            {data.citywindspeed} km/h
                          </p>
                          <div className="text-gray-400 flex border-t-2 border-gray-600 pt-2 my-3 items-center justify-start space-x-2">
                            <p>{getWindDirection(data.citywinddeg)}</p>
                            <span
                              className="text-red-400 text-xl"
                              style={{
                                transform: `rotate(${data.citywinddeg}deg)`,
                              }}
                            >
                              ➤
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Sunrise */}
                <div
                  className={` ${
                    showskeleton ? "" : "p-4 bg-gray-700"
                  } hover:bg-gray-600 rounded-lg shadow`}
                >
                  {showskeleton ? (
                    <Skeleton
                      width="100%"
                      height="100%"
                      shiver={true}
                      baseColor="#424242"
                      highlightColor="#6200EE"
                      borderRadius={12}
                    />
                  ) : (
                    <>
                      <h3 className="text-gray-400 mb-2">Sunrise</h3>
                      {isloading ? (
                        <p className="text-gray-400">N/A</p>
                      ) : (
                        <p className="text-3xl font-bold text-white">
                          {formatTime(data.citysunrise)}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Sunset */}
                <div
                  className={` ${
                    showskeleton ? "" : "p-4 bg-gray-700"
                  } hover:bg-gray-600 rounded-lg shadow`}
                >
                  {showskeleton ? (
                    <Skeleton
                      width="100%"
                      height="100%"
                      shiver={true}
                      baseColor="#424242"
                      highlightColor="#6200EE"
                      borderRadius={12}
                    />
                  ) : (
                    <>
                      <h3 className="text-gray-400 mb-2">Sunset</h3>
                      {isloading ? (
                        <p className="text-gray-400">N/A</p>
                      ) : (
                        <p className="text-3xl font-bold text-white">
                          {formatTime(data.citysunset)}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Humidity */}
                <div
                  className={` ${
                    showskeleton ? "" : "p-4 bg-gray-700"
                  } hover:bg-gray-600 rounded-lg shadow`}
                >
                  {showskeleton ? (
                    <Skeleton
                      width="100%"
                      height={80}
                      shiver={true}
                      baseColor="#424242"
                      highlightColor="#6200EE"
                      borderRadius={12}
                    />
                  ) : (
                    <>
                      <h3 className="text-gray-400 mb-2">Humidity</h3>
                      {isloading ? (
                        <p className="text-gray-400">N/A</p>
                      ) : (
                        <div>
                          <p className="text-3xl font-bold text-white">
                            {data.cityhumidity}%
                          </p>
                          <div className="w-full bg-gray-600 h-4 rounded-lg mt-4 relative overflow-hidden">
                            <div
                              className={`h-full rounded-lg ${
                                data.cityhumidity < 30
                                  ? "bg-blue-500"
                                  : data.cityhumidity <= 60
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${data.cityhumidity}%` }}
                            ></div>
                          </div>
                          <p className="text-gray-400 mt-2">
                            {data.cityhumidity < 30
                              ? "Low"
                              : data.cityhumidity <= 60
                              ? "Normal"
                              : "High"}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Visibility */}
                <div
                  className={` ${
                    showskeleton ? "" : "p-4 bg-gray-700"
                  } hover:bg-gray-600 rounded-lg shadow`}
                >
                  {showskeleton ? (
                    <Skeleton
                      width="100%"
                      height="100%"
                      shiver={true}
                      baseColor="#424242"
                      highlightColor="#6200EE"
                      borderRadius={12}
                    />
                  ) : (
                    <>
                      <h3 className="text-gray-400 mb-2">Visibility</h3>
                      {isloading ? (
                        <p className="text-gray-400">N/A</p>
                      ) : (
                        <div>
                          <p className="text-3xl font-bold text-white">
                            {(data.cityvisibility / 1000).toFixed(1)} km
                          </p>
                          <p className="text-gray-400">
                            {data.cityvisibility < 2000
                              ? "Low"
                              : data.cityvisibility <= 6000
                              ? "Average"
                              : "High"}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Air Pressure */}
                <div
                  className={` ${
                    showskeleton ? "" : "p-4 bg-gray-700"
                  } hover:bg-gray-600 rounded-lg shadow`}
                >
                  {showskeleton ? (
                    <Skeleton
                      width="100%"
                      height="100%"
                      shiver={true}
                      baseColor="#424242"
                      highlightColor="#6200EE"
                      borderRadius={12}
                    />
                  ) : (
                    <>
                      <h3 className="text-gray-400 mb-2">Air Pressure</h3>
                      {isloading ? (
                        <p className="text-gray-400">N/A</p>
                      ) : (
                        <div>
                          <p className="text-3xl font-bold text-white">
                            {data.citypressure} hPa
                          </p>
                          <p className="text-gray-400">
                            {data.citypressure < 1000
                              ? "Low Pressure"
                              : data.citypressure <= 1020
                              ? "Normal Pressure"
                              : "High Pressure"}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default WeatherBuddy;
