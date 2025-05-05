import React, { useState, useEffect } from "react";
import ServicesSection from "./components/ServicesSection";
import Calendar from "./components/Calendar";
import Contact from "./components/Contact";
import {
  ChevronRight,
  Clock,
  MapPin,
  Trophy,
  Users,
  Parentheses,
  Brain,
  Mail,
  Phone,
  Star,
  Quote,
  ChevronLeft,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css";
import Testimonial from "./components/Testimonial";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

const instructors = [
  { id: 1, name: "Instructor 1", description: "Descrierea instructorului 1" },
  { id: 2, name: "Instructor 2", description: "Descrierea instructorului 2" },
  { id: 3, name: "Instructor 3", description: "Descrierea instructorului 3" },
  { id: 4, name: "Instructor 4", description: "Descrierea instructorului 4" },
];

const teamMembers = [
  {
    name: "Vlad Ghiță",
    title: "CHESS TRAINER",
    description: `Cu o carieră dedicată în totalitate șahului, Andrei Popescu este un instructor pasionat, cu peste un deceniu de experiență atât în competiții, cât și în activitatea de mentorat. Fost jucător de performanță, multiplu premiat la turnee naționale și internaționale, Andrei a ales să se concentreze pe formarea noilor generații de șahiști, având convingerea că șahul este mai mult decât un joc – este un instrument valoros pentru dezvoltarea personală și intelectuală.

Metoda sa de predare se bazează pe o combinație echilibrată între teorie solidă, practică intensă și încurajarea gândirii strategice. Fiecare lecție este gândită astfel încât să fie adaptată nivelului elevului – de la începători care abia învață mutările de bază, până la avansați care se pregătesc pentru competiții de înalt nivel.

Andrei lucrează atât cu copii, cât și cu adulți, individual sau în grupuri restrânse, și pune accent pe crearea unei atmosfere deschise și motivante. Elevii lui nu învață doar să câștige partide, ci și să gândească logic, să anticipeze consecințele deciziilor și să își gestioneze timpul și emoțiile – abilități esențiale în viața de zi cu zi.

Printre temele abordate în cursurile sale se numără: deschiderile și principiile lor, planificarea în jocul de mijloc, tacticile clasice (furculițe, clavete, atacuri duble etc.), finalurile fundamentale, analiza partidelor proprii și celebrarea marilor campioni ai șahului, ca sursă de inspirație.

Cu o atitudine caldă, răbdătoare și o dorință autentică de a vedea progresul fiecărui cursant, Andrei Popescu este mai mult decât un instructor – este un ghid de încredere pe tabla de șah și în afara ei.`,
    image: "images/team/vlad.jpg",
  },
  {
    name: "Georgiana Stanciu",
    title: "CO-FOUNDER & CHESS TRAINER",
    description: `Cu o carieră dedicată în totalitate șahului, Andrei Popescu este un instructor pasionat, cu peste un deceniu de experiență atât în competiții, cât și în activitatea de mentorat. Fost jucător de performanță, multiplu premiat la turnee naționale și internaționale, Andrei a ales să se concentreze pe formarea noilor generații de șahiști, având convingerea că șahul este mai mult decât un joc – este un instrument valoros pentru dezvoltarea personală și intelectuală.

    Metoda sa de predare se bazează pe o combinație echilibrată între teorie solidă, practică intensă și încurajarea gândirii strategice. Fiecare lecție este gândită astfel încât să fie adaptată nivelului elevului – de la începători care abia învață mutările de bază, până la avansați care se pregătesc pentru competiții de înalt nivel.
    
    Andrei lucrează atât cu copii, cât și cu adulți, individual sau în grupuri restrânse, și pune accent pe crearea unei atmosfere deschise și motivante. Elevii lui nu învață doar să câștige partide, ci și să gândească logic, să anticipeze consecințele deciziilor și să își gestioneze timpul și emoțiile – abilități esențiale în viața de zi cu zi.
    
    Printre temele abordate în cursurile sale se numără: deschiderile și principiile lor, planificarea în jocul de mijloc, tacticile clasice (furculițe, clavete, atacuri duble etc.), finalurile fundamentale, analiza partidelor proprii și celebrarea marilor campioni ai șahului, ca sursă de inspirație.
    
    Cu o atitudine caldă, răbdătoare și o dorință autentică de a vedea progresul fiecărui cursant, Andrei Popescu este mai mult decât un instructor – este un ghid de încredere pe tabla de șah și în afara ei.`,
    image: "images/team/geo.jpg",
  },
  {
    name: "Cristiana Stanciu",
    title: "CO-FOUNDER & CHESS TRAINER",
    description: `Cu o carieră dedicată în totalitate șahului, Andrei Popescu este un instructor pasionat, cu peste un deceniu de experiență atât în competiții, cât și în activitatea de mentorat. Fost jucător de performanță, multiplu premiat la turnee naționale și internaționale, Andrei a ales să se concentreze pe formarea noilor generații de șahiști, având convingerea că șahul este mai mult decât un joc – este un instrument valoros pentru dezvoltarea personală și intelectuală.

    Metoda sa de predare se bazează pe o combinație echilibrată între teorie solidă, practică intensă și încurajarea gândirii strategice. Fiecare lecție este gândită astfel încât să fie adaptată nivelului elevului – de la începători care abia învață mutările de bază, până la avansați care se pregătesc pentru competiții de înalt nivel.
    
    Andrei lucrează atât cu copii, cât și cu adulți, individual sau în grupuri restrânse, și pune accent pe crearea unei atmosfere deschise și motivante. Elevii lui nu învață doar să câștige partide, ci și să gândească logic, să anticipeze consecințele deciziilor și să își gestioneze timpul și emoțiile – abilități esențiale în viața de zi cu zi.
    
    Printre temele abordate în cursurile sale se numără: deschiderile și principiile lor, planificarea în jocul de mijloc, tacticile clasice (furculițe, clavete, atacuri duble etc.), finalurile fundamentale, analiza partidelor proprii și celebrarea marilor campioni ai șahului, ca sursă de inspirație.
    
    Cu o atitudine caldă, răbdătoare și o dorință autentică de a vedea progresul fiecărui cursant, Andrei Popescu este mai mult decât un instructor – este un ghid de încredere pe tabla de șah și în afara ei.`,
    image: "images/team/cris.jpg",
  },
  {
    name: "Călin Gheorghiu",
    title: "CHESS TRAINER",
    description: `Cu o carieră dedicată în totalitate șahului, Andrei Popescu este un instructor pasionat, cu peste un deceniu de experiență atât în competiții, cât și în activitatea de mentorat. Fost jucător de performanță, multiplu premiat la turnee naționale și internaționale, Andrei a ales să se concentreze pe formarea noilor generații de șahiști, având convingerea că șahul este mai mult decât un joc – este un instrument valoros pentru dezvoltarea personală și intelectuală.

    Metoda sa de predare se bazează pe o combinație echilibrată între teorie solidă, practică intensă și încurajarea gândirii strategice. Fiecare lecție este gândită astfel încât să fie adaptată nivelului elevului – de la începători care abia învață mutările de bază, până la avansați care se pregătesc pentru competiții de înalt nivel.
    
    Andrei lucrează atât cu copii, cât și cu adulți, individual sau în grupuri restrânse, și pune accent pe crearea unei atmosfere deschise și motivante. Elevii lui nu învață doar să câștige partide, ci și să gândească logic, să anticipeze consecințele deciziilor și să își gestioneze timpul și emoțiile – abilități esențiale în viața de zi cu zi.
    
    Printre temele abordate în cursurile sale se numără: deschiderile și principiile lor, planificarea în jocul de mijloc, tacticile clasice (furculițe, clavete, atacuri duble etc.), finalurile fundamentale, analiza partidelor proprii și celebrarea marilor campioni ai șahului, ca sursă de inspirație.
    
    Cu o atitudine caldă, răbdătoare și o dorință autentică de a vedea progresul fiecărui cursant, Andrei Popescu este mai mult decât un instructor – este un ghid de încredere pe tabla de șah și în afara ei.`,
    image: "images/team/calin.jpg",
  },
  {
    name: "David Kim",
    title: "Mentor",
    description: `Guiding students one move at a time.`,
    image: "https://randomuser.me/api/portraits/men/48.jpg",
  },
];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [activeInstructor, setActiveInstructor] = useState(instructors[0]);
  const [selected, setSelected] = useState(teamMembers[0]);

  

  const bannerImages = [
    {
      url: "/images/banner/theSquare.jpg",
      title: "Master Your Game",
      subtitle: "Professional chess instruction for all levels",
    },
    {
      url: "/images/banner/1.jpg",
      title: "Learn from Champions",
      subtitle: "Train with experienced grandmasters",
    },
    {
      url: "/images/banner/2.jpg",
      title: "Join Our Community",
      subtitle: "Be part of a thriving chess ecosystem",
    },
  ];

  const galleryImages = [
    "/images/banner/theSquare.jpg",
    "/images/banner/1.jpg",
    "/images/banner/2.jpg",
    "/images/banner/3.jpg",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const nextGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevGalleryImage = () => {
    setCurrentGalleryImage(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleSlideChange(swiper: Swiper): void {
    throw new Error("Function not implemented.");
  }

  return (
  <div className="min-h-screen bg-[#001a00]">
  <nav
    className={`fixed w-full z-50 transition-all duration-300 relative ${
      isScrolled ? "bg-[#233d36] shadow-lg" : "bg-transparent"
    }`}
  >
    <div className="mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center py-2">
        {/* Logo */}
        <div className="flex items-center space-x-2 pt-4">
          <img
            src="images/logo/square-logo.png"
            alt="Logo"
            className="w-[120px] sm:w-[150px] ml-[10px] sm:ml-[60px]" // Dimensiune mai mică pe telefon
          />
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4 ml-auto font-archivo tracking-[0.1em] text-[#badad5] text-right sm:pr-[40px]">
          {["about", "team", "services", "gallery", "testimonials", "contact"].map(
            (section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  isScrolled
                    ? "text-white hover:bg-[#a6b6e0] hover:text-[#233d36]"
                    : "text-[#a6b6e0] hover:bg-[#a6b6e0] hover:text-white"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#a6b6e0] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
    </div>

    {/* Mobile dropdown menu */}
    {mobileMenuOpen && (
      <div className="md:hidden fixed inset-0 bg-[#233d36] bg-opacity-90 z-50 px-4 py-2">
        <div className="flex justify-end">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#a6b6e0] focus:outline-none text-xl"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {["about", "team", "services", "gallery", "testimonials", "contact"].map(
          (section) => (
            <button
              key={section}
              onClick={() => {
                scrollToSection(section);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-[#badad5] hover:bg-[#a6b6e0] hover:text-[#233d36] transition"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          )
        )}
      </div>
    )}
  </nav>

  




      <header className="sm:container mx-auto relative flex items-center justify-center overflow-hidden font-archivo">
  <div className="w-full pt-10 sm:pt-0 sm:pb-16 pb-8 px-4 sm:px-0">
    <div className="relative h-[500px] sm:h-[638px] rounded-[24px] overflow-hidden shadow-xl">
      {bannerImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100 z-20' : 'opacity-0 z-10'
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
                  onClick={() => scrollToSection('contact')}
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






 
      <section className="py-20 px-4  border-[#233d36] border-t-[1px] font-archivo">
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

          <div className="sm:container mx-auto">
            <div className="grid grid-cols-12 gap-4 px-4 sm:px-0 mt-[46px] sm:mt-[75px]">
              <div className="col-span-12 lg:col-span-8 flex flex-col items-start relative ml-[12px]">
                <div>
                  <div className="absolute rounded-full  border-[1.5px] lg:border-3 border-[#D3B77B] z-[-1] h-[43px] w-[43px] sm:h-[123px] sm:w-[123px] absolute top-[-11px] sm:top-[25px] left-[-19px] sm:left-[-59px]"></div>
                  <h4 className="font-archivo text-[#a6b6e0] text-[14px] tracking-[0.1em] sm:text-[24px] font-[400] leading-[15.39px] sm:leading-[26.38px] mb-[6px] sm:mb-[9px] sm:mt-[84px]">
                    ABOUT US
                  </h4>
                  <h4 className="font-archivo text-left text-[#a6b6e0] text-[24px] font-[400] sm:tracking-[0.1em] sm:text-[52px] leading-[26.38px] sm:leading-[57px] mb-[20px] sm:mb-[25px]">
                    HOURLY BOOKING
                  </h4>
                  <p className="font-archivo text-[#a6b6e0] text-left font-outfit tracking-[1.4px] font-[500] sm:px-0 tracking-[1.2px] sm:tracking-[1.392px] leading-[15.12px] sm:leading-[17.64px] leading-[1.2] tracking-[1px] sm:tracking-[1px] font-[400] mt-[13px] sm:mt-[24px] mb-[20px] sm:mb-[45px] text-[12px] sm:text-[14px] max-w-[289px] sm:max-w-[595px]">
                    Our Hourly Booking Limousine Switzerland service gives you
                    the freedom to travel on your terms. Whether you have
                    multiple stops, an unpredictable schedule, or simply need a
                    car at your disposal, our professional chauffeurs are ready
                    to assist. Enjoy the convenience of a private ride that
                    waits for you, adapts to your needs, and ensures a seamless,
                    stress-free experience—hour by hour.
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

      
      <Calendar />

    

      <section className="py-20 px-4  border-[#233d36] border-t-[1px] font-archivo">
        <div className="w-full relative bg-[#001a00]" id="about">
          <img
            src="/public/images/banner/TheLight.png"
            className="hidden sm:block absolute  left-[30px] top-[80px] max-w-[190px] z-[-1]"
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
                  <div className="absolute rounded-full  border-[1.5px] lg:border-3 border-[#D3B77B] z-[-1] h-[43px] w-[43px] sm:h-[123px] sm:w-[123px] absolute top-[-11px] sm:top-[25px] left-[-19px] sm:left-[-59px]"></div>
                  <h4 className="font-archivo text-[#a6b6e0] text-[14px] tracking-[0.1em] sm:text-[24px] font-[400] leading-[15.39px] sm:leading-[26.38px] mb-[6px] sm:mb-[9px] sm:mt-[84px]">
                    ABOUT US
                  </h4>
                  <h4 className="font-archivo text-left text-[#a6b6e0] text-[24px] font-[400] sm:tracking-[0.1em] sm:text-[52px] leading-[26.38px] sm:leading-[57px] mb-[20px] sm:mb-[25px]">
                    HOURLY BOOKING
                  </h4>
                  <p className="font-archivo text-[#a6b6e0] text-left font-outfit tracking-[1.4px] font-[500] sm:px-0 tracking-[1.2px] sm:tracking-[1.392px] leading-[15.12px] sm:leading-[17.64px] leading-[1.2] tracking-[1px] sm:tracking-[1px] font-[400] mt-[13px] sm:mt-[24px] mb-[20px] sm:mb-[45px] text-[12px] sm:text-[14px] max-w-[289px] sm:max-w-[595px]">
                    Our Hourly Booking Limousine Switzerland service gives you
                    the freedom to travel on your terms. Whether you have
                    multiple stops, an unpredictable schedule, or simply need a
                    car at your disposal, our professional chauffeurs are ready
                    to assist. Enjoy the convenience of a private ride that
                    waits for you, adapts to your needs, and ensures a seamless,
                    stress-free experience—hour by hour.
                  </p>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 relative mb-[66px] sm:mb-[95px] rounded-[20px] mx-auto inline-block">
                <div className="relative w-full h-full shadow-[-10px_11px_35px_rgba(0,0,0,0.25)] rounded-[20px]">
                  <img
                    src="/public/images/banner/3.jpg"
                    className="hidden sm:block w-[322px] h-[338px] sm:w-[495px] sm:h-[469px] rounded-[20px] object-cover"
                  />
                  <img
                    src="images/landingpage/hourly-booking/zurich (5).jpg"
                    className="sm:hidden w-[322px] h-[338px] sm:w-[495px] sm:h-[469px] rounded-[20px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001a00]/80  to-[#858585]/0 rounded-[17px] opacity-[0.8]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20  border-[#233d36] border-t-[1px] font-archivo bg-[#001a00]" id="team">
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
        onSlideChange={handleSlideChange}
        breakpoints={{
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
        modules={[Navigation]}
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col lg:flex-row items-center text-center lg:text-left  ">
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
              <div className="lg:w-1/2 max-w-3xl mx-auto lg:pl-16 sm:ml-[360px] ">
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



      <div className="w-full sm:pt-[109px] border-[#233d36] border-t-[1px] pt-[62px] sm:pb-[172px] pb-[68px] relative overflow-hidden">
        <div className="container mx-auto">
          <h3 className="text-[10px] sm:text-[12px] text-[#badad5]  leading-[12.6px] sm:leading-[15.12px] tracking-[4px] sm:tracking-[4.96px] text-[#fff] font-outfit font-[500]  uppercase text-center">
            THE THINGS WE OFFER
          </h3>
          <h2 className="sm:text-[40px] text-[24px] leading-[125%] tracking-[0.1em] font-[400] font-archivo  text-[#a6b6e0] text-center sm:mt-[14px] mt-[7px] mx-auto">
            WHAT WE STAND FOR
          </h2>

          <p className="text-[#a6b6e0] font-archivo  font-[400] leading-[125%] tracking-[0.1em] mx-auto max-w-[313px] sm:max-w-[544px] text-center sm:mt-[19px] mt-[21px]">
            Whether you need a punctual ride, a dedicated driver for your stay,
            or a service crafted around your schedule, we deliver with
            unwavering dependability and effortless precision.
          </p>

          <div className="grid sm:grid-cols-3 grid-cols-1 mt-[60px] sm:mt-[112px] relative">
            <hr className="border-[#badad5] border-b-[1px] absolute w-[65%] mx-auto left-0 right-0 top-[28px] z-[-1] hidden sm:block" />
            <div className="text-left">
              <div className="text-center">
                <img
                  src="/images/banner/stars.svg"
                  className="w-auto h-[48.43px] sm:h-[64.58px] mx-auto bg-custom-black-900 px-[43px] "
                />
                <h4 className="text-[#a6b6e0] font-archivo  font-[400] uppercase leading-[125%] tracking-[0.1em] text-[24px] sm:text-[32px] mt-[18.57px] sm:mt-[24px]">
                  THE STANDARD
                </h4>
                <h5 className="text-[10px] text-[#badad5]  sm:text-[12px] leading-[12.6px] sm:leading-[15.12px] tracking-[4px] sm:tracking-[4.96px] text-[#fff] font-outfit font-[500]  uppercase mt-[7px] sm:mt-[9.69px]">
                  EXCELLENCE
                </h5>
              </div>
            </div>
            <div className="sm:hidden block w-[1px] h-[50px] mb-[22.14px] mt-[17px] bg-[#2c2c2c] mx-auto"></div>
            <div className="text-center">
              <div className="text-center">
                <img
                  src="/images/banner/stars.svg"
                  className="w-auto h-[48.43px] sm:h-[64.58px] mx-auto bg-custom-black-900 px-[43px]"
                />
                <h4 className="text-[#a6b6e0] font-archivo  font-[400] uppercase leading-[125%] tracking-[0.1em] text-[24px] sm:text-[32px] mt-[18.57px] sm:mt-[24px]">
                  DEPENDABILITY
                </h4>
                <h5 className="text-[10px] text-[#badad5]  sm:text-[12px] leading-[12.6px] sm:leading-[15.12px] tracking-[4px] sm:tracking-[4.96px] text-[#fff] font-outfit font-[500]  uppercase mt-[7px] sm:mt-[9.69px]">
                  WITHOUT QUESTION
                </h5>
              </div>
            </div>
            <div className="sm:hidden block w-[1px] h-[50px] mb-[22.14px] mt-[17px] bg-[#2c2c2c] mx-auto"></div>
            <div className="text-right">
              <div className="text-center">
                <img
                  src="/images/banner/stars.svg"
                  className="w-auto h-[48.43px] sm:h-[64.58px] mx-auto bg-custom-black-900 px-[43px]"
                />
                <h4 className="text-[#a6b6e0] font-archivo  font-[400] uppercase leading-[125%] tracking-[0.1em]text-[24px] sm:text-[32px] mt-[18.57px] sm:mt-[24px]">
                  EFFORTLESS
                </h4>
                <h5 className="text-[10px] text-[#badad5] sm:text-[12px] leading-[12.6px] sm:leading-[15.12px] tracking-[4px] sm:tracking-[4.96px] text-[#fff] font-outfit font-[500]  uppercase mt-[7px] sm:mt-[9.69px]">
                  SERVICE
                </h5>
              </div>
            </div>
          </div>
        </div>
        <img
          src="{{ asset('images/landingpage/wef/lightLeft.png') }}"
          className="absolute left-0 top-[50%] max-w-[160px] z-[-1] sm:block hidden"
        />
        <img
          src="{{ asset('images/landingpage/wef/lightRight.png') }}"
          className="absolute right-0 top-[10%] max-w-[160px] z-[-1] sm:block hidden"
        />
      </div>

      <ServicesSection />

      <section
  className="py-20 bg-[#001a00] border-t border-[#233d36]"
  id="gallery"
>
  <div className="sm:container mx-auto px-4">
    <div className="max-w-[1420px] max-h-[800px] mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-16 text-[#233d36]">
        Gallery
      </h2>

      {/* Imagine + săgeți (responsive layout) */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Imagine */}
        <div className="w-full overflow-hidden rounded-lg shadow-xl relative">
          <img
            src={galleryImages[currentGalleryImage]}
            alt={`Gallery image ${currentGalleryImage + 1}`}
            className="w-full h-[400px] sm:h-[600px] object-cover transition-opacity duration-500 rounded-lg"
          />
        </div>

        {/* Arrows - sub imagine pe mobil, laterale pe desktop */}
        <div className="flex justify-center gap-6 mt-4 sm:mt-0 sm:absolute sm:inset-0 sm:justify-between sm:px-6 sm:items-center">
          <button
            onClick={prevGalleryImage}
            className="text-[#a6b6e0] hover:text-[#badad5] transition-colors duration-300 z-10 sm:relative sm:-left-14"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.5]" />
          </button>

          <button
            onClick={nextGalleryImage}
            className="text-[#a6b6e0] hover:text-[#badad5] transition-colors duration-300 z-10 sm:relative sm:-right-14"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Navigation dots */}
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
  </div>
</section>

      <Testimonial />

      <Contact />

      <footer className="bg-[#001a00] border-t-[1px] border-[#233d36]">
        <div className="sm:container mx-auto px-20 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center gap-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Facebook</span>
              <svg
                className="size-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Instagram</span>
              <svg
                className="size-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">X</span>
              <svg
                className="size-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">GitHub</span>
              <svg
                className="size-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">YouTube</span>
              <svg
                className="size-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
          <p className="mt-8 text-center text-sm/6 text-gray-400 md:order-1 md:mt-0">
            &copy; 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
