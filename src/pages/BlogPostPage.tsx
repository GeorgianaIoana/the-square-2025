import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, User, ArrowLeft, BookOpen, Clock } from "lucide-react";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { blogPosts } from "../data/blogPosts";
import { useLanguage } from "../contexts/LanguageContext";

export default function BlogPostPage() {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const post = blogPosts.find((p) => p.id === parseInt(id || "0"));

  const scrollToSection = (sectionId: string) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
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
    }, 100);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#001a00] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#badad5] font-archivo mb-4">
            Articolul nu a fost găsit
          </h1>
          <Link
            to="/blog"
            className="text-[#a6b6e0] hover:text-[#badad5] font-archivo"
          >
            {t('blog.backToBlogShort')}
          </Link>
        </div>
      </div>
    );
  }

  const formatContent = (content: string) => {
    const lines = content.split("\n");
    const formatted: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];
    let inList = false;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith("# ")) {
        if (currentParagraph.length > 0) {
          formatted.push(
            <p key={`p-${index}`} className="mb-6 text-[#a6b6e0] font-archivo leading-relaxed">
              {currentParagraph.join(" ")}
            </p>
          );
          currentParagraph = [];
        }
        if (inList && listItems.length > 0) {
          formatted.push(
            <ol key={`ol-${index}`} className="list-decimal list-inside space-y-3 mb-6 text-[#a6b6e0] font-archivo ml-4">
              {listItems.map((item, i) => (
                <li key={i} className="mb-3 leading-relaxed">
                  {item}
                </li>
              ))}
            </ol>
          );
          listItems = [];
          inList = false;
        }
        formatted.push(
          <h2 key={`h2-${index}`} className="text-3xl sm:text-4xl font-bold text-[#badad5] font-archivo mb-6 mt-10 first:mt-0">
            {trimmedLine.replace(/^# /, "")}
          </h2>
        );
      } else if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
        if (currentParagraph.length > 0) {
          formatted.push(
            <p key={`p-${index}`} className="mb-6 text-[#a6b6e0] font-archivo leading-relaxed">
              {currentParagraph.join(" ")}
            </p>
          );
          currentParagraph = [];
        }
        if (inList && listItems.length > 0) {
          formatted.push(
            <ol key={`ol-${index}`} className="list-decimal list-inside space-y-3 mb-6 text-[#a6b6e0] font-archivo ml-4">
              {listItems.map((item, i) => (
                <li key={i} className="mb-3 leading-relaxed">
                  {item}
                </li>
              ))}
            </ol>
          );
          listItems = [];
          inList = false;
        }
        formatted.push(
          <p key={`bold-${index}`} className="text-lg text-[#badad5] font-archivo mb-6 font-semibold">
            {trimmedLine.replace(/\*\*/g, "")}
          </p>
        );
      } else if (trimmedLine.startsWith("### ")) {
        if (currentParagraph.length > 0) {
          formatted.push(
            <p key={`p-${index}`} className="mb-6 text-[#a6b6e0] font-archivo leading-relaxed">
              {currentParagraph.join(" ")}
            </p>
          );
          currentParagraph = [];
        }
        if (inList && listItems.length > 0) {
          formatted.push(
            <ol key={`ol-${index}`} className="list-decimal list-inside space-y-3 mb-6 text-[#a6b6e0] font-archivo ml-4">
              {listItems.map((item, i) => (
                <li key={i} className="mb-3 leading-relaxed">
                  {item}
                </li>
              ))}
            </ol>
          );
          listItems = [];
          inList = false;
        }
        formatted.push(
          <h3 key={`h3-${index}`} className="text-2xl sm:text-3xl font-bold text-[#badad5] font-archivo mb-6 mt-10">
            {trimmedLine.replace(/^### /, "")}
          </h3>
        );
      } else if (/^\d+\./.test(trimmedLine)) {
        if (currentParagraph.length > 0) {
          formatted.push(
            <p key={`p-${index}`} className="mb-6 text-[#a6b6e0] font-archivo leading-relaxed">
              {currentParagraph.join(" ")}
            </p>
          );
          currentParagraph = [];
        }
        if (!inList) {
          inList = true;
        }
        const listItem = trimmedLine.replace(/^\d+\.\s*/, "");
        listItems.push(listItem);
      } else if (trimmedLine === "") {
        if (currentParagraph.length > 0) {
          formatted.push(
            <p key={`p-${index}`} className="mb-6 text-[#a6b6e0] font-archivo leading-relaxed">
              {currentParagraph.join(" ")}
            </p>
          );
          currentParagraph = [];
        }
        if (inList && listItems.length > 0) {
          formatted.push(
            <ol key={`ol-${index}`} className="list-decimal list-inside space-y-3 mb-6 text-[#a6b6e0] font-archivo ml-4">
              {listItems.map((item, i) => (
                <li key={i} className="mb-3 leading-relaxed">
                  {item}
                </li>
              ))}
            </ol>
          );
          listItems = [];
          inList = false;
        }
      } else if (trimmedLine !== "") {
        if (inList && listItems.length > 0) {
          formatted.push(
            <ol key={`ol-${index}`} className="list-decimal list-inside space-y-3 mb-6 text-[#a6b6e0] font-archivo ml-4">
              {listItems.map((item, i) => (
                <li key={i} className="mb-3 leading-relaxed">
                  {item}
                </li>
              ))}
            </ol>
          );
          listItems = [];
          inList = false;
        }
        currentParagraph.push(trimmedLine);
      }
    });

    if (currentParagraph.length > 0) {
      formatted.push(
        <p key="p-final" className="mb-6 text-[#a6b6e0] font-archivo leading-relaxed">
          {currentParagraph.join(" ")}
        </p>
      );
    }

    if (inList && listItems.length > 0) {
      formatted.push(
        <ol key="ol-final" className="list-decimal list-inside space-y-3 mb-6 text-[#a6b6e0] font-archivo ml-4">
          {listItems.map((item, i) => (
            <li key={i} className="mb-3 leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      );
    }

    return formatted;
  };

  return (
    <div className="min-h-screen bg-[#001a00]">
      <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-[#233d36] shadow-lg">
        <div className="mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-2">
            <Link to="/" className="flex items-center space-x-2 pt-4 pl-2 sm:pl-16">
              <img
                src="/images/logo/square-logo.png"
                alt="Logo"
                className="w-[110px] sm:w-[150px]"
                loading="eager"
                decoding="async"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-4 ml-auto font-archivo tracking-[0.1em] text-[#badad5] text-right sm:pr-[40px]">
              <LanguageSwitcher />
              <button
                onClick={() => scrollToSection("about")}
                className="px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5] hover:text-[#233d36] font-semibold text-white"
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className="px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5] hover:text-[#233d36] font-semibold text-white"
              >
                {t('nav.team')}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5] hover:text-[#233d36] font-semibold text-white"
              >
                {t('nav.services')}
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5] hover:text-[#233d36] font-semibold text-white"
              >
                {t('nav.gallery')}
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5] hover:text-[#233d36] font-semibold text-white"
              >
                {t('nav.testimonials')}
              </button>
              <Link
                to="/blog"
                className="px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5] hover:text-[#233d36] font-semibold text-white"
              >
                {t('nav.blog')}
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:bg-[#badad5] hover:text-[#233d36] font-semibold text-white"
              >
                {t('nav.contact')}
              </button>
            </div>

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

        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-[#233d36] bg-opacity-90 z-50 px-4 pt-24 pb-10">
            <div className="flex justify-end mb-6">
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
              {t('nav.about')}
            </button>
            <button
              onClick={() => {
                scrollToSection("team");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-[#badad5] transition font-archivo tracking-wide font-bold"
            >
              {t('nav.team')}
            </button>
            <button
              onClick={() => {
                scrollToSection("services");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-[#badad5] transition font-archivo tracking-wide font-bold"
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => {
                scrollToSection("gallery");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-[#badad5] transition font-archivo tracking-wide font-bold"
            >
              {t('nav.gallery')}
            </button>
            <button
              onClick={() => {
                scrollToSection("testimonials");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-[#badad5] transition font-archivo tracking-wide font-bold"
            >
              {t('nav.testimonials')}
            </button>
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left px-4 py-2 rounded-lg text-[#badad5] transition font-archivo tracking-wide font-bold"
            >
              {t('nav.blog')}
            </Link>
            <button
              onClick={() => {
                scrollToSection("contact");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg text-[#badad5] transition font-archivo tracking-wide font-bold"
            >
              {t('nav.contact')}
            </button>
            <div className="flex justify-center items-center gap-4 mt-4">
              <LanguageSwitcher />
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => {
                  scrollToSection("contact");
                  setMobileMenuOpen(false);
                }}
                className="bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] px-8 py-3 rounded-xl font-archivo font-bold text-base tracking-wide transition-all duration-300 hover:shadow-xl hover:scale-105 shadow-lg"
              >
                {t('nav.enroll')}
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="pt-24 sm:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#a6b6e0] hover:text-[#badad5] font-archivo mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('blog.backToBlogShort')}
            </Link>

            <article className="bg-gradient-to-br from-[#233d36]/90 to-[#1a2d28]/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-[#233d36]">
              {post.image ? (
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                  <img
                    src={`/${post.image}`}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      console.error("Image failed to load:", post.image);
                      e.currentTarget.src = post.image;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#233d36]/90 via-transparent to-transparent"></div>
                </div>
              ) : null}
              <div className="p-8 sm:p-12">
              <div className="mb-6 flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#badad5]/20 backdrop-blur-sm border border-[#badad5]/30 text-[#badad5] rounded-full text-xs font-semibold font-archivo">
                  {post.category}
                </span>
                <span className="text-[#a6b6e0]/60 text-xs font-archivo flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#badad5] font-archivo mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#233d36]">
                <div className="w-12 h-12 rounded-full bg-[#badad5]/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-[#badad5]" />
                </div>
                <div>
                  <p className="font-semibold text-[#badad5] font-archivo">{post.author}</p>
                  <p className="text-[#a6b6e0]/70 text-sm font-archivo flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </p>
                </div>
              </div>

              <div className="max-w-none">
                <div className="text-[#a6b6e0] font-archivo leading-relaxed text-base sm:text-lg">
                  {formatContent(post.content)}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-[#233d36]">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] rounded-xl font-archivo font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 shadow-lg"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('blog.backToBlog')}
                </Link>
              </div>
              </div>
            </article>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
