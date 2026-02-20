import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from "react";
import ServicesSection from "./components/ServicesSection";
import Calendar from "./components/Calendar";
import Contact from "./components/Contact";
import Team from "./components/Team";
import WhatsAppButton from "./components/WhatsAppButton";
import LanguageSwitcher from "./components/LanguageSwitcher";
import TawkToLanguage from "./components/TawkToLanguage";
import TypeWriter from "./components/TypeWriter";
import GlowCursor from "./components/GlowCursor";
import SnowEffect from "./components/SnowEffect";
import { ChevronRight, ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Testimonial from "./components/Testimonial";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLanguage } from "./contexts/LanguageContext";

// Lazy load pages for better performance
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const CookiePolicyPage = lazy(() => import("./pages/CookiePolicyPage"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const ThankYouPage = lazy(() => import("./components/ThankYouPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const teamMembers = [
  {
    name: "Vlad Ghiță",
    title: "CHESS TRAINER",
    description: `Cu o experiență de peste 17 ani în șahul de performanță, Vlad Ghiță este un pasionat al jocului care a disputat peste 800 de partide în turnee internaționale. Este Instructor Național FIDE din 2022 și Arbitru Național din 2025, statut care reflectă atât angajamentul său față de șah, cât și dorința de a contribui activ la formarea altor jucători.
De-a lungul carierei, a obținut rezultate deosebite, printre care se numără: câștigarea premiului U2000 la Campionatul Național de Amatori al României (2025), victoria în Semifinala Campionatului Național al României (2021), locul I la categoria U1900 în cadrul turneului Mid-America Open (2017), precum și atingerea celui mai înalt rating FIDE personal, 2021.
Este apreciat pentru abordarea sa structurată, formularea de planuri clare și stăpânirea finalurilor practice – în special cele de turnuri. În cadrul lecțiilor, pune accent pe înțelegerea principiilor strategice, recunoașterea pozițiilor-cheie și dezvoltarea gândirii autonome, astfel încât elevii să capete încredere în propriile decizii și să performeze în condiții reale de joc.
În afara șahului, Vlad este pasionat de muzica clasică, tenisul de masă și descoperirea diversității culturale și gastronomice din întreaga lume – pasiuni care reflectă curiozitatea, echilibrul și profunzimea cu care abordează tot ceea ce face.`,
    image: "images/team/vlad.jpg",
  },
  {
    name: "WNM Georgiana Stanciu",
    title: "CO-FOUNDER & CHESS TRAINER",
    description: `Cele mai importante rezultate internaționale ale ei sunt: locul 9 la Campionatul European de șah clasic în Muntenegru 2009, locul 4 la Mondialele școlare din Thailanda 2015 si locul 8 la Campionatul Mondial de șah clasic din Rusia 2016. Elo-ul ei fide de vârf a fost 2054, la vârsta de 16 ani, iar titlul său în prezent este de WNM (maestră națională). Are 8 ani experiență de predarea șahului, iar din 2024 își investește mintea în programare ca Web Developer și Ux/Ui Designer. Georgiana a început șahul la vârsta de 6 ani, la clubul copiilor, unde sora ei participa adesea, alături de un antrenor foarte implicat în performanța copiilor. La doar 7 ani, devine campioană națională, iar copilaria ei își schimbă direcția într-o călătorie interesantă la campionatele europene și mondiale, plină de amintiri frumoase din țările străine, alături de colegi care reprezentau Romania. Șahul face parte din identitatea ei, căci a crescut pe cele 64 de pătrățele și îi este profund recunoscătoare acestui sport, care i-a șlefuit personalitatea. Astfel, la inițiativa Cristianei, dorește să îmbrățișeze Bucureștiul cu pasiunea ei și să ofere o platformă de instruire profesionistă pentru jucătorii de șah, la fel cum a beneficiat și ea ca junioară. A ocupat în fiecare an un loc pe podiumul național la șah clasic și rapid individual, însă locul 1 a fost obținut la categoriile fete sub 8 (2006, CN Predeal), fete sub 12 (2011, CN Voineasa), fete sub 18 ani (2016, CN Călimănești) și fete sub 20 ani (2018, CN Călimănești).
 `,
    image: "images/team/georgiana.jpg",
  },
  {
    name: "Cristiana Stanciu",
    title: "CO-FOUNDER & CHESS TRAINER",
    description: `Cristiana a obținut multiple clasări pe podium la Campionatele Naționale de juniori pe echipe, alături de coechipierele ei de la CSM Craiova, și numeroase premii la turneele locale, atingând un rating FIDE de 1650 și categoria I.

În urma studiilor sale, Cristiana a obținut certificatul pedagogic și a absolvit un Master în cadrul Royal College of Art din Londra, o experiență care i-a consolidat sensibilitatea artistică și capacitatea de a construi povești vizuale memorabile.

Dar dincolo de realizările ei competiționale și academice, Cristiana are un talent secret: știe să scrie frumos despre orice, a scris numeroase poezii. Astfel, ea se ocupă de imaginea clubului de șah și de interacțiunea cu publicul, fiind persoana care dă glas emoțiilor, ideilor și visurilor care definesc comunitatea noastră. Este amabilă, optimistă, sociabilă și are acel farmec natural de a crea un mediu cald și primitor în jurul ei.
 Ca un pion care devine regină, Cristiana știe să se reinventeze și să creadă mereu în "mai bine".

Este pasionată de educație și dezvoltare personală, iar șahul este pentru ea un instrument excelent prin care copiii își pot dezvolta gândirea, răbdarea și încrederea în sine. Cristiana știe cum să facă lucrurile complexe din șah să pară simple și distractive, iar acest dar se reflectă în entuziasmul și progresul copiilor care învață alături de ea – într-un mediu prietenos și creativ.`,
    image: "images/team/cris-chess.jpg",
  },
  {
    name: "FM Călin Gheorghiu",
    title: "CHESS TRAINER",
    description: `Maestru FIDE încă de la vârsta de 16 ani, Călin a atins un vârf de 2384 Elo fide în clasamentul internațional și 2757 Elo pe platforma chess.com. Palmaresul său include multiple titluri de campion național, participarea la Campionatul Mondial de Juniori din India și participarea la Campionatul European din Muntenegru, reprezentând cu mândrie România.
 Încă din copilărie, Călin a fost dedicat șahului și matematicii, domenii în care a excelat datorită conștiinciozității, inteligenței și creativității sale deosebite. A absolvit Facultatea de Matematică în Scoția, apoi a urmat un master în programare la Iași, pregătindu-se în prezent pentru a-și susține doctoratul. În paralel cu activitatea sa din domeniul IT, Călin are peste 5 ani de experiență ca instructor de șah, timp în care a format jucători cu rezultate remarcabile. Ceea ce îl diferențiază este stilul său interactiv și captivant de predare, influențat de pasiunea lui pentru stand-up comedy. Lecțiile cu el sunt atât instructive, cât și pline de energie și umor, creând un mediu de învățare prietenos, în care progresul devine o plăcere. Călin se bucură să contribuie la fericirea oamenilor: fie că progresează rapid la șah sau că râd la glumele sale, ca apoi să se retragă în liniște și să analizeze strategic cum ar fi putut face și mai bine ceea ce știe.
Ești la început de drum sau un jucător avansat în căutare de un antrenor serios? alături de Călin vei descoperi șahul dintr-o perspectivă nouă – serioasă în competiție, dar relaxată în abordare.`,
    image: "images/team/calin.jpg",
  },
  {
    name: "Mustafa Hamdan",
    title: "CHESS TRAINER",
    description: `Mustafa Hamdan este un instructor de șah pasionat, care vede fiecare partidă ca pe o lecție valoroasă de viață. El studiază atent fiecare mutare pentru a descoperi cum deciziile inspirate pot conduce la victorie, fiind influențat de partidele marilor maeștri, pe care le studiază zilnic. Mustafa este  ambițios, devotat și muncitor pentru a-și atinge obiectivele setate în performanța șahistă. Povestea lui a început ca student al cursurilor de grupă la The Square, la care participa activ si nu lipsea nicio ședință.
La clubul de șah, a fost captivat de comunitatea prietenoasă, care l-a încurajat să își depășească limitele. Juca șah de plăcere online, iar în doar câteva luni a observat o dezvoltare remarcabilă alături de instructorii The Square. În doar două luni a atins un rating de 1700 pe Chess.com și își propune să participe la turneele locale și naționale. Abordarea sa didactică se bazează pe creativitate, deschideri și tactică, fiind dedicat să ajute fiecare copil să înțeleagă profund conceptele și să sprijine progresul lor înspre performanță. El poate să predea fluent în limba română, engleză și arabă, iar toți elevii săi participă cu drag și perseverează.
`,
    image: "images/team/mustafa.jpg",
  },
];

function App() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});

  const toggleDescription = useCallback((name: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }, []);

  const bannerImages = useMemo(() => [
    {
      url: "/images/banner/theSquare.jpg",
      title: t('banner.title1'),
      subtitle: t('banner.subtitle1'),
    },
    {
      url: "/images/banner/1.jpg",
      title: t('banner.title2'),
      subtitle: t('banner.subtitle2'),
    },
    {
      url: "/images/banner/2.jpg",
      title: t('banner.title3'),
    },
  ], [t]);

  const galleryImages = useMemo(() => [
    "/images/gallery/kids.jpg",
    "/images/gallery/happy-people.jpg",
    "/images/gallery/chess-camp-calin.jpg",
    "/images/gallery/chess-camp-vlad.jpg",
    "/images/banner/2.jpg",
    "/images/banner/3.jpg",
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Preload all banner and gallery images on mount
  useEffect(() => {
    const bannerUrls = [
      "/images/banner/theSquare.jpg",
      "/images/banner/1.jpg",
      "/images/banner/2.jpg",
    ];
    const galleryUrls = [
      "/images/gallery/kids.jpg",
      "/images/gallery/happy-people.jpg",
      "/images/gallery/chess-camp-calin.jpg",
      "/images/gallery/chess-camp-vlad.jpg",
      "/images/banner/2.jpg",
      "/images/banner/3.jpg",
    ];
    const allImages = [...bannerUrls, ...galleryUrls];
    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const numSlides = bannerImages.length;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % numSlides);
    }, 10000);
    return () => clearInterval(timer);
  }, [bannerImages.length]);

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

  const [teamSlide, setTeamSlide] = useState(0);

  const MainContent = () => (
    <div className="min-h-screen bg-[#001a00]">
      <nav
        className={`fixed w-full z-50 transition-all duration-300 relative ${
          isScrolled ? "bg-[#233d36] shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-2 pt-4 pl-2 sm:pl-16">
              <img
                src="/images/logo/square-logo.png"
                alt="Logo"
                className="w-[110px] sm:w-[150px]"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="hidden lg:flex items-center gap-1 ml-auto font-archivo text-[#badad5] pr-4">
              <button
                onClick={() => scrollToSection("about")}
                className={`px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-medium ${
                  isScrolled ? "text-white" : "text-[#a6b6e0]"
                }`}
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className={`px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-medium ${
                  isScrolled ? "text-white" : "text-[#a6b6e0]"
                }`}
              >
                {t('nav.team')}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className={`px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-medium ${
                  isScrolled ? "text-white" : "text-[#a6b6e0]"
                }`}
              >
                {t('nav.services')}
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className={`px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-medium ${
                  isScrolled ? "text-white" : "text-[#a6b6e0]"
                }`}
              >
                {t('nav.gallery')}
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className={`px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-medium ${
                  isScrolled ? "text-white" : "text-[#a6b6e0]"
                }`}
              >
                {t('nav.testimonials')}
              </button>
              <Link
                to="/blog"
                className={`px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-medium ${
                  isScrolled ? "text-white" : "text-[#a6b6e0]"
                }`}
              >
                {t('nav.blog')}
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className={`px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-medium ${
                  isScrolled ? "text-white" : "text-[#a6b6e0]"
                }`}
              >
                {t('nav.contact')}
              </button>

              <div className="w-px h-5 bg-[#badad5]/30 mx-2" />

              <LanguageSwitcher />

              <button
                onClick={() => window.Calendly?.initPopupWidget({ url: 'https://calendly.com/georgiana17stanciu/30min' })}
                className="ml-2 px-4 py-1.5 text-[13px] rounded-lg bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Programează-te
              </button>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#a6b6e0] focus:outline-none p-2"
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

        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-[#001a00]/98 backdrop-blur-sm z-50 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#233d36]">
              <img
                src="/images/logo/square-logo.png"
                alt="Logo"
                className="w-[100px]"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#badad5] p-2 hover:bg-[#233d36] rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-1">
                <button
                  onClick={() => { scrollToSection("about"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-[#badad5] hover:bg-[#233d36]/50 transition-colors font-archivo text-lg font-medium"
                >
                  {t('nav.about')}
                </button>
                <button
                  onClick={() => { scrollToSection("team"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-[#badad5] hover:bg-[#233d36]/50 transition-colors font-archivo text-lg font-medium"
                >
                  {t('nav.team')}
                </button>
                <button
                  onClick={() => { scrollToSection("services"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-[#badad5] hover:bg-[#233d36]/50 transition-colors font-archivo text-lg font-medium"
                >
                  {t('nav.services')}
                </button>
                <button
                  onClick={() => { scrollToSection("gallery"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-[#badad5] hover:bg-[#233d36]/50 transition-colors font-archivo text-lg font-medium"
                >
                  {t('nav.gallery')}
                </button>
                <button
                  onClick={() => { scrollToSection("testimonials"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-[#badad5] hover:bg-[#233d36]/50 transition-colors font-archivo text-lg font-medium"
                >
                  {t('nav.testimonials')}
                </button>
                <Link
                  to="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-[#badad5] hover:bg-[#233d36]/50 transition-colors font-archivo text-lg font-medium"
                >
                  {t('nav.blog')}
                </Link>
                <button
                  onClick={() => { scrollToSection("contact"); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-[#badad5] hover:bg-[#233d36]/50 transition-colors font-archivo text-lg font-medium"
                >
                  {t('nav.contact')}
                </button>
              </div>
            </nav>

            {/* Footer */}
            <div className="px-6 py-6 border-t border-[#233d36] space-y-4">
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => {
                  window.Calendly?.initPopupWidget({ url: 'https://calendly.com/georgiana17stanciu/30min' });
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] py-4 rounded-xl font-archivo font-bold text-base transition-all duration-300 hover:shadow-xl shadow-lg flex items-center justify-center gap-2"
              >
                <CalendarIcon className="w-5 h-5" />
                Programează-te
              </button>
            </div>
          </div>
        )}
      </nav>

      <header className="mx-auto relative flex items-center justify-center overflow-hidden font-archivo px-4 sm:px-0 sm:container">
        <div className="w-full pt-10 sm:pt-0 sm:pb-16 pb-8 px-4 sm:px-0">
          <div className="relative h-[500px] sm:h-[638px] rounded-[24px] overflow-hidden shadow-xl">
            {bannerImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out will-change-opacity ${
                  currentSlide === index ? "opacity-100 z-20" : "opacity-0 z-10"
                }`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img
                  src={image.url}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover brightness-50 rounded-[24px]"
                  loading="eager"
                  decoding="async"
                />

                <div
                  className={`absolute inset-0 flex items-center justify-center text-center px-4 sm:px-8 z-30 transition-opacity duration-500 ${
                    currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="max-w-3xl">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-wide text-[#a6b6e0] leading-snug font-archivo">
                      {image.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl mb-6 tracking-wide text-[#a6b6e0] font-archivo">
                      {image.subtitle}
                    </p>
                    <div className="flex justify-center w-full mt-8 mb-4 sm:my-0">
                      <button
                        onClick={() => window.Calendly?.initPopupWidget({ url: 'https://calendly.com/georgiana17stanciu/30min' })}
                        className="sm:mt-[0px] text-center bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base tracking-wide transition-all duration-300 hover:shadow-xl hover:scale-105 shadow-lg font-archivo inline-flex items-center gap-2"
                      >
                        <CalendarIcon className="w-5 h-5" />
                        Programează-te
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="py-20 px-4 border-[#233d36] border-t-[1px] font-archivo overflow-hidden">
        <div className="w-full relative bg-[#001a00] overflow-hidden" id="about">
          <img
            src="/images/banner/TheLight.png"
            className="hidden sm:block absolute opacity-50 sm:opacity-100 left-0 top-[44%] sm:top-[80px] max-w-[190px] z-[-1]"
            loading="lazy"
            decoding="async"
          />
          <img
            src="/images/banner/RightLight.png"
            className="hidden sm:block absolute opacity-100 sm:opacity-100 sm:right-[0px] bottom-[0%] sm:top-[140px] max-w-[190px] z-[-1]"
            loading="lazy"
            decoding="async"
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-2 sm:px-0 mt-12 sm:mt-[75px] items-center">
              <div className="order-2 lg:order-1 lg:col-span-7 w-full">
                <div className="relative w-full max-w-[680px] mx-auto lg:mx-0 text-center lg:text-left px-2 sm:px-0">
                  <span className="font-archivo text-[#a6b6e0] text-[24px] sm:text-[35px] font-medium tracking-[0.1em] leading-[125%]">
                    {t('about.title')}
                  </span>
                  <h4 className="font-archivo text-[#a6b6e0] text-[28px] sm:text-[45px] font-medium tracking-[0.1em] mt-2 mb-6 sm:mb-10 leading-[125%] min-h-[1.5em]">
                    <TypeWriter
                      texts={[t('about.subtitle')]}
                      speed={50}
                      loop={false}
                    />
                  </h4>
                  <p className="font-archivo text-sm sm:text-base text-[#a6b6e0] font-medium tracking-[0.1em] leading-relaxed sm:leading-[160%] mt-4 sm:mt-6 mb-6 sm:mb-8">
                    {t('about.description')}
                  </p>

                  <div className="flex justify-center lg:justify-start">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="sm:mt-[40px] text-center bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base tracking-wide transition-all duration-300 hover:shadow-xl hover:scale-105 shadow-lg font-archivo"
                    >
                      {t('nav.enroll')}
                    </button>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-5 w-full flex justify-center lg:justify-end">
                <div
                  className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[495px] rounded-[20px] overflow-hidden shadow-[-10px_11px_35px_rgba(0,0,0,0.25)]"
                  style={{ aspectRatio: "4 / 4.4" }}
                >
                  <img
                    src="/images/banner/theSquare.jpg"
                    alt="Interior THE SQUARE"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001a00]/80 to-[#858585]/0 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Calendar />

      <section className="py-10 sm:py-20 px-4 border-[#233d36] border-t-[1px] font-archivo overflow-hidden">
        <div className="w-full relative bg-[#001a00] overflow-hidden" id="about">
          <img
            src="/images/banner/TheLight.png"
            className="hidden sm:block absolute  left-[30px] top-[80px] max-w-[190px] z-[-1]"
            loading="lazy"
            decoding="async"
          />
          <img
            src="/images/banner/RightLight.png"
            className="hidden sm:block absolute opacity-100 sm:opacity-100 sm:right-[0px] bottom-[0%] sm:top-[140px] max-w-[190px] z-[-1]"
            loading="lazy"
            decoding="async"
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-2 sm:px-0 mt-12 sm:mt-[75px] items-center">
              <div className="order-2 lg:order-1 lg:col-span-7 w-full">
                <div className="relative w-full max-w-[700px] mx-auto lg:mx-0 text-center lg:text-left px-2 sm:px-0">
                  <h4 className="font-archivo text-[#a6b6e0] text-[26px] sm:text-[52px] font-medium tracking-wide leading-[125%] mb-6 sm:mb-10 min-h-[1.5em]">
                    <TypeWriter
                      texts={[t('about.whyChess.title')]}
                      speed={50}
                      loop={false}
                    />
                  </h4>
                  <div className="font-archivo text-sm sm:text-base text-[#a6b6e0] font-medium tracking-[0.1em] leading-relaxed sm:leading-[160%] mt-4 sm:mt-6 mb-6 sm:mb-8 space-y-4 text-center lg:text-left">
                    <p>{t('about.whyChess.point1')}</p>
                    <p>{t('about.whyChess.point2')}</p>
                    <p>{t('about.whyChess.point3')}</p>
                    <p>{t('about.whyChess.point4')}</p>
                  </div>
                  <div className="flex justify-center lg:justify-start">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="sm:mt-[40px] text-center bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base tracking-wide transition-all duration-300 hover:shadow-xl hover:scale-105 shadow-lg font-archivo"
                    >
                      {t('nav.enroll')}
                    </button>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-5 w-full flex justify-center lg:justify-end">
                <div
                  className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[495px] rounded-[20px] overflow-hidden shadow-[-10px_11px_35px_rgba(0,0,0,0.25)]"
                  style={{ aspectRatio: "4 / 4.4" }}
                >
                  <img
                    src="/images/banner/chess-board.jpg"
                    alt="Tabla de șah la THE SQUARE"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001a00]/80 to-[#858585]/0 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Team
        currentSlide={teamSlide}
        setCurrentSlide={setTeamSlide}
        expandedDescriptions={expandedDescriptions}
        toggleDescription={toggleDescription}
      />

      <div
        className="w-full sm:pt-[109px] border-[#233d36] border-t-[1px] pt-[62px] sm:pb-[172px] pb-[68px] relative overflow-hidden"
        id="mission"
      >
        <div className="container mx-auto">
          <h2 className="sm:text-[40px] text-[24px] leading-[125%] tracking-[0.1em] font-medium font-archivo  text-[#a6b6e0] text-center sm:mt-[14px] mt-[7px] mx-auto">
            {t('mission.title')}
          </h2>

          <p className="text-[#a6b6e0] font-archivo font-medium leading-[125%] tracking-[0.1em] mx-auto max-w-[313px] sm:max-w-[544px] text-left sm:text-center sm:mt-[19px] mt-[21px]">
            {t('mission.description')}
          </p>
          <div className="flex justify-center w-full mt-8 mb-4 sm:my-0">
            <button
              onClick={() => scrollToSection("contact")}
              className="sm:mt-[40px] text-center bg-[#badad5] text-[#233d36] px-6 sm:px-8 py-3 rounded-full font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:bg-[#a6b6e0] hover:text-[#233d36] font-archivo"
            >
              {t('mission.chooseEducation')}
            </button>
          </div>

          <div className="grid sm:grid-cols-3 grid-cols-1 mt-[60px] sm:mt-[112px] relative">
            <hr className="border-[#badad5] border-b-[1px] absolute w-[65%] mx-auto left-0 right-0 top-[28px] z-[-1] hidden sm:block" />
            <div className="text-left">
              <div className="text-center">
                <img
                  src="/images/banner/chess-king-purple.svg"
                  className="w-auto h-[48.43px] sm:h-[64.58px] mx-auto bg-custom-black-900 px-[43px] "
                  loading="lazy"
                  decoding="async"
                />
                <h4 className="text-[#badad5] font-archivo font-medium uppercase leading-[125%] tracking-[0.1em] text-[24px] sm:text-[32px] mt-[18.57px] sm:mt-[24px]">
                  {t('mission.education.title')}
                </h4>
                <section className="mx-auto max-w-[313px] sm:max-w-[544px] text-left sm:text-center sm:mt-[36px] mt-[21px] text-[#a6b6e0] font-archivo font-medium leading-[125%] tracking-[0.1em]">
                  <p>
                    {t('mission.education.description')}
                  </p>
                </section>
              </div>
            </div>
            <div className="sm:hidden block w-[1px] h-[50px] mb-[22.14px] mt-[17px] bg-transparent mx-auto"></div>
            <div className="text-center">
              <div className="text-center">
                <img
                  src="/images/banner/chess-board-purple.svg"
                  className="w-auto h-[48.43px] sm:h-[64.58px] mx-auto bg-custom-black-900 px-[43px]"
                  loading="lazy"
                  decoding="async"
                />
                <h4 className="text-[#badad5] font-archivo font-medium uppercase leading-[125%] tracking-[0.1em] text-[24px] sm:text-[32px] mt-[18.57px] sm:mt-[24px]">
                  {t('mission.integrity.title')}
                </h4>
                <p className="text-[#a6b6e0] font-archivo font-medium leading-[125%] tracking-[0.1em] mx-auto max-w-[313px] sm:max-w-[500px] text-left sm:text-center sm:mt-[19px] mt-[21px]">
                  <section className="mx-auto max-w-[313px] sm:max-w-[544px] text-left sm:text-center sm:mt-[19px] mt-[21px] sm:p-4 text-[#a6b6e0] font-archivo font-medium leading-[125%] tracking-[0.1em]">
                    <p>
                      {t('mission.integrity.description')}
                    </p>
                  </section>
                </p>
              </div>
            </div>
            <div className="sm:hidden block w-[1px] h-[50px] mb-[22.14px] mt-[17px] bg-transparent mx-auto"></div>
            <div className="text-right">
              <div className="text-center">
                <img
                  src="/images/banner/chess-queen-purple.svg"
                  className="w-auto h-[48.43px] sm:h-[64.58px] mx-auto bg-custom-black-900 px-[43px]"
                  loading="lazy"
                  decoding="async"
                />
                <h4 className="text-[#badad5] font-archivo font-medium uppercase leading-[125%] tracking-[0.1em] text-[24px] sm:text-[32px] mt-[18.57px] sm:mt-[24px]">
                  {t('mission.community.title')}
                </h4>
                <section className="mx-auto max-w-[313px] sm:max-w-[544px] text-left sm:text-center sm:mt-[36px] mt-[21px] text-[#a6b6e0] font-archivo font-medium leading-[125%] tracking-[0.1em]">
                  <p>
                    {t('mission.community.description')}
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServicesSection />

      <section
        className="py-20 bg-[#001a00] border-t border-[#233d36]"
        id="gallery"
      >
        <div className="sm:container mx-auto px-4">
          <div className="max-w-[1420px] max-h-[1700px] mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 text-[#badad5] font-archivo min-h-[1.5em]">
              <TypeWriter
                texts={[t('gallery.title')]}
                speed={50}
                loop={false}
              />
            </h2>

            <div className="relative flex flex-col items-center justify-center">
              <div className="w-full overflow-hidden rounded-lg shadow-xl relative">
                <img
                  src={galleryImages[currentGalleryImage]}
                  alt={`Gallery image ${currentGalleryImage + 1}`}
                  className="w-full h-[400px] sm:h-[600px] object-cover transition-opacity duration-500 rounded-lg"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>

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

      <footer className="bg-[#001a00] border-t border-[#233d36]">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 pt-20 pb-4 sm:py-10 lg:px-8">
          <nav
            className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6 font-archivo tracking-wide"
            aria-label="Footer"
          >
            <Link
              to="/privacy-policy"
              className="text-[#a6b6e0] hover:text-[#badad5]"
            >
              {t('footer.privacy')}
            </Link>
            <Link
              to="/terms-and-conditions"
              className="text-[#a6b6e0] hover:text-[#badad5]"
            >
              {t('footer.terms')}
            </Link>
            <Link
              to="/cookie-policy"
              className="text-[#a6b6e0] hover:text-[#badad5]"
            >
              {t('footer.cookies')}
            </Link>
            <a href="#contact" className="text-[#a6b6e0] hover:text-[#badad5]">
              {t('nav.contact')}
            </a>
          </nav>
          <div className="mt-16 flex justify-center gap-x-10">
            <a
              href="https://www.facebook.com/profile.php?id=61556605701740"
              className="text-[#a6b6e0] hover:text-[#badad5]"
            >
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
            <a
              href="https://www.instagram.com/thesquare_chess/"
              className="text-[#a6b6e0] hover:text-[#badad5]"
            >
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
            <a
              href="https://wa.me/0742898793"
              className="text-[#a6b6e0] hover:text-[#badad5]"
            >
              <span className="sr-only">What'sApp</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 50 50"
                className="size-6"
                fill="currentColor"
              >
                <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 29.079097 3.1186875 32.88588 4.984375 36.208984 L 2.0371094 46.730469 A 1.0001 1.0001 0 0 0 3.2402344 47.970703 L 14.210938 45.251953 C 17.434629 46.972929 21.092591 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 21.278025 46 17.792121 45.029635 14.761719 43.333984 A 1.0001 1.0001 0 0 0 14.033203 43.236328 L 4.4257812 45.617188 L 7.0019531 36.425781 A 1.0001 1.0001 0 0 0 6.9023438 35.646484 C 5.0606869 32.523592 4 28.890107 4 25 C 4 13.390466 13.390466 4 25 4 z M 16.642578 13 C 16.001539 13 15.086045 13.23849 14.333984 14.048828 C 13.882268 14.535548 12 16.369511 12 19.59375 C 12 22.955271 14.331391 25.855848 14.613281 26.228516 L 14.615234 26.228516 L 14.615234 26.230469 C 14.588494 26.195329 14.973031 26.752191 15.486328 27.419922 C 15.999626 28.087653 16.717405 28.96464 17.619141 29.914062 C 19.422612 31.812909 21.958282 34.007419 25.105469 35.349609 C 26.554789 35.966779 27.698179 36.339417 28.564453 36.611328 C 30.169845 37.115426 31.632073 37.038799 32.730469 36.876953 C 33.55263 36.755876 34.456878 36.361114 35.351562 35.794922 C 36.246248 35.22873 37.12309 34.524722 37.509766 33.455078 C 37.786772 32.688244 37.927591 31.979598 37.978516 31.396484 C 38.003976 31.104927 38.007211 30.847602 37.988281 30.609375 C 37.969311 30.371148 37.989581 30.188664 37.767578 29.824219 C 37.302009 29.059804 36.774753 29.039853 36.224609 28.767578 C 35.918939 28.616297 35.048661 28.191329 34.175781 27.775391 C 33.303883 27.35992 32.54892 26.991953 32.083984 26.826172 C 31.790239 26.720488 31.431556 26.568352 30.914062 26.626953 C 30.396569 26.685553 29.88546 27.058933 29.587891 27.5 C 29.305837 27.918069 28.170387 29.258349 27.824219 29.652344 C 27.819619 29.649544 27.849659 29.663383 27.712891 29.595703 C 27.284761 29.383815 26.761157 29.203652 25.986328 28.794922 C 25.2115 28.386192 24.242255 27.782635 23.181641 26.847656 L 23.181641 26.845703 C 21.603029 25.455949 20.497272 23.711106 20.148438 23.125 C 20.171937 23.09704 20.145643 23.130901 20.195312 23.082031 L 20.197266 23.080078 C 20.553781 22.728924 20.869739 22.309521 21.136719 22.001953 C 21.515257 21.565866 21.68231 21.181437 21.863281 20.822266 C 22.223954 20.10644 22.02313 19.318742 21.814453 18.904297 L 21.814453 18.902344 C 21.828863 18.931014 21.701572 18.650157 21.564453 18.326172 C 21.426943 18.001263 21.251663 17.580039 21.064453 17.130859 C 20.690033 16.232501 20.272027 15.224912 20.023438 14.634766 L 20.023438 14.632812 C 19.730591 13.937684 19.334395 13.436908 18.816406 13.195312 C 18.298417 12.953717 17.840778 13.022402 17.822266 13.021484 L 17.820312 13.021484 C 17.450668 13.004432 17.045038 13 16.642578 13 z M 16.642578 15 C 17.028118 15 17.408214 15.004701 17.726562 15.019531 C 18.054056 15.035851 18.033687 15.037192 17.970703 15.007812 C 17.906713 14.977972 17.993533 14.968282 18.179688 15.410156 C 18.423098 15.98801 18.84317 16.999249 19.21875 17.900391 C 19.40654 18.350961 19.582292 18.773816 19.722656 19.105469 C 19.863021 19.437122 19.939077 19.622295 20.027344 19.798828 L 20.027344 19.800781 L 20.029297 19.802734 C 20.115837 19.973483 20.108185 19.864164 20.078125 19.923828 C 19.867096 20.342656 19.838461 20.445493 19.625 20.691406 C 19.29998 21.065838 18.968453 21.483404 18.792969 21.65625 C 18.639439 21.80707 18.36242 22.042032 18.189453 22.501953 C 18.016221 22.962578 18.097073 23.59457 18.375 24.066406 C 18.745032 24.6946 19.964406 26.679307 21.859375 28.347656 C 23.05276 29.399678 24.164563 30.095933 25.052734 30.564453 C 25.940906 31.032973 26.664301 31.306607 26.826172 31.386719 C 27.210549 31.576953 27.630655 31.72467 28.119141 31.666016 C 28.607627 31.607366 29.02878 31.310979 29.296875 31.007812 L 29.298828 31.005859 C 29.655629 30.601347 30.715848 29.390728 31.224609 28.644531 C 31.246169 28.652131 31.239109 28.646231 31.408203 28.707031 L 31.408203 28.708984 L 31.410156 28.708984 C 31.487356 28.736474 32.454286 29.169267 33.316406 29.580078 C 34.178526 29.990889 35.053561 30.417875 35.337891 30.558594 C 35.748225 30.761674 35.942113 30.893881 35.992188 30.894531 C 35.995572 30.982516 35.998992 31.07786 35.986328 31.222656 C 35.951258 31.624292 35.8439 32.180225 35.628906 32.775391 C 35.523582 33.066746 34.975018 33.667661 34.283203 34.105469 C 33.591388 34.543277 32.749338 34.852514 32.4375 34.898438 C 31.499896 35.036591 30.386672 35.087027 29.164062 34.703125 C 28.316336 34.437036 27.259305 34.092596 25.890625 33.509766 C 23.114812 32.325956 20.755591 30.311513 19.070312 28.537109 C 18.227674 27.649908 17.552562 26.824019 17.072266 26.199219 C 16.592866 25.575584 16.383528 25.251054 16.208984 25.021484 L 16.207031 25.019531 C 15.897202 24.609805 14 21.970851 14 19.59375 C 14 17.077989 15.168497 16.091436 15.800781 15.410156 C 16.132721 15.052495 16.495617 15 16.642578 15 z"></path>
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/company/105457314/admin/dashboard/"
              className="text-[#a6b6e0] hover:text-[#badad5]"
            >
              <span className="sr-only">Linkedin</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 50 50"
                className="size-6"
                fill="currentColor"
              >
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@thesquarechessstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a6b6e0] hover:text-[#badad5]"
            >
              <span className="sr-only">TikTok</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                className="size-6"
                fill="currentColor"
                viewBox="0 0 50 50"
              >
                <path d="M 9 4 C 6.2495759 4 4 6.2495759 4 9 L 4 41 C 4 43.750424 6.2495759 46 9 46 L 41 46 C 43.750424 46 46 43.750424 46 41 L 46 9 C 46 6.2495759 43.750424 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.671576 6 44 7.3284241 44 9 L 44 41 C 44 42.671576 42.671576 44 41 44 L 9 44 C 7.3284241 44 6 42.671576 6 41 L 6 9 C 6 7.3284241 7.3284241 6 9 6 z M 26.042969 10 A 1.0001 1.0001 0 0 0 25.042969 10.998047 C 25.042969 10.998047 25.031984 15.873262 25.021484 20.759766 C 25.016184 23.203017 25.009799 25.64879 25.005859 27.490234 C 25.001922 29.331679 25 30.496833 25 30.59375 C 25 32.409009 23.351421 33.892578 21.472656 33.892578 C 19.608867 33.892578 18.121094 32.402853 18.121094 30.539062 C 18.121094 28.675273 19.608867 27.1875 21.472656 27.1875 C 21.535796 27.1875 21.663054 27.208245 21.880859 27.234375 A 1.0001 1.0001 0 0 0 23 26.240234 L 23 22.039062 A 1.0001 1.0001 0 0 0 22.0625 21.041016 C 21.906673 21.031216 21.710581 21.011719 21.472656 21.011719 C 16.223131 21.011719 11.945313 25.289537 11.945312 30.539062 C 11.945312 35.788589 16.223131 40.066406 21.472656 40.066406 C 26.72204 40.066409 31 35.788588 31 30.539062 L 31 21.490234 C 32.454611 22.653646 34.267517 23.390625 36.269531 23.390625 C 36.542588 23.390625 36.802305 23.374442 37.050781 23.351562 A 1.0001 1.0001 0 0 0 37.958984 22.355469 L 37.958984 17.685547 A 1.0001 1.0001 0 0 0 37.03125 16.6875 C 33.886609 16.461891 31.379838 14.012216 31.052734 10.896484 A 1.0001 1.0001 0 0 0 30.058594 10 L 26.042969 10 z M 27.041016 12 L 29.322266 12 C 30.049047 15.2987 32.626734 17.814404 35.958984 18.445312 L 35.958984 21.310547 C 33.820114 21.201935 31.941489 20.134948 30.835938 18.453125 A 1.0001 1.0001 0 0 0 29 19.003906 L 29 30.539062 C 29 34.707538 25.641273 38.066406 21.472656 38.066406 C 17.304181 38.066406 13.945312 34.707538 13.945312 30.539062 C 13.945312 26.538539 17.066083 23.363182 21 23.107422 L 21 25.283203 C 18.286416 25.535721 16.121094 27.762246 16.121094 30.539062 C 16.121094 33.483274 18.528445 35.892578 21.472656 35.892578 C 24.401892 35.892578 27 33.586491 27 30.59375 C 27 30.64267 27.001859 29.335571 27.005859 27.494141 C 27.009759 25.65271 27.016224 23.20692 27.021484 20.763672 C 27.030884 16.376775 27.039186 12.849206 27.041016 12 z"></path>
              </svg>
            </a>
          </div>
          <p className="text-[#a6b6e0] tracking-[0.1em] font-archivo text-xs hover:text-[#badad5] mt-10 text-center sm:text-sm/6">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>
      <WhatsAppButton />
      <TawkToLanguage />
      <GlowCursor />
      <SnowEffect />
    </div>
  );

  // Loading fallback for lazy loaded pages
  const PageLoader = () => (
    <div className="min-h-screen bg-[#001a00] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#badad5]/30 border-t-[#badad5] rounded-full animate-spin" />
        <span className="text-[#badad5] font-archivo">Loading...</span>
      </div>
    </div>
  );

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/" element={<MainContent />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
