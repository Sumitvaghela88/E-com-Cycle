import React from "react";
import bikeImage from "../assets/Main1.jpg";
import bikeImage2 from "../assets/Main2.jpg";
import drivetrainImage from "../assets/Main3.png"; 
import sensorImage from "../assets/main4.png";

const ProductDetailsSection = () => {
  return (
    <section className="bg-white px-6 md:px-20 py-16 space-y-16 md:space-y-28">
      {/* ====== Section 1: Why you'll love it ====== */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Why you'll love it
        </h2>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-0">
          {/* Left: text */}
          <div className="max-w-md space-y-6 md:space-y-8">
            <p className="text-gray-700 font-medium leading-relaxed text-base md:text-lg">
              No matter why you ride, FX makes for a great companion. It's a
              lightweight, fast fitness bike, and neighborhood cruiser all in
              one.
            </p>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              Whether you're commuting to work or exploring trails, FX gives you
              the confidence to ride anywhere with comfort and style.
            </p>
          </div>

          {/* Right: image */}
          <div className="w-full lg:w-auto flex justify-center">
            <img
              src={bikeImage}
              alt="Bicycle in tunnel"
              className="h-auto w-full max-w-full lg:h-[374px] lg:w-[674px] object-cover shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* ====== Section 2: The tech you get ====== */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-12 md:mb-28">
          The tech you get
        </h2>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
          {/* Left: text */}
          <div className="max-w-md space-y-5 order-2 lg:order-1 lg:ml-auto">
            <h3 className="text-lg md:text-xl font-bold">Alpha Aluminum</h3>
            <p className="text-gray-700 text-sm">
              A lightweight 200 Series Alpha Aluminum frame, a carbon fork that
              absorbs road vibration, and hydraulic disc brakes for all-weather
              stopping power. The amazing innovations of Alpha Aluminum have
              produced bikes that stand up against the highest performing road
              machines made of composite materials.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Trek's engineers have shown that aluminum may never be obsolete,
              but that a willingness to experiment can lead to amazing results.
              Feel the difference of our most advanced aluminum ever today.
            </p>
            <a
              href="#"
              className="inline-block text-sm font-medium text-gray-900 underline hover:text-gray-600 transition"
            >
              Learn more
            </a>
          </div>

          {/* Right: image + caption */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-start">
            <div className="w-full max-w-xl">
              <img
                src={bikeImage2}
                alt="Alpha Aluminum Bike"
                className="w-full h-auto lg:w-[400px] lg:h-[374px] object-cover shadow"
              />
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center lg:text-right w-full">
              <span className="font-semibold text-gray-700">Frame</span> <br />
              200 Series Alpha Aluminum
            </p>
          </div>
        </div>
      </div>

{/* ====== Section 3: Ride with the road ====== */}
<div className="space-y-12 md:space-y-16">
  {/* Top Row */}
  <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-8 lg:gap-10">
    {/* Left: Drivetrain Image */}
    <div className="flex justify-start">
      <img
        src={drivetrainImage}
        alt="Drivetrain close-up"
        className="w-full h-auto lg:h-[374px] lg:w-[674px] object-cover"
      />
    </div>

    {/* Right: Heading */}
    <div className="flex justify-end items-start text-right ">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug uppercase max-w-md">
        Ride with the <br /> road, not <br /> against it
      </h2>
    </div>
  </div>

      

  {/* Bottom Row */}
  <div className="flex flex-col lg:flex-row justify-end items-start gap-10 lg:gap-16 mt-8">
    {/* Left: Sensor Image + Caption */}
    <div className="flex flex-col justify-start lg:items-start">
      <img
        src={sensorImage}
        alt="DuoTrap sensor"
        className="w-full max-w-[250px] h-[274px] object-cover shadow-md"
      />
      <p className="text-sm text-gray-600 mt-3 text-left">
        <span className="font-semibold text-gray-800">DuoTrap</span>
        <br />
        Integrated wireless sensor
      </p>
    </div>

    {/* Right: Text Content (narrower width) */}
    <div className="max-w-lg text-left space-y-5 md:space-y-6">
      <h3 className="text-lg md:text-xl font-semibold text-gray-900">
        Shimano Tiagra 4700
      </h3>
      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
        A 20-speed Shimano Tiagra drivetrain with a wide range of gears for
        hilly routes, fast-rolling Bontrager R1 tires, IsoZone ergonomic
        grips, and compatibility with DuoTrap S so you can track your fitness
        gains.
      </p>
      <p className="text-gray-900 leading-relaxed text-sm md:text-base">
        The new Shimano Tiagra 4700 looks much more like its bigger brothers —
        Shimano Dura-Ace, Shimano Ultegra, and Shimano 105 — and its
        performance is much more on par with them too.
      </p>
    </div>
  </div>
</div>

    </section>
  );
};

export default ProductDetailsSection;