import React from "react";

const Banner = () => {
  return (
    <div
      className="relative w-full h-[60vh] sm:h-[50vh] md:h-[60vh] lg:h-[75vh] flex items-center text-white px-4"
      style={{
        backgroundImage: "url('/images/banner.jpg')", // Corrected path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-opacity-50"
        style={{
          background:
            "linear-gradient(to left,rgba(80, 115, 160, 0.1), rgba(80, 115, 160, 0.2),rgba(80, 115, 160, 0.5), rgba(71, 135, 237, 0.7),rgba(29, 112, 245, 0.7),rgba(29, 112, 245, 0.9))",
        }}
      ></div>

      {/* Text Content */}
      <div className="relative width z-10 max-w-3xl px-2 sm:px-6">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight sm:leading-snug">
          Seamless Banking, Anytime, Anywhere
        </h1>
        <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed sm:leading-normal">
          Experience secure and convenient mobile banking at your fingertips. 
          Manage your finances, transfer funds, and pay bills effortlessly—
          whenever you need, wherever you are.
        </p>
      </div>
    </div>
  );
};

export default Banner;
