import React, { useState } from "react";

interface NavigationProps {
  isScrolled: boolean;
  scrollToSection: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  isScrolled,
  scrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
              className="w-[120px] sm:w-[150px] ml-[10px] sm:ml-[60px]"
            />
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4 ml-auto font-archivo tracking-[0.1em] text-[#badad5] text-right sm:pr-[40px]">
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
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  isScrolled
                    ? "text-white hover:bg-[#a6b6e0] hover:text-[#233d36]"
                    : "text-[#a6b6e0] hover:bg-[#a6b6e0] hover:text-white"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
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

export default Navigation;
