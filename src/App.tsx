import React, { useState, useEffect, useCallback } from "react";
import ServicesSection from "./components/ServicesSection";
import Calendar from "./components/Calendar";
import Contact from "./components/Contact";
import Team from "./components/Team";
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
import type { Swiper as SwiperRef } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css";
import Testimonial from "./components/Testimonial";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import TermsAndConditions from "./pages/TermsAndConditions";

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

  const MAX_CHARACTERS = 900; // aproximativ 15 rânduri

  const bannerImages = [
    {
      url: "/images/banner/theSquare.jpg",
      title: "Antrenează-te cu profesioniști",
      subtitle: "Optimizează fiecare lecție!",
    },
    {
      url: "/images/banner/1.jpg",
      title: "Depășește-ți limitele",
      subtitle: "Setăm împreună obiectivele tale și le îndeplinim!",
    },
    {
      url: "/images/banner/2.jpg",
      title: "Mutările inspirate încep la clubul THE SQUARE",
    },
  ];

  const galleryImages = [
    // "/images/gallery/square-room.jpg",
    "/images/gallery/kids.jpg",
    "/images/gallery/happy-people.jpg",
    "/images/gallery/chess-camp-calin.jpg",
    "/images/gallery/chess-camp-vlad.jpg",
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

  function handleSlideChange(swiper: SwiperRef): void {
    throw new Error("Function not implemented.");
  }

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
              <button
                onClick={() => scrollToSection("about")}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5] hover:text-[#233d36] ${
                  isScrolled ? "text-white" : "text-[#a6b6e0]"
                }`}
              >
                Despre noi
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5] hover:text-[#233d36] ${
                  isScrolled ? "text-white" : "text-[#a6b6e0]"
                }`}
              >
                Echipa
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5] hover:text-[#233d36] ${
                  isScrolled ? "text-white" : "text-[#a6b6e0]"
                }`}
              >
                Cursuri de șah
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5] hover:text-[#233d36] ${
                  isScrolled ? "text-white" : "text-[#a6b6e0]"
                }`}
              >
                Galerie
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5] hover:text-[#233d36] ${
                  isScrolled ? "text-white" : "text-[#a6b6e0]"
                }`}
              >
                Testimoniale
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5] hover:text-[#233d36] ${
                  isScrolled ? "text-white" : "text-[#a6b6e0]"
                }`}
              >
                Contact
              </button>
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
            <button
              onClick={() => {
                scrollToSection("about");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-[#badad5] transition font-archivo tracking-wide font-bold"
            >
              Despre noi
            </button>
            <button
              onClick={() => {
                scrollToSection("team");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-[#badad5] transition font-archivo tracking-wide font-bold"
            >
              Echipa
            </button>
            <button
              onClick={() => {
                scrollToSection("services");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-[#badad5] transition font-archivo tracking-wide font-bold"
            >
              Cursuri de șah
            </button>
            <button
              onClick={() => {
                scrollToSection("gallery");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-[#badad5] transition font-archivo tracking-wide font-bold"
            >
              Galerie
            </button>
            <button
              onClick={() => {
                scrollToSection("testimonials");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-[#badad5] transition font-archivo tracking-wide font-bold"
            >
              Testimoniale
            </button>
            <button
              onClick={() => {
                scrollToSection("contact");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-[#badad5] transition font-archivo tracking-wide font-bold"
            >
              Contact
            </button>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => {
                  scrollToSection("contact");
                  setMobileMenuOpen(false);
                }}
                className="bg-[#badad5] text-[#233d36] px-8 py-3 rounded-full font-archivo font-semibold text-base tracking-wide transition-all duration-300 hover:bg-[#a6b6e0] hover:text-[#233d36] shadow-lg"
              >
                Înscrie-te la primul tău curs!
              </button>
            </div>
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
                  currentSlide === index ? "opacity-100 z-20" : "opacity-0 z-10"
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
                      <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-wide text-[#a6b6e0] leading-snug font-archivo">
                        {image.title}
                      </h1>
                      <p className="text-base sm:text-lg md:text-xl mb-6 tracking-wide text-[#a6b6e0] font-archivo">
                        {image.subtitle}
                      </p>
                      <div className="flex justify-center w-full mt-8 mb-4 sm:my-0">
                        <button
                          onClick={() => scrollToSection("contact")}
                          className="sm:mt-[0px] text-center bg-[#badad5] text-[#233d36] px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base tracking-wide transition-all duration-300 hover:bg-[#a6b6e0] hover:text-[#233d36] font-archivo"
                        >
                          Înscrie-te la primul tău curs!
                        </button>
                      </div>
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
                  <span className="font-archivo text-center flex justify-center text-[#a6b6e0] text-[24px] font-medium tracking-[0.1em] sm:text-[35px] leading-[125%]">
                    Despre
                  </span>
                  <h4 className="font-archivo text-center text-[#a6b6e0] text-[24px] font-medium tracking-[0.1em] sm:text-[45px]  mb-[20px] sm:mb-[40px] leading-[125%]">
                    THE SQUARE
                  </h4>
                  <p className="font-archivo text-sm sm:text-[16px] text-[#a6b6e0] font-medium sm:px-0 tracking-[0.1em] leading-[125%] mt-[13px] sm:mt-[24px] mb-[20px] sm:mb-[10px]  max-w-[320px] sm:max-w-[665px]">
                    Clubul de Șah THE SQUARE este spațiul în care pasiunea
                    pentru șah capătă formă, indiferent de vârstă sau nivel de
                    experiență. Fondat din dorința de a promova gândirea
                    strategică, disciplina și spiritul de comunitate, clubul
                    nostru a devenit un punct de întâlnire pentru toți cei care
                    vor să se dezvolte prin șah. Suntem o echipă de antrenori
                    dedicați, convinși de puterea șahului de a educa, motiva și
                    aduce oamenii împreună. Organizăm cursuri pentru copii și
                    adulți, competiții, pregătiri pentru turnee și evenimente
                    interactive care încurajează învățarea și socializarea. Te
                    ajutăm să îți setezi obiective și să le atingi într-un
                    spațiu primitor și prietenos.
                  </p>

                  <div className="flex justify-center w-full mt-8 mb-4 sm:my-0">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="sm:mt-[40px] text-center bg-[#badad5] text-[#233d36] px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base tracking-wide transition-all duration-300 hover:bg-[#a6b6e0] hover:text-[#233d36] font-archivo"
                    >
                      Înscrie-te la primul tău curs!
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 relative mb-[66px] sm:mb-[95px] rounded-[20px] mx-auto inline-block">
                <div className="relative w-full h-full shadow-[-10px_11px_35px_rgba(0,0,0,0.25)] rounded-[20px]">
                  <img
                    src="/images/banner/theSquare.jpg"
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

      <section className="py-10 sm:py-20 px-4  border-[#233d36] border-t-[1px] font-archivo">
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
                  <h4 className="font-archivo text-center text-[#a6b6e0] text-[24px] font-medium sm:tracking-[0.1em] sm:text-[52px] leading-[125%] mb-[20px] sm:mb-[40px]">
                    Beneficiile Șahului
                  </h4>
                  <p className="font-archivo sm:text-[16px] text-[#a6b6e0] text-left font-medium sm:px-0 tracking-[0.1em] leading-[125%] mt-[13px] sm:mt-[24px] mb-[20px] sm:mb-[10px] text-[12px] sm:text-[14px] max-w-[320px] sm:max-w-[665px]">
                    <p className="sm:text-[16px] text-sm font-archivo tracking-[0.1em] leading-[125%]">
                      ■ Concentrare și prezență. Fiecare partidă de șah este o
                      oportunitate de a cultiva răbdarea.{" "}
                    </p>
                    <p className="sm:text-[16px] text-sm font-archivo tracking-[0.1em] leading-[125%]">
                      ■ Gândire strategică. Îți dezvolți capacitatea de a
                      anticipa mutări și a lua decizii strategice atât pe tabla
                      de șah, cât și în viață.
                    </p>
                    <p className="sm:text-[16px] text-sm font-archivo tracking-[0.1em] leading-[125%]">
                      {" "}
                      ■ Evoluezi continuu, în ritmul tău. La THE SQUARE ne
                      ghidează bucuria. Apreciem fiecare pas către progres.
                      Crești cu răbdare, poți să te bucuri de proces și să îți
                      cultivi încrederea în forțele proprii.{" "}
                    </p>
                    <p className="sm:text-[16px] text-sm font-archivo tracking-[0.1em] leading-[125%]">
                      ■ Faci parte dintr-o comunitate prietenoasă, cu valori
                      comune. La THE SQUARE, jucători începători și avansați se
                      întâlnesc, se provoacă, se susțin. Fie că vii pentru
                      socializare, învățare sau competiție, lumea THE SQUARE îți
                      este deschisă.
                    </p>
                  </p>

                  <div className="flex justify-center w-full mt-8 mb-4 sm:my-0">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="sm:mt-[40px] text-center bg-[#badad5] text-[#233d36] px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base tracking-wide transition-all duration-300 hover:bg-[#a6b6e0] hover:text-[#233d36] font-archivo"
                    >
                      Înscrie-te la primul tău curs!
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 relative mb-[66px] sm:mb-[95px] rounded-[20px] mx-auto inline-block">
                <div className="relative w-full h-full shadow-[-10px_11px_35px_rgba(0,0,0,0.25)] rounded-[20px]">
                  <img
                    src="/images/banner/chess-board.jpg"
                    className="w-[322px] h-[338px] sm:w-[495px] sm:h-[469px] rounded-[20px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001a00]/80 to-[#858585]/0 rounded-[17px] opacity-[0.8]"></div>
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
            MISIUNEA NOASTRĂ
          </h2>

          <p className="text-[#a6b6e0] font-archivo font-medium leading-[125%] tracking-[0.1em] mx-auto max-w-[313px] sm:max-w-[544px] text-left sm:text-center sm:mt-[19px] mt-[21px]">
            Într-o lume tot mai digitală, care se mișcă în pas alert, THE SQUARE
            dorește să ofere prin șah un context în care timpul încetinește
            pentru câteva momente, un loc în care răbdarea și strategia se
            cultivă mutare cu mutare, alături de antrenori dedicați.
          </p>
          <div className="flex justify-center w-full mt-8 mb-4 sm:my-0">
            <button
              onClick={() => scrollToSection("contact")}
              className="sm:mt-[40px] text-center bg-[#badad5] text-[#233d36] px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base tracking-wide transition-all duration-300 hover:bg-[#a6b6e0] hover:text-[#233d36] font-archivo"
            >
              Alege educația!
            </button>
          </div>

          <div className="grid sm:grid-cols-3 grid-cols-1 mt-[60px] sm:mt-[112px] relative">
            <hr className="border-[#badad5] border-b-[1px] absolute w-[65%] mx-auto left-0 right-0 top-[28px] z-[-1] hidden sm:block" />
            <div className="text-left">
              <div className="text-center">
                <img
                  src="/images/banner/chess-king-purple.svg"
                  className="w-auto h-[48.43px] sm:h-[64.58px] mx-auto bg-custom-black-900 px-[43px] "
                />
                <h4 className="text-[#badad5] font-archivo font-medium uppercase leading-[125%] tracking-[0.1em] text-[24px] sm:text-[32px] mt-[18.57px] sm:mt-[24px]">
                  EDUCAȚIE
                </h4>
                <section className="mx-auto max-w-[313px] sm:max-w-[544px] text-left sm:text-center sm:mt-[36px] mt-[21px] text-[#a6b6e0] font-archivo font-medium leading-[125%] tracking-[0.1em]">
                  <p>
                    {" "}
                    La THE SQUARE, fiecare lecție începe cu teorie solidă: 30-50
                    de minute dedicate deschiderilor, unde cursanții învață să
                    construiască planuri clare și capătă încredere în jocul de
                    mijloc. Urmează exerciții tactice sau finaluri explicate pas
                    cu pas, care dezvoltă gândirea logică și calculul matematic.
                    Apoi, în cele 30 de minute de practică, aplică noțiunile
                    învățate în partide reale, antrenându-și concentrarea și
                    inteligența emoțională.
                  </p>{" "}
                  {/* <p>
                    Vă invităm să susțineți lecțiile și turneele de șah
                    desfășurate la Clubul de Șah <strong>THE SQUARE</strong>{" "}
                    astfel:
                    <ul>
                      <li>
                        1. Prin încheierea unui{" "}
                        <strong>contract de sponsorizare</strong> – dedicat
                        persoanelor juridice, pe care îl puteți descărca{" "}
                        <a
                          href="https://static.anaf.ro/static/10/Anaf/formulare/177_OPANAF_1679_2022.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#badad5] hover:text-[#a6b6e0]"
                        >
                          <strong>aici.</strong>
                        </a>
                      </li>
                      <li>
                        2. Prin redirecționarea a{" "}
                        <strong>3,5% din impozitul pe venit</strong> – opțiune
                        valabilă pentru persoanele fizice
                      </li>
                    </ul>
                    Sumele acestea sunt deduse direct din impozitul pe profit,
                    pe care oricum îl datorați statului.
                  </p> */}
                </section>
              </div>
            </div>
            <div className="sm:hidden block w-[1px] h-[50px] mb-[22.14px] mt-[17px] bg-transparent mx-auto"></div>
            <div className="text-center">
              <div className="text-center">
                <img
                  src="/images/banner/chess-board-purple.svg"
                  className="w-auto h-[48.43px] sm:h-[64.58px] mx-auto bg-custom-black-900 px-[43px]"
                />
                <h4 className="text-[#badad5] font-archivo font-medium uppercase leading-[125%] tracking-[0.1em] text-[24px] sm:text-[32px] mt-[18.57px] sm:mt-[24px]">
                  INTEGRITATE
                </h4>
                <p className="text-[#a6b6e0] font-archivo font-medium leading-[125%] tracking-[0.1em] mx-auto max-w-[313px] sm:max-w-[500px] text-left sm:text-center sm:mt-[19px] mt-[21px]">
                  <section className="mx-auto max-w-[313px] sm:max-w-[544px] text-left sm:text-center sm:mt-[19px] mt-[21px] sm:p-4 text-[#a6b6e0] font-archivo font-medium leading-[125%] tracking-[0.1em]">
                    {/* <p>
                      Fondurile obținute vor fi folosite pentru:
                      <ul>
                        <li>
                          Participarea cursanților împreună cu antrenorii, la
                          competițiile naționale și internaționale
                        </li>
                        <li>
                          Achiziționarea de echipamente și materiale sportive
                          necesare desfășurării activităților
                        </li>
                      </ul>
                      Vă rugăm să ne trimiteți contractul semnat și ștampilat,
                      în format pdf, la adresa de e-mail:{" "}
                      <strong>contact@thesquarechess.com</strong>
                    </p> */}
                    <p>
                      Integritatea este fundamentul fiecărei decizii pe tabla de
                      șah și în viață. Într-un mediu în care onestitatea,
                      respectul pentru reguli și fair-play-ul sunt valori de
                      bază. A câștiga cu demnitate și a pierde cu grație sunt
                      lecții esențiale care se deprind din practica fiecarei
                      partide de șah.
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
                />
                <h4 className="text-[#badad5] font-archivo font-medium uppercase leading-[125%] tracking-[0.1em] text-[24px] sm:text-[32px] mt-[18.57px] sm:mt-[24px]">
                  COMUNITATE
                </h4>
                <section className="mx-auto max-w-[313px] sm:max-w-[544px] text-left sm:text-center sm:mt-[36px] mt-[21px] text-[#a6b6e0] font-archivo font-medium leading-[125%] tracking-[0.1em]">
                  {/* <p>
                    <strong>Pentru persoanele fizice</strong> — dacă dorești să
                    redirecționezi 3,5% din impozitul tău anual pe venit
                    <ul>
                      <li>
                        Completează formularul nostru de contact și vom reveni
                        imediat către tine cu toate detaliile necesare.
                      </li>
                    </ul>
                    În plus, poți contribui la organizarea workshop-urilor
                    noastre și a tunreelor noastre, prin susținerea lor
                    financiară, devenind astfel partener al acestor evenimente
                    importante pentru comunitate.
                  </p> */}
                  <p>
                    Comunitatea THE SQUARE reunește pasionații de șah în
                    evenimente unde jocul, socializarea și momentele plăcute
                    sunt adesea însoțite de ceai. Suntem deschiși să primim
                    voluntari pasionați, dornici să contribuie la inițiative
                    caritabile sau să susțină workshop-uri educative. Astfel,
                    prin educație strategică, contribuim împreună la o lume mai
                    bună.
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
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 text-[#badad5] font-archivo">
              Galerie
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

      <footer className="bg-[#001a00] border-t border-[#233d36]">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-10 lg:px-8">
          <nav
            className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6 font-archivo tracking-wide"
            aria-label="Footer"
          >
            <Link
              to="/privacy-policy"
              className="text-[#a6b6e0] hover:text-[#badad5]"
            >
              Politica de Confidențialitate
            </Link>
            <Link
              to="/terms-and-conditions"
              className="text-[#a6b6e0] hover:text-[#badad5]"
            >
              Termeni și Condiții
            </Link>
            <Link
              to="/cookie-policy"
              className="text-[#a6b6e0] hover:text-[#badad5]"
            >
              Politica Cookie
            </Link>
            <a href="#contact" className="text-[#a6b6e0] hover:text-[#badad5]">
              Contact
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
                width="100"
                height="100"
                viewBox="0 0 50 50"
                className="size-6"
                fill="currentColor"
              >
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
              </svg>
            </a>
            <a href="#" className="text-[#a6b6e0] hover:text-[#badad5]">
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
            &copy; 2025 THE SQUARE. Developed by THE SQUARE.
          </p>
        </div>
      </footer>
      <a
        href="https://wa.me/0742898793"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-[0_4px_12px_rgba(0,0,0,0.3)] border-2 border-white/20 hover:border-white/40 transition-all duration-300"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6 drop-shadow-sm"
        >
          <path d="M20.52 3.478a11.81 11.81 0 0 0-16.69 0 11.81 11.81 0 0 0-2.48 13.06L.34 23.49l7.14-1.88a11.81 11.81 0 0 0 5.55 1.42h.01c3.14 0 6.09-1.22 8.31-3.44a11.81 11.81 0 0 0 0-16.69zm-8.41 17.5a10.23 10.23 0 0 1-5.2-1.44l-.37-.22-4.25 1.12 1.13-4.14-.24-.38a10.3 10.3 0 0 1 1.52-12.57 10.28 10.28 0 0 1 14.53 0 10.27 10.27 0 0 1-7.12 17.63zm5.63-7.78c-.3-.15-1.77-.87-2.05-.97s-.48-.15-.68.15-.78.97-.96 1.18-.35.22-.65.07a8.32 8.32 0 0 1-2.47-1.53 9.33 9.33 0 0 1-1.7-2.12c-.17-.3-.02-.47.13-.62.13-.13.3-.35.45-.53s.2-.3.3-.5a.54.54 0 0 0-.02-.52c-.08-.15-.68-1.65-.93-2.27-.24-.57-.49-.5-.68-.5h-.58c-.2 0-.52.07-.8.35s-1.05 1.02-1.05 2.5 1.07 2.9 1.22 3.1a11.77 11.77 0 0 0 4.65 4.23c.65.28 1.17.45 1.57.57.66.21 1.25.18 1.72.1.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.2.16-1.31-.06-.11-.26-.18-.55-.32z" />
        </svg>
      </a>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/" element={<MainContent />} />
      </Routes>
    </Router>
  );
}

export default App;
