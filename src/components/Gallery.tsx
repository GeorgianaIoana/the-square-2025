import React, { useState } from "react";

const Gallery: React.FC = () => {
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);

  const galleryImages = [
    "/images/gallery/square-room.jpg",
    "/images/gallery/take-a-sit.jpg",
    "/images/gallery/kids.jpg",
    "/images/gallery/happy-people.jpg",
    "/images/gallery/chess-camp-calin.jpg",
    "/images/gallery/chess-camp-vlad.jpg",
    "/images/banner/2.jpg",
    "/images/banner/3.jpg",
    "/images/gallery/simple-chess.jpg",
    "/images/gallery/vlad-prize.jpg",
  ];

  return (
    <section className="py-20 px-4 border-[#233d36] border-t-[1px] font-archivo">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#badad5] text-center mb-12">
          Galerie
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setCurrentGalleryImage(index)}
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {currentGalleryImage !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setCurrentGalleryImage(null)}
          >
            <div className="relative max-w-4xl w-full">
              <img
                src={galleryImages[currentGalleryImage]}
                alt={`Gallery image ${currentGalleryImage + 1}`}
                className="w-full h-auto rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl"
                onClick={() => setCurrentGalleryImage(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-6 space-x-2">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentGalleryImage(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentGalleryImage === index
                  ? "bg-[#233d36]"
                  : "bg-[#a6b6e0]/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
