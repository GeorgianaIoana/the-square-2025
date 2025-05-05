import React, { useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";

const testimonials = [
  {
    quote:
      "The structured approach to learning chess here has dramatically improved my game. The instructors are patient and knowledgeable.",
    name: "David Chen",
    title: "Student - 6 months",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
  },
  {
    quote:
      "My daughter has grown so much in confidence since joining. The youth program is excellent and well-structured.",
    name: "Emily Parker",
    title: "Parent",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
  },
  {
    quote:
      "The advanced course helped me achieve my first FIDE rating. The personalized coaching made all the difference.",
    name: "Alex Thompson",
    title: "Tournament Player",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Amazing coaching and mentorship. Helped me grow both on and off the board.",
    name: "Sophia Lee",
    title: "Club Member",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "The team is so dedicated. Best chess school I've experienced.",
    name: "Liam Johnson",
    title: "Student",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
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
                className="bg-[#badad5] w-full max-w-[380px] h-[350px] p-8 rounded-lg shadow-lg mx-auto flex flex-col justify-between hover:scale-105 transition-transform duration-300 transform transition-all duration-300 hover:bg-[#a6b6e0]"
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
                  <p className="text-sm text-gray-700">{testimonial.title}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
