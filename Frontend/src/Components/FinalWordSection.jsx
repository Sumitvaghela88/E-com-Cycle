import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FW1 from '../assets/Thefw1.jpg';
import FW2 from '../assets/Thefw2.jpg';


const FinalWordSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      number: "01",
      tag: "FX05",
      image: FW1,
      title:
        "This bike inspires you to ride farther, faster, and demolish the fitness goals you've set for yourself.",
    },
    {
      id: 2,
      number: "02",
      tag: "FX06",
      image: FW2,
      title:
        "Road bike speed and hybrid bike versatility in one performance package.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className=" px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-10 text-gray-900 tracking-tight">
            The Final Word
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed transition-all duration-500 ease-in-out">
            {slides[currentSlide].title}
          </p>
        </div>

        {/* Image Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="w-full flex-shrink-0 relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px]"
                >
                  {/* Image with overlay gradient */}
                  <div className="relative w-full h-full group">
                    <img
                      src={slide.image}
                      alt={`Bike scene ${slide.number}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient Overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

                    {/* Overlay Number (Outline Effect) */}
                    <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-6 sm:left-8 md:left-10">
                      <div className="flex items-end gap-1 sm:gap-2">
                        <span
                          className="text-transparent text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight"
                          style={{
                            WebkitTextStroke: "2px white",
                            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                          }}
                        >
                          {slide.number}
                        </span>
                        <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-3 md:mb-4 font-medium opacity-90 drop-shadow-lg">
                          /{slide.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-gray-900'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-end gap-3 md:gap-4 mt-6 md:mt-8">
            <button
              onClick={prevSlide}
              className="group p-2 md:p-3 bg-white hover:bg-gray-900 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-900"
              aria-label="Previous slide"
            >
              <ChevronLeft 
                size={18} 
                className="text-gray-900 group-hover:text-white transition-colors duration-300" 
              />
            </button>
            <button
              onClick={nextSlide}
              className="group p-2 md:p-3 bg-white hover:bg-gray-900 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-900"
              aria-label="Next slide"
            >
              <ChevronRight 
                size={18} 
                className="text-gray-900 group-hover:text-white transition-colors duration-300" 
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalWordSection;