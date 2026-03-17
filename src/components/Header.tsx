import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Calendar as CalendarIcon } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../contexts/LanguageContext";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function Header() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  const isBlogPage = location.pathname.startsWith("/blog");

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage ? "bg-[#233d36] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-2">
          <Link to="/" className="flex items-center space-x-2 pt-4 pl-2 sm:pl-16">
            <img
              src="/images/logo/Logo-square.svg?v=2"
              alt="Logo"
              className="w-[110px] sm:w-[150px]"
              loading="eager"
              decoding="async"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1 ml-auto font-archivo text-[#badad5] pr-4">
            <button
              onClick={() => scrollToSection("about")}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-semibold tracking-wide ${
                isScrolled || !isHomePage ? "text-white" : "text-[#a6b6e0]"
              }`}
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-semibold tracking-wide ${
                isScrolled || !isHomePage ? "text-white" : "text-[#a6b6e0]"
              }`}
            >
              {t('nav.team')}
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-semibold tracking-wide ${
                isScrolled || !isHomePage ? "text-white" : "text-[#a6b6e0]"
              }`}
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-semibold tracking-wide ${
                isScrolled || !isHomePage ? "text-white" : "text-[#a6b6e0]"
              }`}
            >
              {t('nav.gallery')}
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-semibold tracking-wide ${
                isScrolled || !isHomePage ? "text-white" : "text-[#a6b6e0]"
              }`}
            >
              {t('nav.testimonials')}
            </button>
            <Link
              to="/blog"
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 font-semibold tracking-wide ${
                isBlogPage
                  ? "bg-[#badad5]/20 text-[#badad5]"
                  : `hover:bg-[#badad5]/20 ${isScrolled || !isHomePage ? "text-white" : "text-[#a6b6e0]"}`
              }`}
            >
              {t('nav.blog')}
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-semibold tracking-wide ${
                isScrolled || !isHomePage ? "text-white" : "text-[#a6b6e0]"
              }`}
            >
              {t('nav.contact')}
            </button>

            <div className="w-px h-5 bg-[#badad5]/30 mx-2" />

            <LanguageSwitcher />

            <button
              onClick={() => window.Calendly?.initPopupWidget({ url: 'https://calendly.com/acsthesquarechessclub' })}
              className="ml-2 px-5 py-2 text-sm rounded-lg bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Programează-te
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-3 pr-2 sm:pr-4">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#badad5] focus:outline-none p-3 hover:bg-[#233d36]/50 rounded-xl transition-colors touch-manipulation"
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7"
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

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#001a00] z-[100] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-[#233d36] bg-[#001a00]">
            <img
              src="/images/logo/Logo-square.svg?v=2"
              alt="Logo"
              className="w-[90px] sm:w-[110px]"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#badad5] p-3 hover:bg-[#233d36] rounded-xl transition-colors touch-manipulation"
              aria-label="Close menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="space-y-2 max-w-md mx-auto">
              <button
                onClick={() => { scrollToSection("about"); setMobileMenuOpen(false); }}
                className="w-full text-left px-5 py-4 rounded-xl text-[#badad5] hover:bg-[#233d36] active:bg-[#233d36] transition-colors font-archivo text-base sm:text-lg font-medium touch-manipulation"
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => { scrollToSection("team"); setMobileMenuOpen(false); }}
                className="w-full text-left px-5 py-4 rounded-xl text-[#badad5] hover:bg-[#233d36] active:bg-[#233d36] transition-colors font-archivo text-base sm:text-lg font-medium touch-manipulation"
              >
                {t('nav.team')}
              </button>
              <button
                onClick={() => { scrollToSection("services"); setMobileMenuOpen(false); }}
                className="w-full text-left px-5 py-4 rounded-xl text-[#badad5] hover:bg-[#233d36] active:bg-[#233d36] transition-colors font-archivo text-base sm:text-lg font-medium touch-manipulation"
              >
                {t('nav.services')}
              </button>
              <button
                onClick={() => { scrollToSection("gallery"); setMobileMenuOpen(false); }}
                className="w-full text-left px-5 py-4 rounded-xl text-[#badad5] hover:bg-[#233d36] active:bg-[#233d36] transition-colors font-archivo text-base sm:text-lg font-medium touch-manipulation"
              >
                {t('nav.gallery')}
              </button>
              <button
                onClick={() => { scrollToSection("testimonials"); setMobileMenuOpen(false); }}
                className="w-full text-left px-5 py-4 rounded-xl text-[#badad5] hover:bg-[#233d36] active:bg-[#233d36] transition-colors font-archivo text-base sm:text-lg font-medium touch-manipulation"
              >
                {t('nav.testimonials')}
              </button>
              <Link
                to="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-5 py-4 rounded-xl text-[#badad5] transition-colors font-archivo text-base sm:text-lg font-medium touch-manipulation ${
                  isBlogPage ? "bg-[#233d36]" : "hover:bg-[#233d36] active:bg-[#233d36]"
                }`}
              >
                {t('nav.blog')}
              </Link>
              <button
                onClick={() => { scrollToSection("contact"); setMobileMenuOpen(false); }}
                className="w-full text-left px-5 py-4 rounded-xl text-[#badad5] hover:bg-[#233d36] active:bg-[#233d36] transition-colors font-archivo text-base sm:text-lg font-medium touch-manipulation"
              >
                {t('nav.contact')}
              </button>
            </div>
          </nav>

          {/* Footer */}
          <div className="px-4 sm:px-6 py-5 sm:py-6 border-t border-[#233d36] bg-[#001a00]">
            <div className="max-w-md mx-auto">
              <button
                onClick={() => {
                  window.Calendly?.initPopupWidget({ url: 'https://calendly.com/acsthesquarechessclub' });
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] py-4 rounded-xl font-archivo font-bold text-base transition-all duration-300 hover:shadow-xl shadow-lg flex items-center justify-center gap-2 touch-manipulation"
              >
                <CalendarIcon className="w-5 h-5" />
                Programează-te
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
