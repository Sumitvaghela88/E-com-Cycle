import React from "react";

import Img1 from "../assets/pro1.jpg";
import Img2 from "../assets/pro2.jpg";
import Img3 from "../assets/pro3.jpg";
import Img4 from "../assets/pro4.jpg";

const products = [
  {
    id: 1,
    category: "SPORT",
    name: "Burton Yeasayer",
    price: "$380",
    image: Img1,
  },
  {
    id: 2,
    category: "SPORT",
    name: "Pennyboard 27”",
    price: "$105",
    image: Img2,
  },
  {
    id: 3,
    category: "SPORT",
    name: "Supercaliber 9 AXS",
    price: "$995",
    image: Img3,
  },
  {
    id: 4,
    category: "SPORT",
    name: "Boxing gloves",
    price: "$250",
    image: Img4,
  },
];

const YouMayAlsoLike = () => {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-14 md:py-16 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 sm:mb-10 gap-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center sm:text-left">
          You may also like
        </h2>
        <a
          href="#"
          className="text-sm text-gray-500 hover:text-gray-800 font-medium transition text-center sm:text-right"
        >
          View all
        </a>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8 md:gap-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Image */}
            <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Text Section */}
            <div className="mt-3 sm:mt-4 space-y-1">
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">
                {product.category}
              </p>

              {/* Name and Price */}
              <div className="flex justify-between items-center">
                <p className="text-sm sm:text-base font-medium text-gray-900">
                  {product.name}
                </p>
                <p className="text-sm sm:text-base font-semibold text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default YouMayAlsoLike;
