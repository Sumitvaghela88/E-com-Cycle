import React, { useState } from 'react';
import F1 from '../assets/F1.png';
import F2 from '../assets/F2.png';
import F3 from '../assets/F3.png';
import F4 from '../assets/F4.png';

const features = [
  {
    title: "IsoZone handlebar and grips",
    description:
      "Our exclusive vibration-damping IsoZone giving you more control and an incredibly comfortable ride.",
    imgSrc: F1,
    alt: "IsoZone handlebar and grips",
  },
  {
    title: "Puncture-resistant tires",
    description:
      "Tough Bontrager Hard-Case tires help keep flats from slowing you down.",
    imgSrc: F2,
    alt: "Puncture-resistant tires",
  },
  {
    title: "Blendr stem",
    description:
      "Bontrager stem technology lets you clip your gear directly to the stem for clean looks, maximum user.",
    imgSrc: F3,
    alt: "Blendr stem",
  },
  {
    title: "Carbon Fork",
    description:
      "Lightweight fork with carbon fiber legs soaks up hand-numbing road vibration.",
    imgSrc: F4,
    alt: "Carbon Fork",
  },
];

export default function Features() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? features.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="font-bold text-lg mb-8">Features</h2>

      <div className="overflow-hidden relative w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {features.map(({ title, description, imgSrc, alt }, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-full">
              <div className="w-48 h-48 bg-black flex items-center justify-center">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={alt}
                    className="object-contain max-h-full max-w-full"
                  />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
              <h3 className="font-semibold mt-3 text-sm text-center">{title}</h3>
              <p className="mt-1 text-xs text-gray-600 text-center">{description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4 text-gray-700 cursor-pointer select-none">
        <span className="text-2xl" onClick={prev}>
          &larr;
        </span>
        <span className="text-2xl" onClick={next}>
          &rarr;
        </span>
      </div>
    </div>
  );
}
