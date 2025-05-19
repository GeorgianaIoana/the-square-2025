import React, { useState, useEffect } from "react";
import ServicesSection from "./ServicesSection";
import Calendar from "./Calendar";
import Contact from "./Contact";
import Banner from "./Banner";
import About from "./About";
import Team from "./Team";
import Gallery from "./Gallery";
import Testimonial from "./Testimonial";
import Benefits from "./Benefits";
import Navigation from "./Navigation";
import WhatsAppButton from "./WhatsAppButton";

const Homepage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <div className="min-h-screen bg-[#001a00]">
      <Navigation isScrolled={isScrolled} scrollToSection={scrollToSection} />
      <Banner scrollToSection={scrollToSection} />
      <About />
      <Calendar />
      <Benefits />
      <Team />
      <Gallery />
      <Testimonial />
      <Contact />
      <WhatsAppButton />
    </div>
  );
};

export default Homepage;
