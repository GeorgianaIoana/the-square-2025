import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

const teamMembers = [
  {
    name: "Vlad Ghiță",
    title: "CHESS TRAINER",
    description: `Cu o carieră dedicată în totalitate șahului, Andrei Popescu este un instructor pasionat, cu peste un deceniu de experiență atât în competiții, cât și în activitatea de mentorat. Fost jucător de performanță, multiplu premiat la turnee naționale și internaționale, Andrei a ales să se concentreze pe formarea noilor generații de șahiști, având convingerea că șahul este mai mult decât un joc – este un instrument valoros pentru dezvoltarea personală și intelectuală.

Metoda sa de predare se bazează pe o combinație echilibrată între teorie solidă, practică intensă și încurajarea gândirii strategice. Fiecare lecție este gândită astfel încât să fie adaptată nivelului elevului – de la începători care abia învață mutările.`,
    image: "images/team/vlad.jpg",
  },
  {
    name: "Georgiana Stanciu",
    title: "CO-FOUNDER & CHESS TRAINER",
    description: `Georgiana este o persoană caldă și foarte dedicată lecțiilor ei. Are o experiență de peste 28 ani, cu participare la competițiile naționale și internaționale. Este multiplă campioană națională la categoria ei de vârstă. De aseemenea, cele mai importante rezultate internaționale ale sale suntȘ locul 9 la Campionatul European de șah din Muntenegru 2009, locul 4 la Campionatele Mondiale școlare din Thailanda 2015 și locul 8 la Campionatul Mondial de șah din Rusia 2016. Elo-ul ei de vârf fide avut este 2054, iar categoria WNM (maestră națională).`,
    image: "images/team/georgiana.jpg",
  },
  {
    name: "Cristiana Stanciu",
    title: "CO-FOUNDER & CHESS TRAINER",
    description: `Cristiana are experiență de șah și competiții de peste 9 ani, elo fide 1650 și categoria I. Pe lângă șah, are studii pedagogice și experiență de lucru cu copiii în club de șah, grădinițe, școlii și centre educaționale. Este pasionată de educație și dezvoltarea personală a copiilor, iar șahul este un instrument excelent pentru a-i ajuta să-și dezvolte abilitățile cognitive și sociale. Cristiana îmbină cunoștințele sale pedagogice cu pasiunea pentru șah, oferind lecții interactive și captivante care îi ajută pe elevi să învețe și să se dezvolte. Abordarea sa este adaptată nevoilor fiecărui elev, iar atmosfera pe care o creează în timpul lecțiilor este una prietenoasă și motivantă. Cristiana își propune să inspire și să încurajeze fiecare elev să-și atingă potențialul maxim prin intermediul șahului. Cristiana știe să facă lucrurile complexe din șah să pară mai simple și evidente. Este îndrăgită de copii și vine mereu cu idei interactive pentru a face experiența lecțiilor de șah mai plăcută.`,
    image: "images/team/cris-chess.jpg",
  },
  {
    name: "Călin Gheorghiu",
    title: "CHESS TRAINER",
    description: `Călin este Maestru FIDE de la vârsta de 16 ani, cu cel mai înalt rating fide de 2384 elo, iar pe chess.com 2757 elo. A fost multiplu campion național și a reprezentat România la campionatele mondiale de juniori din India. Are o carieră in IT, și este și instructor de șah cu 5 ani experiență. Vă asiguram că orele cu ell u vor fi doar plnde de idei și inspirație, ci memorabile. Călin este și stand up comedian, iar cursurile cu el te vor captiva din plin.`,
    image: "images/team/calin.jpg",
  },
  {
    name: "David Kim",
    title: "Mentor",
    description: `Guiding students one move at a time.`,
    image: "https://randomuser.me/api/portraits/men/48.jpg",
  },
];

const Team: React.FC = () => {
  return (
    <section
      className="py-20  border-[#233d36] border-t-[1px] font-archivo bg-[#001a00]"
      id="team"
    >
      <div className="mx-4 sm:container sm:mx-auto">
        {/* Slider cu Membri */}
        <div className="relative">
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            centeredSlides={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
            modules={[Navigation]}
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col lg:flex-row items-center text-center lg:text-left">
                  {/* Imagine membru în stânga */}
                  <div className="lg:w-1/2 flex justify-center lg:justify-start mb-6 lg:mb-0 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-[340px] h-[370px] sm:w-[380px] sm:h-[400px] lg:w-[495px] lg:h-[469px] rounded-[20px] object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001a00]/50  to-[#858585]/0 rounded-[17px] opacity-[0.8]"></div>

                  {/* Textul membrului în dreapta */}
                  <div className="lg:w-1/2 max-w-3xl mx-auto lg:pl-16 sm:ml-[360px]">
                    <p className="text-xs sm:text-sm uppercase tracking-wider text-[#a6b6e0] mb-2">
                      {member.title}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#a6b6e0] tracking-wide">
                      {member.name}
                    </h2>
                    <p className="text-[#a6b6e0] mb-4 leading-relaxed text-sm sm:text-base">
                      {member.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 z-10 flex gap-6">
            <div className="swiper-button-prev text-[#a6b6e0] hover:text-[#badad5] transition">
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="swiper-button-next text-[#a6b6e0] hover:text-[#badad5] transition">
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
