import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Parentheses,
  Trophy,
  Star,
  Book,
  Pen,
  Luggage,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const getServices = (t: (key: string) => string) => [
  {
    title: t('services.adults.title'),
    price: t('services.adults.price'),
    icon: <Book />,
    features: [
      t('services.adults.feature1'),
      t('services.adults.feature2'),
      t('services.adults.feature3'),
      t('services.adults.feature4'),
    ],
  },
  {
    title: t('services.kids.title'),
    price: t('services.kids.price'),
    icon: <Pen />,
    features: [
      t('services.kids.feature1'),
      t('services.kids.feature2'),
      t('services.kids.feature3'),
      t('services.kids.feature4'),
    ],
  },
  {
    title: t('services.tournament.title'),
    price: t('services.tournament.price'),
    icon: <Trophy />,
    features: [
      t('services.tournament.feature1'),
      t('services.tournament.feature2'),
      t('services.tournament.feature3'),
      t('services.tournament.feature4'),
    ],
  },
  {
    title: t('services.camp.title'),
    price: t('services.camp.price'),
    icon: <Luggage />,
    features: [
      t('services.camp.feature1'),
      t('services.camp.feature2'),
      t('services.camp.feature3'),
      t('services.camp.feature4'),
      t('services.camp.feature5'),
    ],
  },
  {
    title: t('services.individualKids.title'),
    price: t('services.individualKids.price'),
    icon: <Pen />,
    features: [
      t('services.individualKids.feature1'),
      t('services.individualKids.feature2'),
      t('services.individualKids.feature3'),
      t('services.individualKids.feature4'),
    ],
  },
  {
    title: t('services.individualAdults.title'),
    price: t('services.individualAdults.price'),
    icon: <Book />,
    features: [
      t('services.individualAdults.feature1'),
      t('services.individualAdults.feature2'),
      t('services.individualAdults.feature3'),
      t('services.individualAdults.feature4'),
    ],
  },
];

const STORAGE_KEY = "services-show-all";
const OPENED_AT_KEY = "services-opened-at";

export default function ServicesSection() {
  const { t } = useLanguage();
  const services = getServices(t);
  const [showAll, setShowAll] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      const openedAt = sessionStorage.getItem(OPENED_AT_KEY);
      if (stored === "true" && openedAt) {
        const timeSinceOpened = Date.now() - parseInt(openedAt, 10);
        const MIN_OPEN_DURATION_MS = 5 * 60 * 1000;
        if (timeSinceOpened < MIN_OPEN_DURATION_MS) {
          return true;
        }
      }
    }
    return false;
  });
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isTogglingRef = useRef(false);
  const showAllRef = useRef(false);
  const openedAtRef = useRef<number | null>(null);
  const MIN_OPEN_DURATION_MS = 5 * 60 * 1000;

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    updateIsMobile();
    const handleResize = () => {
      updateIsMobile();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    showAllRef.current = showAll;
    if (showAll) {
      const now = Date.now();
      openedAtRef.current = now;
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STORAGE_KEY, "true");
        sessionStorage.setItem(OPENED_AT_KEY, now.toString());
      }
    } else {
      openedAtRef.current = null;
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(OPENED_AT_KEY);
      }
    }
  }, [showAll]);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    
    if (isTogglingRef.current) return;
    
    const currentShowAll = showAllRef.current;
    
    if (currentShowAll) {
      const storedOpenedAt = typeof window !== "undefined" 
        ? sessionStorage.getItem(OPENED_AT_KEY) 
        : null;
      const openedAt = openedAtRef.current 
        ? openedAtRef.current 
        : (storedOpenedAt ? parseInt(storedOpenedAt, 10) : null);
      
      if (openedAt) {
        const timeSinceOpened = Date.now() - openedAt;
        
        if (timeSinceOpened < MIN_OPEN_DURATION_MS) {
          return;
        }
      }
    }
    
    const newShowAll = !currentShowAll;
    
    isTogglingRef.current = true;
    showAllRef.current = newShowAll;
    setShowAll(newShowAll);
    
    if (!newShowAll && sectionRef.current) {
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
        isTogglingRef.current = false;
      }, 300);
    } else {
      setTimeout(() => {
        isTogglingRef.current = false;
      }, 200);
    }
  };

  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const updateIsTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 640 && width < 1024); // sm to lg
    };
    updateIsTablet();
    window.addEventListener("resize", updateIsTablet);
    return () => window.removeEventListener("resize", updateIsTablet);
  }, []);

  const displayedServices = showAll
    ? services
    : isMobile
    ? services.slice(0, 1)
    : isTablet
    ? services.slice(0, 2)
    : services.slice(0, 3);

  return (
    <section
      className="py-24 sm:py-20 bg-[#001a00] border-t border-[#233d36] overflow-hidden sm:overflow-visible font-archivo"
      id="services"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <h2 className="font-archivo tracking-[0.1em] text-3xl font-bold text-center mb-16 text-[#badad5]">
          {t('services.title')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-10 justify-items-center">
          {displayedServices.map((service, index) => (
            <div
              key={index}
              className="font-archivo tracking-[0.1em] bg-[#badad5] w-full max-w-[400px] rounded-lg p-6 sm:p-8 shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-[#a6b6e0]"
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 text-[#233d36] mr-3">
                  {React.cloneElement(service.icon, {
                    className: "w-full h-full text-[#233d36]",
                  })}
                </div>
                <h3 className="font-serif tracking-[0.05em] text-2xl sm:text-3xl text-[#233d36]">
                  {service.title}
                </h3>
              </div>
              <p className="font-serif tracking-[0.05em] text-2xl sm:text-3xl text-[#233d36] mb-6">
                {service.price}
              </p>
              <ul className="font-archivo tracking-[0.1em] space-y-3 mb-6 text-sm sm:text-base text-[#233d36]">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center font-archivo">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#233d36] flex-shrink-0" />
                    <span className="font-archivo">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className="font-archivo tracking-[0.1em] w-full bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg active:scale-95"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {t('services.enroll')}
              </button>
            </div>
          ))}
        </div>

        {services.length > (isMobile ? 1 : isTablet ? 2 : 3) && (
          <div className="text-center mt-8 sm:mt-10">
            <button
              onClick={handleToggle}
              className="font-archivo tracking-[0.1em] inline-flex items-center bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm shadow-lg active:scale-95"
            >
              {showAll ? (
                <>
                  {t('team.back')} <ChevronUp className="ml-2 w-5 h-5" />
                </>
              ) : (
                <>
                  {t('services.more')} <ChevronDown className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
