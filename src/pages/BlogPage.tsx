import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, User, ArrowRight, BookOpen, Clock, Sparkles } from "lucide-react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { blogPosts } from "../data/blogPosts";
import { useLanguage } from "../contexts/LanguageContext";

const NEWSLETTER_ACCESS_KEY = "9e26e303-368c-44fc-86ac-7e427470a472";

export default function BlogPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const currentBlogPosts = [...(blogPosts[language] || blogPosts.ro)].sort((a, b) => a.id - b.id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  // SEO Meta Tags
  useEffect(() => {
    const title = language === 'ro'
      ? 'Blog Șah - Articole, Strategii și Sfaturi | THE SQUARE București'
      : 'Chess Blog - Articles, Strategies & Tips | THE SQUARE Bucharest';
    const description = language === 'ro'
      ? 'Descoperă articole despre șah, strategii de joc, sfaturi pentru începători și avansați. Blog educațional de la antrenorii THE SQUARE București.'
      : 'Discover chess articles, game strategies, tips for beginners and advanced players. Educational blog from THE SQUARE Bucharest trainers.';

    document.title = title;

    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', 'https://thesquare.ro/blog');

    // Cleanup - restore default title on unmount
    return () => {
      document.title = 'THE SQUARE - Cursuri de Șah București | Club Șah Copii și Adulți';
    };
  }, [language]);

  const scrollToSection = (id: string) => {
    navigate("/");
    setTimeout(() => {
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
    }, 100);
  };

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmittingNewsletter || !newsletterEmail.trim()) return;

    setIsSubmittingNewsletter(true);
    setNewsletterStatus(t('blog.newsletter.submitting'));

    const formData = new FormData();
    formData.set("access_key", NEWSLETTER_ACCESS_KEY);
    formData.set("email", newsletterEmail.trim());
    formData.set("subject", "Abonare Newsletter - THE SQUARE Chess Club");
    formData.set("from_name", "Newsletter Form");
    formData.set("message", `Utilizatorul ${newsletterEmail.trim()} dorește să se aboneze la newsletter.`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setNewsletterStatus(t('blog.newsletter.success'));
        setNewsletterEmail("");
        setTimeout(() => {
          setNewsletterStatus(null);
        }, 8000);
      } else {
        console.error("Error", data);
        setNewsletterStatus("A apărut o problemă. Încearcă din nou.");
        setTimeout(() => {
          setNewsletterStatus(null);
        }, 5000);
      }
    } catch (error) {
      console.error("Network error", error);
      setNewsletterStatus("A apărut o problemă de rețea. Încearcă din nou.");
      setTimeout(() => {
        setNewsletterStatus(null);
      }, 5000);
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001a00]">
      <nav className="fixed w-full z-50 bg-[#233d36] shadow-lg">
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

            <div className="hidden lg:flex items-center gap-1 ml-auto font-archivo text-[#badad5] pr-4">
              <button
                onClick={() => scrollToSection("about")}
                className="px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-medium text-white"
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className="px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-medium text-white"
              >
                {t('nav.team')}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-medium text-white"
              >
                {t('nav.services')}
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-medium text-white"
              >
                {t('nav.gallery')}
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-medium text-white"
              >
                {t('nav.testimonials')}
              </button>
              <Link
                to="/blog"
                className="px-2.5 py-1.5 text-[13px] rounded-lg bg-[#badad5]/20 font-medium text-[#badad5]"
              >
                {t('nav.blog')}
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-2.5 py-1.5 text-[13px] rounded-lg transition-all duration-300 hover:bg-[#badad5]/20 font-medium text-white"
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
          <div className="lg:hidden fixed inset-0 bg-[#001a00]/98 backdrop-blur-sm z-50 flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#233d36]">
              <img src="/images/logo/square-logo.png" alt="Logo" className="w-[100px]" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#badad5] p-2 hover:bg-[#233d36] rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-1">
                <button onClick={() => { scrollToSection("about"); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-[#badad5] hover:bg-[#233d36]/50 transition-colors font-archivo text-lg font-medium">
                  {t('nav.about')}
                </button>
                <button onClick={() => { scrollToSection("team"); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-[#badad5] hover:bg-[#233d36]/50 transition-colors font-archivo text-lg font-medium">
                  {t('nav.team')}
                </button>
                <button onClick={() => { scrollToSection("services"); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-[#badad5] hover:bg-[#233d36]/50 transition-colors font-archivo text-lg font-medium">
                  {t('nav.services')}
                </button>
                <button onClick={() => { scrollToSection("gallery"); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-[#badad5] hover:bg-[#233d36]/50 transition-colors font-archivo text-lg font-medium">
                  {t('nav.gallery')}
                </button>
                <button onClick={() => { scrollToSection("testimonials"); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-[#badad5] hover:bg-[#233d36]/50 transition-colors font-archivo text-lg font-medium">
                  {t('nav.testimonials')}
                </button>
                <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left px-4 py-3 rounded-xl text-[#badad5] bg-[#233d36]/50 font-archivo text-lg font-medium">
                  {t('nav.blog')}
                </Link>
                <button onClick={() => { scrollToSection("contact"); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-[#badad5] hover:bg-[#233d36]/50 transition-colors font-archivo text-lg font-medium">
                  {t('nav.contact')}
                </button>
              </div>
            </nav>
            <div className="px-6 py-6 border-t border-[#233d36] space-y-4">
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => { window.Calendly?.initPopupWidget({ url: 'https://calendly.com/georgiana17stanciu/30min' }); setMobileMenuOpen(false); }}
                className="w-full bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] py-4 rounded-xl font-archivo font-bold text-base transition-all duration-300 hover:shadow-xl shadow-lg flex items-center justify-center gap-2"
              >
                <CalendarIcon className="w-5 h-5" />
                Programează-te
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="pt-24 sm:pt-32 pb-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#233d36]/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#badad5]/10 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#a6b6e0]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="inline-flex items-center gap-2 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="px-5 py-2.5 bg-gradient-to-r from-[#badad5]/20 to-[#a6b6e0]/20 border border-[#badad5]/30 rounded-full text-[#badad5] text-sm font-archivo font-semibold tracking-wide flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {language === 'ro' ? 'Resurse educaționale' : 'Educational Resources'}
                </span>
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#badad5] font-archivo tracking-tight mb-6 leading-tight max-w-4xl mx-auto px-4">
                {language === 'ro' ? 'Ghiduri și strategii pentru a-ți îmbunătăți jocul de șah' : 'Guides and strategies to improve your chess game'}
              </h1>
              <div className="w-32 h-1.5 bg-gradient-to-r from-[#badad5] to-[#a6b6e0] mx-auto rounded-full" />
            </motion.div>

            {/* Articles Grid */}
            <div className="space-y-10 mb-20">
              {currentBlogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/blog/${post.id}`}
                    className="group relative block rounded-3xl overflow-hidden shadow-2xl hover:shadow-[#badad5]/30 transition-all duration-500 border border-[#233d36]/50 hover:border-[#badad5]/50"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#badad5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Image Section */}
                      <div className="relative h-72 sm:h-80 lg:h-[420px] overflow-hidden">
                        {post.image ? (
                          <>
                            <img
                              src={post.image}
                              alt={post.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="eager"
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#001a00]/90 lg:block hidden" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#001a00]/90 via-[#001a00]/30 to-transparent lg:hidden" />
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#233d36] to-[#001a00] flex items-center justify-center">
                            <BookOpen className="w-24 h-24 text-[#badad5]/20" />
                          </div>
                        )}

                        {/* Category badge on image */}
                        <div className="absolute top-6 left-6 z-20">
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#001a00]/80 backdrop-blur-md border border-[#badad5]/40 text-[#badad5] rounded-full text-xs font-bold font-archivo uppercase tracking-wider shadow-lg">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="relative p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-[#1a2d28] to-[#001a00]">
                        {/* Decorative corner */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#badad5]/5 rounded-bl-full" />

                        <div className="relative z-10">
                          {/* Meta info */}
                          <div className="flex items-center gap-4 mb-5 text-[#a6b6e0]/70 text-sm font-archivo">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {post.readTime}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-[#a6b6e0]/40" />
                            <span className="flex items-center gap-1.5">
                              <CalendarIcon className="w-4 h-4" />
                              {post.date}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#badad5] font-archivo mb-5 leading-tight group-hover:text-white transition-colors duration-300">
                            {post.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="text-[#a6b6e0] font-archivo mb-8 leading-relaxed text-base lg:text-lg line-clamp-3">
                            {post.excerpt}
                          </p>

                          {/* Author and CTA */}
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                              {post.authorImage ? (
                                <img
                                  src={post.authorImage}
                                  alt={post.author}
                                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#badad5]/30 shadow-lg"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#badad5]/30 to-[#a6b6e0]/20 flex items-center justify-center ring-2 ring-[#badad5]/30">
                                  <User className="w-6 h-6 text-[#badad5]" />
                                </div>
                              )}
                              <div>
                                <p className="font-bold text-[#badad5] font-archivo text-base">{post.author}</p>
                                <p className="text-[#a6b6e0]/60 text-sm font-archivo">{language === 'ro' ? 'Autor' : 'Author'}</p>
                              </div>
                            </div>

                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] rounded-xl font-archivo font-bold text-sm shadow-lg group-hover:shadow-xl group-hover:shadow-[#badad5]/20 transition-all duration-300">
                              <span>{t('blog.readArticle')}</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center border border-[#badad5]/30 bg-gradient-to-br from-[#233d36] via-[#1a2d28] to-[#001a00] shadow-2xl"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#badad5]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#a6b6e0]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-[#badad5]/5 via-transparent to-transparent" />

              <div className="relative z-10">
                <motion.div
                  className="inline-block mb-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#badad5]/30 to-[#a6b6e0]/20 backdrop-blur-sm border border-[#badad5]/40 flex items-center justify-center mx-auto shadow-xl">
                    <BookOpen className="w-10 h-10 text-[#badad5]" />
                  </div>
                </motion.div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#badad5] font-archivo mb-5">
                  {t('blog.newsletter.title')}
                </h3>
                <p className="text-lg sm:text-xl text-[#a6b6e0] font-archivo mb-10 max-w-2xl mx-auto leading-relaxed">
                  {t('blog.newsletter.description')}
                </p>
                <form onSubmit={handleNewsletterSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={t('blog.newsletter.placeholder')}
                    required
                    className="flex-1 px-6 py-4 bg-[#001a00]/90 backdrop-blur-sm border-2 border-[#233d36] rounded-xl text-[#badad5] placeholder-[#a6b6e0]/50 focus:outline-none focus:border-[#badad5] focus:ring-4 focus:ring-[#badad5]/20 transition-all font-archivo shadow-xl text-base"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingNewsletter}
                    className="px-8 py-4 bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] rounded-xl font-bold font-archivo hover:shadow-2xl hover:shadow-[#badad5]/30 hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 text-base"
                  >
                    {isSubmittingNewsletter ? t('blog.newsletter.submitting') : t('blog.newsletter.subscribe')}
                  </button>
                </form>
                {newsletterStatus && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 text-base font-archivo text-center ${
                      newsletterStatus.includes(t('blog.newsletter.success').split('.')[0])
                        ? "text-[#badad5]"
                        : "text-red-400"
                    }`}
                  >
                    {newsletterStatus}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
