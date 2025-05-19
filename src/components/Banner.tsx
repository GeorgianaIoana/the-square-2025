import React, { useState, useEffect } from "react";

interface BannerProps {
  scrollToSection: (section: string) => void;
}

const Banner: React.FC<BannerProps> = ({ scrollToSection }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    {
      url: "/images/banner/theSquare.jpg",
      title: "Antrenează-te cu profesioniști",
      subtitle: "Professional chess instruction for all levels",
    },
    {
      url: "/images/banner/1.jpg",
      title: "Depășește-ți limitele",
      subtitle: "Train with experienced grandmasters",
    },
    {
      url: "/images/banner/2.jpg",
      title: "Mutările inspirate încep la clubul THE SQUARE",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sm:container mx-auto relative flex items-center justify-center overflow-hidden font-archivo">
      <div className="w-full pt-10 sm:pt-0 sm:pb-16 pb-8 px-4 sm:px-0">
        <div className="relative h-[500px] sm:h-[638px] rounded-[24px] overflow-hidden shadow-xl">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? "opacity-100 z-20" : "opacity-0 z-10"
              }`}
            >
              <img
                src={image.url}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover brightness-50 rounded-[24px]"
              />

              {currentSlide === index && (
                <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-8 z-30 animate-fade-in-up">
                  <div className="max-w-3xl">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-wide text-[#a6b6e0] leading-snug">
                      {image.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl mb-6 tracking-wide text-[#a6b6e0]">
                      {image.subtitle}
                    </p>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="bg-[#badad5] text-[#233d36] px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base tracking-wide transition-all duration-300 hover:bg-[#a6b6e0] hover:text-[#233d36]"
                    >
                      Join Our Chess Club
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Banner;
