import React from "react";
import Marquee from "react-fast-marquee";

const Marquees = () => {
  let images = [
    "marquee1",
    "marquee2",
    "marquee3",
    "marquee4",
    "marquee5",
    "marquee6",
  ];

  // console.log(images)

  return (
    <>
      <p className="text-3xl text-center mt-20 mb-10 font-semibold sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-[#0A294A]">
        Trusted by 25,000+ world-class brands <br /> and organizations of all
        sizes
      </p>

      <Marquee>
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center px-4 md:px-8 lg:px-12"
            >
              <img
                src={`/images/${image}.png`}
                alt={`Marquee image ${index + 1}`}
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          );
        })}
      </Marquee>
    </>
  );
};

export default Marquees;
