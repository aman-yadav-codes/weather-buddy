import React, { useEffect, useState } from "react";

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // Create an array of snowflakes
    const createSnowflakes = () => {
      const flakes = [];
      for (let i = 0; i < 50; i++) {
        flakes.push({
          id: i,
          left: Math.random() * 100, // Random horizontal position
          animationDuration: Math.random() * 10 + 5, // Random fall speed (2s to 5s)
          size: Math.random() * 5 + 5, // Random size (5px to 10px)
        });
      }
      setSnowflakes(flakes);
    };

    createSnowflakes();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white opacity-75"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
          }}
        />
      ))}
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-100px);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh);
              opacity: 0.5;
            }
          }

          .absolute div {
            animation: fall linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Snowfall;
