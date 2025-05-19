import React, { useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";

const testimonials = [
  {
    quote:
      "Locul potrivit dacă ești în căutarea unei comunități faine în care să îți exersezi și să îți îmbunătățești abilitățile de șah. Vei avea ocazia să înveți de la profesori profesioniști și amabili, cu multă experiență.",
    name: "Cătălin Manolache",
  },
  {
    quote:
      "Am avut o experiență grozavă în timpul turneelor de șah, deoarece mi-au amintit de cele dintr-un alt oraș, la care obișnuiam să particip, și îmi doream de mult timp ceva similar și în București. Pe lângă turnee, THE SQUARE oferă cursuri cu metode variate de predare, iar acest lucru se simte ca o gură de aer proaspăt pe piața cursurilor.",
    name: "Bogdan Teslărașu",
  },
  {
    quote:
      "Am doar un singur mod de a descrie acest loc – este cel mai bun! Sunt din Londra și am petrecut o săptămână în București în octombrie 2024. Cursurile au fost grozave. Totul s-a desfășurat în engleză (cu explicații în română când era nevoie, astfel încât nimeni să nu fie exclus). Sper din suflet să am ocazia să revin cât mai curând!",
    name: "Jenny",
  },
  {
    quote:
      "The Square este un loc cu mult farmec, în care simți că timpul are un alt ritm. Cu fiecare vizită și partidă de șah, simți că mintea ia o pauză de la stres și gânduri cotidiene, intră într-o stare de focus și creativitate, iar la final revine mai energizată și mai curată decât înainte.Recomand clubul pentru orice vârstă. Este un loc cosy, intim, cu o echipă de oameni faini și profesioniști.",
    name: "Andrei Gîndac",
  },
  {
    quote:
      "Un mediu extraordinar pentru copii. Profesioniști, răbdători, predarea se face pe înțelesul fiecăruia. Locația este excelentă, pe o străduță liniștită din centru.",
    name: "Diana Chiriacescu",
  },
];

export default function Testimonials() {
  const swiperRef = useRef<any>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && swiperRef.current?.autoplay) {
          swiperRef.current.autoplay.stop();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleActivateCarousel = () => {
    swiperRef.current?.autoplay?.start();
  };

  return (
    <section
      id="testimonials"
      className="py-20 px-4 bg-[#001a00] border-[#233d36] border-t-[1px] cursor-pointer"
      ref={sectionRef}
      onClick={handleActivateCarousel}
    >
      <div className="sm:container mx-auto px-4 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-16 text-[#badad5]">
          What Our Students Say
        </h2>

        <Swiper
          ref={swiperRef}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="bg-[#badad5] w-full max-w-[380px] h-[350px] px-[16px] sm:px-10 py-8 rounded-lg shadow-lg mx-auto flex flex-col justify-between hover:scale-105 transition-transform duration-300 transform transition-all duration-300 hover:bg-[#a6b6e0]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Quote className="w-6 h-6 text-[#233d36] mb-4" />
                <p className="text-[#233d36] text-base mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="mt-auto">
                  <h4 className="font-semibold text-[#233d36] text-base">
                    {testimonial.name}
                  </h4>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
