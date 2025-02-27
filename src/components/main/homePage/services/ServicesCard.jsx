import React from "react";
import { Link } from "react-router-dom";

const ServicesCard = ({ item }) => {
  return (
    <>
      <Link to={item.link} className="max-w-xs w-full text-center bg-white rounded-lg shadow-md overflow-hidden">
        {/* Product Image */}
        <img
          className="w-full h-56 object-contain"
          src={item.imageUrl}
          alt="Product"
        />

        {/* Product Info */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-xl mb-4 font-semibold text-[#123E5D]">
            {item.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm mb-6 text-gray-600">
           {item.description}
          </p>
        </div>
      </Link>
    </>
  );
};

export default ServicesCard;
