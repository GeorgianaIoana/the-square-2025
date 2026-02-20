import React, { useEffect, useRef } from "react";
import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import { useLanguage } from "../contexts/LanguageContext";

const testimonials = {
  ro: [
    {
      quote:
        "Locul potrivit dacă ești în căutarea unei comunități faine în care să îți exersezi și să îți îmbunătățești abilitățile de șah. Vei avea ocazia să înveți de la profesori profesioniști și amabili, cu multă experiență.",
      name: "Cătălin Manolache",
      role: "Cursant",
    },
    {
      quote:
        "Am avut o experiență grozavă în timpul turneelor de șah, deoarece mi-au amintit de cele dintr-un alt oraș, la care obișnuiam să particip, și îmi doream de mult timp ceva similar și în București. Pe lângă turnee, THE SQUARE oferă cursuri cu metode variate de predare, iar acest lucru se simte ca o gură de aer proaspăt pe piața cursurilor.",
      name: "Bogdan Teslărașu",
      role: "Cursant",
    },
    {
      quote:
        "Am doar un singur mod de a descrie acest loc – este cel mai bun! Sunt din Londra și am petrecut o săptămână în București în octombrie 2024. Cursurile au fost grozave. Totul s-a desfășurat în engleză (cu explicații în română când era nevoie, astfel încât nimeni să nu fie exclus). Sper din suflet să am ocazia să revin cât mai curând!",
      name: "Jenny",
      role: "Vizitator Internațional",
    },
    {
      quote:
        "The Square este un loc cu mult farmec, în care simți că timpul are un alt ritm. Cu fiecare vizită și partidă de șah, simți că mintea ia o pauză de la stres și gânduri cotidiene, intră într-o stare de focus și creativitate, iar la final revine mai energizată și mai curată decât înainte. Recomand clubul pentru orice vârstă. Este un loc cosy, intim, cu o echipă de oameni faini și profesioniști.",
      name: "Andrei Gîndac",
      role: "Cursant",
    },
    {
      quote:
        "Un mediu extraordinar pentru copii. Profesioniști, răbdători, predarea se face pe înțelesul fiecăruia. Locația este excelentă, pe o străduță liniștită din centru.",
      name: "Diana Chiriacescu",
      role: "Părinte",
    },
  ],
  en: [
    {
      quote:
        "The perfect place if you're looking for a great community to practice and improve your chess skills. You'll have the opportunity to learn from professional and kind instructors with extensive experience.",
      name: "Cătălin Manolache",
      role: "Student",
    },
    {
      quote:
        "I had a great experience during the chess tournaments, as they reminded me of those from another city I used to attend, and I had been wanting something similar in Bucharest for a long time. Besides tournaments, THE SQUARE offers courses with varied teaching methods, and this feels like a breath of fresh air in the course market.",
      name: "Bogdan Teslărașu",
      role: "Student",
    },
    {
      quote:
        "I only have one way to describe this place – it's the best! I'm from London and spent a week in Bucharest in October 2024. The courses were great. Everything was conducted in English (with Romanian explanations when needed, so no one was excluded). I sincerely hope to have the chance to return soon!",
      name: "Jenny",
      role: "International Guest",
    },
    {
      quote:
        "The Square is a place with great charm, where you feel time has a different rhythm. With each visit and chess game, you feel your mind takes a break from stress and daily thoughts, enters a state of focus and creativity, and returns more energized and clearer than before. I recommend the club for any age. It's a cozy, intimate place with a team of great and professional people.",
      name: "Andrei Gîndac",
      role: "Student",
    },
    {
      quote:
        "An extraordinary environment for children. Professional, patient, teaching is done in a way everyone can understand. The location is excellent, on a quiet little street in the center.",
      name: "Diana Chiriacescu",
      role: "Parent",
    },
  ],
};

const StarRating = () => (
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-[#233d36] text-[#233d36]" />
    ))}
  </div>
);

const Avatar = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#233d36] to-[#001a00] flex items-center justify-center text-[#badad5] font-bold text-lg shadow-lg">
      {initials}
    </div>
  );
};

export default function Testimonials() {
  const { t, language } = useLanguage();
  const swiperRef = useRef<any>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const currentTestimonials = testimonials[language] || testimonials.ro;

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
      className="py-24 px-4 bg-[#001a00] border-[#233d36] border-t-[1px] cursor-pointer relative overflow-hidden"
      ref={sectionRef}
      onClick={handleActivateCarousel}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#233d36]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#badad5]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="sm:container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#badad5]/60 text-sm font-archivo tracking-[0.3em] uppercase mb-4 block">
            {t('testimonials.subtitle')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#badad5] font-archivo mb-4">
            {t('testimonials.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#badad5] to-[#a6b6e0] mx-auto rounded-full" />
        </motion.div>

        <Swiper
          ref={swiperRef}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="pb-4"
        >
          {currentTestimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="group relative bg-gradient-to-br from-[#badad5] to-[#a6b6e0] w-full max-w-[400px] min-h-[380px] p-8 rounded-2xl shadow-xl mx-auto flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-[#badad5]/20 hover:-translate-y-2"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* Quote icon background */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-20 h-20 text-[#233d36]" />
                </div>

                {/* Stars */}
                <StarRating />

                {/* Quote */}
                <p className="text-[#233d36] text-base leading-relaxed mb-8 flex-grow relative z-10 font-medium">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[#233d36]/20">
                  <Avatar name={testimonial.name} />
                  <div>
                    <h4 className="font-bold text-[#233d36] text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-[#233d36]/70 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#233d36]/5 rounded-tr-full" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
