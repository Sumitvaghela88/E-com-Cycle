import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-[#EEEEEE] min-h-screen px-4 md:px-16 py-12">
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-10">

        {/* Left: Text content */}
        <div className="text-center md:text-left max-w-md mx-auto md:mx-0">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trek Fx Sport
          </h1>
          <p className="text-gray-600  text-base md:text-lg leading-relaxed">
            FX Sport 4 is where performance fitness bikes begin. Faster
            recreational rides without sacrificing the versatility that has made
            FX Trek's best-selling lineup ever.
          </p>
        </div>

        {/* Center: Product image */}
        <div className="flex justify-center">
          <img
            src="src/assets/Herobyc.png"
            alt="Trek Fx Sport"
            className="w-full max-w-[750px] h-auto object-contain"
          />
        </div>

        {/* Right: Price + Button */}
        <div className="flex flex-col items-center md:items-end space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">$800</h2>
          <button className="border border-black px-8 py-3 text-sm font-semibold hover:bg-black hover:text-white transition-all">
            ADD TO CART
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
