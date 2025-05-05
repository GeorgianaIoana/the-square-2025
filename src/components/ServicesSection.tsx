import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Parentheses,
  Trophy,
  Star,
  Book,
  Pen,
  Luggage
} from "lucide-react";
import React from "react";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Grupă adulți",
    price: "380 lei/lună",
    icon: <Book />,
    features: [
      "4 sesiuni săptămânale",
      "6 ore de curs",
      "teme și verificare exerciții",
    ],
  },
  {
    title: "Grupă copii",
    price: "260 lei/lună",
    icon: <Pen />,
    features: [
      "4 sesiuni săptămânale",
      "4 ore de curs",
      "teme și verificare exerciții",
    ],
  },
  {
    title: "Seara de șah",
    price: "60lei",
    icon: <Trophy />,
    features: [
      "Private 1-on-1 sessions",
      "Grandmaster coaching",
      "Competition training",
      "Video analysis",
    ],
  },
  {
    title: "Tabără de șah",
    icon: <Luggage />,
    features: [
      "Full-day chess immersion",
      "Fun & educational activities",
      "Team tournaments",
      "Free merchandise",
    ],
  },
  {
    title: "Curs individual copii",
    price: "de la 90 lei",
    icon: <Pen />,
    features: [
      "Zoom classes",
      "Online resources",
      "Interactive quizzes",
      "Progress tracking",
    ],
  },
  {
    title: "Curs individual adulți",
    price: "de la 120 lei",
    icon: <Book />,
    features: [
      "Top-level FIDE trainers",
      "Preparation for championships",
      "Weekly progress reports",
      "Mental coaching",
    ],
  },
];

export default function ServicesSection() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const handleToggle = () => {
    if (showAll && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setShowAll(!showAll);
  };

  const displayedServices = showAll
    ? services
    : isMobile
    ? services.slice(0, 1)
    : services.slice(0, 3);

  return (
    <section
      className="py-20 bg-[#001a00] border-t border-[#233d36]"
      id="services"
    >
      <div ref={sectionRef} className="sm:container mx-auto px-4">
        <h2 className="font-archivo tracking-[0.1em] text-3xl font-bold text-center mb-16 text-[#badad5]">
          Abonamente și servicii
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
          {displayedServices.map((service, index) => (
            <div
              key={index}
              className="font-archivo tracking-[0.1em] bg-[#badad5] w-full max-w-[400px] rounded-lg p-8 shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-[#a6b6e0]"
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 text-[#233d36] mr-3">
                  {React.cloneElement(service.icon, {
                    className: "font-archivo tracking-[0.1em] w-full h-full text-[#233d36]",
                  })}
                </div>
                <h3 className="font-archivo tracking-[0.1em] text-2xl font-semibold text-[#233d36]">
                  {service.title}
                </h3>
              </div>
              <p className="font-archivo tracking-[0.1em] text-3xl font-bold text-[#233d36] mb-6">
                {service.price}
              </p>
              <ul className="font-archivo tracking-[0.1em] space-y-3 mb-6 text-base text-[#233d36]">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-[#233d36]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="font-archivo tracking-[0.1em] w-full bg-[#233d36] text-white py-3 rounded-lg font-semibold hover:bg-[#a6b6e0] hover:text-[#233d36] transition">
                Înscrie-te acum!
              </button> 
            </div>
          ))}
        </div>

        {services.length > 3 && (
          <div className="text-center mt-10">
            <button
              onClick={handleToggle}
              className="font-archivo tracking-[0.1em] inline-flex items-center bg-[#233d36] text-white px-6 py-3 rounded-full hover:bg-[#a6b6e0] hover:text-[#233d36] transition text-sm font-medium"
            >
              {showAll ? (
                <>
                   Inapoi <ChevronUp className="font-archivo tracking-[0.1em] ml-2 w-5 h-5" />
                </>
              ) : (
                <>
                  Mai mult <ChevronDown className="font-archivo tracking-[0.1em] ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
