import React from "react";
import D1 from "../assets/D1.png";
import D2 from "../assets/D2.png";
import D3 from "../assets/D3.png";
import D4 from "../assets/D4.png";

const technicalData = [
  {
    title: "Seatpost",
    subtitle: "Montrose Elite",
    image: D1,
    specs: "330x27.2mm",
    description:
      "CnO-shape profile increases torsional stiffness and vertical compliance. Designed to offer increased compliance at maximum and minimum insertion points. 100% OCLV Carbon fiber shaft and head.",
  },
  {
    title: "Pedal",
    subtitle: "Bontrager Line Pro",
    image: D2,
    specs: "9/16”",
    description:
      "Flat pedals are the preferred choice of downhillers, dirt jumpers, and enduro riders, but any trail rider can reap the benefits of a pedal born from the demands of those elite riders.",
  },
  {
    title: "Tire",
    subtitle: "Hard-Case Lite R1",
    image: D3,
    specs: "700x32c",
    description:
      "The R1 road tire is the perfect replacement tire for your road bike or urban commuter. It’s a great balance of performance and value, with 60TPI casing and Hard-Case Lite puncture protection that keeps weight down and durability up.",
  },
  {
    title: "Handlebar",
    subtitle: "Satellite Plus IsoZone",
    image: D4,
    specs: "600x15mm",
    description:
      "The inForm Satellite Plus IsoZone system is the comprehensive defense against wrist discomfort. These bar and grip combinations absorb road vibrations and reduce impact for a smoother, more enjoyable ride.",
  },
];

const TechnicalDetails = () => {
  return (
    <section className="bg-white text-gray-900 px-6 md:px-20 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-12 text-left">
        Technical Details
      </h2>

      <div className="space-y-20">
        {technicalData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[1fr_250px_1fr] items-center gap-8 md:gap-16"
          >
            {/* Left text */}
            <div className="text-right md:pr-6 space-y-2">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-lg font-medium text-gray-900">
                {item.subtitle}
              </p>
            </div>

            {/* Center image + specs under it */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-[200px] h-[150px] flex items-center justify-center bg-gray-50 rounded-xl shadow-sm">
                <img
                  src={item.image}
                  alt={item.subtitle}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm font-semibold ml-8 text-gray-900 self-start">
                  {item.specs}
              </p>
            </div>

            {/* Right description */}
            <div className="space-y-3 text-left md:pl-6">
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnicalDetails;
