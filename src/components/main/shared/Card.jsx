import React from "react";

const Card = ({ item }) => {
  console.log(item);
  return (
    <>
      <div className="max-w-xs w-full bg-white rounded-lg shadow-md overflow-hidden">
        {/* Product Image */}
        <img
          className="w-full h-56 object-cover"
          src={item.imageUrl}
          alt="Product"
        />

        {/* Product Info */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg mb-4 font-semibold text-[#123E5D]">
            {item.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm mb-6 text-gray-600">
           {item.description}
          </p>

          {/* Learn More Button */}
          <div className="text-center">
            <button className="button cursor-pointer">Book a Call</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
