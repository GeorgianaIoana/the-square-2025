import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Calendar as CalendarIcon, ChevronDown, Users, Image as ImageIcon, MessageSquareQuote } from "lucide-react";
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
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled || !isHomePage ? "bg-[#233d36]/95 shadow-lg backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="flex items-center pl-2 sm:pl-10 group">
            <img
              src="/images/logo/Logo-square.svg?v=2"
              alt="The Square Chess Club"
              className="w-[120px] sm:w-[160px] drop-shadow-[0_0_8px_rgba(166,182,224,0.3)] group-hover:drop-shadow-[0_0_14px_rgba(186,218,213,0.5)] transition-all duration-500 group-hover:scale-105"
              loading="eager"
              decoding="async"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1 ml-auto font-archivo text-[#badad5] pr-4">
            {/* "Despre noi" dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                setAboutDropdownOpen(true);
              }}
              onMouseLeave={() => {
                dropdownTimeoutRef.current = setTimeout(() => setAboutDropdownOpen(false), 200);
              }}
            >
              <button
                onClick={() => scrollToSection("about")}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 font-semibold tracking-wide hover:text-[#badad5] inline-flex items-center gap-1.5 ${
                  isScrolled || !isHomePage ? "text-white" : "text-[#a6b6e0]"
                }`}
              >
                {t('nav.about')}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${aboutDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2.5 transition-all duration-200 ease-out ${
                  aboutDropdownOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}
              >
                <div className="bg-[#1a3530] border border-[#badad5]/10 rounded-xl shadow-xl shadow-black/30 overflow-hidden min-w-[190px]">
                  <div className="py-1.5 px-1.5">
                    <button
                      onClick={() => { scrollToSection("team"); setAboutDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#badad5]/80 hover:text-white hover:bg-white/[0.07] transition-colors duration-150"
                    >
                      <Users className="w-4 h-4 opacity-60" />
                      <span className="text-[13px] font-medium">{t('nav.team')}</span>
                    </button>
                    <button
                      onClick={() => { scrollToSection("gallery"); setAboutDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#badad5]/80 hover:text-white hover:bg-white/[0.07] transition-colors duration-150"
                    >
                      <ImageIcon className="w-4 h-4 opacity-60" />
                      <span className="text-[13px] font-medium">{t('nav.gallery')}</span>
                    </button>
                    <button
                      onClick={() => { scrollToSection("testimonials"); setAboutDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#badad5]/80 hover:text-white hover:bg-white/[0.07] transition-colors duration-150"
                    >
                      <MessageSquareQuote className="w-4 h-4 opacity-60" />
                      <span className="text-[13px] font-medium">{t('nav.testimonials')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollToSection("services")}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 font-semibold tracking-wide hover:text-[#badad5] ${
                isScrolled || !isHomePage ? "text-white" : "text-[#a6b6e0]"
              }`}
            >
              {t('nav.services')}
            </button>
            <Link
              to="/blog"
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 font-semibold tracking-wide ${
                isBlogPage
                  ? "text-[#badad5]"
                  : `hover:text-[#badad5] ${isScrolled || !isHomePage ? "text-white" : "text-[#a6b6e0]"}`
              }`}
            >
              {t('nav.blog')}
            </Link>
            <a
              href="https://www.openthesquare.ro/"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 font-semibold tracking-wide hover:text-[#badad5] ${
                isScrolled || !isHomePage ? "text-white" : "text-[#a6b6e0]"
              }`}
            >
              Concurs
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 font-semibold tracking-wide hover:text-[#badad5] ${
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
              alt="The Square Chess Club"
              className="w-[100px] sm:w-[120px] drop-shadow-[0_0_8px_rgba(166,182,224,0.3)]"
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
              {/* "Despre noi" with expandable sub-items */}
              <div>
                <div className="flex items-center">
                  <button
                    onClick={() => { scrollToSection("about"); setMobileMenuOpen(false); setMobileAboutOpen(false); }}
                    className="flex-1 text-left px-5 py-4 rounded-l-xl text-[#badad5] hover:bg-[#233d36] active:bg-[#233d36] transition-colors font-archivo text-base sm:text-lg font-medium touch-manipulation"
                  >
                    {t('nav.about')}
                  </button>
                  <button
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className={`px-4 py-4 rounded-r-xl text-[#badad5] transition-colors touch-manipulation ${mobileAboutOpen ? 'bg-[#233d36]' : 'hover:bg-[#233d36] active:bg-[#233d36]'}`}
                    aria-label="Toggle about submenu"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${mobileAboutOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    mobileAboutOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-1 ml-4 space-y-0.5 rounded-xl bg-[#233d36]/50 p-2">
                      <button
                        onClick={() => { scrollToSection("team"); setMobileMenuOpen(false); setMobileAboutOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-[#badad5]/70 hover:text-[#badad5] hover:bg-[#badad5]/8 active:bg-[#badad5]/10 transition-all font-archivo text-sm sm:text-base font-medium touch-manipulation"
                      >
                        <Users className="w-4 h-4 shrink-0" />
                        {t('nav.team')}
                      </button>
                      <button
                        onClick={() => { scrollToSection("gallery"); setMobileMenuOpen(false); setMobileAboutOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-[#badad5]/70 hover:text-[#badad5] hover:bg-[#badad5]/8 active:bg-[#badad5]/10 transition-all font-archivo text-sm sm:text-base font-medium touch-manipulation"
                      >
                        <ImageIcon className="w-4 h-4 shrink-0" />
                        {t('nav.gallery')}
                      </button>
                      <button
                        onClick={() => { scrollToSection("testimonials"); setMobileMenuOpen(false); setMobileAboutOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-[#badad5]/70 hover:text-[#badad5] hover:bg-[#badad5]/8 active:bg-[#badad5]/10 transition-all font-archivo text-sm sm:text-base font-medium touch-manipulation"
                      >
                        <MessageSquareQuote className="w-4 h-4 shrink-0" />
                        {t('nav.testimonials')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { scrollToSection("services"); setMobileMenuOpen(false); }}
                className="w-full text-left px-5 py-4 rounded-xl text-[#badad5] hover:bg-[#233d36] active:bg-[#233d36] transition-colors font-archivo text-base sm:text-lg font-medium touch-manipulation"
              >
                {t('nav.services')}
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
              <a
                href="https://www.openthesquare.ro/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left px-5 py-4 rounded-xl text-[#badad5] hover:bg-[#233d36] active:bg-[#233d36] transition-colors font-archivo text-base sm:text-lg font-medium touch-manipulation"
              >
                Concurs
              </a>
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
