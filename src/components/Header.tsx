import React, { useState, useEffect } from "react";

interface HeaderProps {
  scrollToSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#233d36] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a
              href="/"
              className="text-[#badad5] text-2xl font-bold font-archivo"
            >
              THE SQUARE
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {[
              "about",
              "team",
              "services",
              "gallery",
              "testimonials",
              "contact",
            ].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-[#badad5] hover:text-[#a6b6e0] transition-colors duration-300 font-archivo"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#badad5] focus:outline-none"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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
          {[
            "about",
            "team",
            "services",
            "gallery",
            "testimonials",
            "contact",
          ].map((section) => (
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
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;
