import React from "react";

const Benefits: React.FC = () => {
  return (
    <section className="py-20 px-4 border-[#233d36] border-t-[1px] font-archivo">
      <div className="w-full relative bg-[#001a00]" id="about">
        <img
          src="/public/images/banner/TheLight.png"
          className="hidden sm:block absolute left-[30px] top-[80px] max-w-[190px] z-[-1]"
        />
        <img
          src="/public/images/banner/RightLight.png"
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

        <div className="sm:container mx-auto">
          <div className="grid grid-cols-12 gap-4 px-4 sm:px-0 mt-[46px] sm:mt-[75px]">
            <div className="col-span-12 lg:col-span-8 flex flex-col items-start relative ml-[12px]">
              <div>
                <div className="absolute rounded-full border-[1.5px] lg:border-3 border-[#D3B77B] z-[-1] h-[43px] w-[43px] sm:h-[123px] sm:w-[123px] absolute top-[-11px] sm:top-[25px] left-[-19px] sm:left-[-59px]"></div>
                <h4 className="font-archivo text-center text-[#a6b6e0] text-[24px] font-[400] sm:tracking-[0.1em] sm:text-[52px] leading-[26.38px] sm:leading-[57px] mb-[20px] sm:mb-[40px]">
                  Beneficiile Șahului
                </h4>
                <p className="font-archivo sm:text-[15px] text-[#a6b6e0] text-left font-[500] sm:px-0 tracking-[0.1em] leading-[15.12px] sm:leading-[17.64px] leading-[1.2] font-[400] mt-[13px] sm:mt-[24px] mb-[20px] sm:mb-[10px] text-[12px] sm:text-[14px] max-w-[289px] sm:max-w-[595px]">
                  <p className="sm:text-[16px] font-archivo tracking-[0.1em] leading-[125%]">
                    1. Concentrare și prezență! Fiecare partidă de șah este o
                    oportunitate de a cultiva răbdarea.{" "}
                  </p>
                  <p className="sm:text-[16px] font-archivo tracking-[0.1em] leading-[125%]">
                    2. Gândire strategică! Îți dezvolți capacitatea de a
                    anticipa mutări și a lua decizii strategice atât pe tabla de
                    șah, cât și în viață.
                  </p>
                  <p className="sm:text-[16px] font-archivo tracking-[0.1em] leading-[125%]">
                    {" "}
                    3. Evoluezi continuu, în ritmul tău La THE SQUARE ne
                    ghidează bucuria. Apreciem fiecare pas către progres. Crești
                    cu răbdare, poți să te bucuri de proces și să îți cultivi
                    încrederea în forțele proprii.{" "}
                  </p>
                  <p className="sm:text-[16px] font-archivo tracking-[0.1em] leading-[125%]">
                    4. Faci parte dintr-o comunitate prietenoasă, cu valori
                    comune La THE SQUARE, jucători începători și avansați se
                    întâlnesc, se provoacă, se susțin. Fie că vii pentru
                    socializare, învățare sau competiție, lumea THE SQUARE îți
                    este deschisă.
                  </p>
                </p>

                <button
                  onClick={() => {
                    const element = document.getElementById("contact");
                    if (element) {
                      const headerOffset = 80;
                      const elementPosition =
                        element.getBoundingClientRect().top;
                      const offsetPosition =
                        elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="sm:mt-[40px] sm:ml-[150px] text-center bg-[#badad5] text-[#233d36] sm:ml-[0px] px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base tracking-wide transition-all duration-300 hover:bg-[#a6b6e0] hover:text-[#233d36]"
                >
                  Înscrie-te la primul tău curs!
                </button>
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

export default Benefits;
