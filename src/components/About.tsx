import React from "react";

const About: React.FC = () => {
  return (
    <section className="py-20 px-4 border-[#233d36] border-t-[1px] font-archivo">
      <div className="w-full relative bg-[#001a00]" id="about">
        <img
          src="/images/banner/TheLight.png"
          className="hidden sm:block absolute opacity-50 sm:opacity-100 left-0 top-[44%] sm:top-[80px] max-w-[190px] z-[-1]"
        />
        <img
          src="/images/banner/RightLight.png"
          className="hidden sm:block absolute opacity-100 sm:opacity-100 sm:right-[0px] bottom-[0%] sm:top-[140px] max-w-[190px] z-[-1]"
        />

        <img
          src="images/landingpage/hourly-booking/Vector 12.png"
          className="sm:hidden absolute opacity-50 sm:opacity-100 left-0 top-[44%] sm:top-[80px] max-w-[190px] z-[-1]"
        />
        <img
          src="images/landingpage/hourly-booking/Vector 17 (1).png"
          className="sm:hidden absolute opacity-100 sm:opacity-100 sm:right-[0px] bottom-[0%] sm:top-[140px] max-w-[190px] z-[-1]"
        />

        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-[#badad5] mb-8">
                  Despre Noi
                </h2>
                <p className="text-[#a6b6e0] text-lg mb-6">
                  La THE SQUARE, credem că șahul este mai mult decât un joc -
                  este o artă, o știință și o modalitate de a dezvolta gândirea
                  strategică. Clubul nostru oferă un mediu prietenos și
                  profesional unde jucătorii de toate nivelurile pot învăța,
                  practica și să se dezvolte.
                </p>
                <p className="text-[#a6b6e0] text-lg mb-6">
                  Cu instructori experimentați și un program structurat, ne
                  concentrăm pe dezvoltarea abilităților individuale și pe
                  crearea unei comunități puternice de pasionați de șah.
                </p>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 relative mb-[66px] sm:mb-[95px] rounded-[20px] mx-auto inline-block">
              <div className="relative w-full h-full shadow-[-10px_11px_35px_rgba(0,0,0,0.25)] rounded-[20px]">
                <img
                  src="/public/images/banner/theSquare.jpg"
                  className="w-[322px] h-[338px] sm:w-[495px] sm:h-[469px] rounded-[20px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001a00]/80 to-[#858585]/0 rounded-[17px] opacity-[0.8]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
