import React from "react";

const HeroText = () => {
  return (
    <div className="absolute inset-0 bg-[#d7f0fbca] flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 z-10">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-7xl gradient-text plusJakarta font-black mb-3 sm:mb-4">
        Bank Smarter with Secure and <br className="hidden md:block" /> Convenient Mobile Banking
      </h1>

      {/* Description */}
      <p className="text-xs sm:text-sm md:text-base text-black plusJakarta font-medium max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:text-lg">
        In today’s fast-paced world, managing your finances on the go is easier than ever. With our mobile banking app, access your accounts, track transactions, and transfer funds securely anytime, anywhere.
      </p>

      {/* Button */}
      <button className="btn mt-5 sm:mt-6 mb-4 sm:mb-6 uppercase inter py-2 px-4 sm:py-3 sm:px-5 md:py-4 md:px-6 tracking-wider rounded-lg text-white font-semibold border-none bg-[#0A2748] hover:bg-[#226782] text-xs sm:text-sm md:text-base lg:py-6 lg:mb-8">
        Send Money Instantly &#8594;
      </button>

      {/* Ratings Section */}
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6">
        <div className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[150px] xl:w-[180px]">
          <img src="/images/rating_1.png" alt="Rating 1" />
        </div>
        <div className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[150px] xl:w-[180px]">
          <img src="/images/rating_2.png" alt="Rating 2" />
        </div>
        <div className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[150px] xl:w-[180px]">
          <img src="/images/rating_3.png" alt="Rating 3" />
        </div>
      </div>
    </div>
  );
};

export default HeroText;
