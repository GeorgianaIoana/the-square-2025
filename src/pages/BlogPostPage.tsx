import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, User, ArrowLeft, BookOpen, Clock, Share2, Check, Link as LinkIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { blogPosts } from "../data/blogPosts";
import { useLanguage } from "../contexts/LanguageContext";
import SnowEffect from "../components/SnowEffect";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function BlogPostPage() {
  const { t, language } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const currentBlogPosts = blogPosts[language] || blogPosts.ro;
  const post = currentBlogPosts.find((p) => p.id === parseInt(id || "0"));

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://thesquare.ro/blog/${id}`;
  const shareTitle = post?.title || 'THE SQUARE Blog';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const socialShareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`,
  };

  // SEO Meta Tags for individual article
  useEffect(() => {
    if (post) {
      const title = `${post.title} | THE SQUARE Blog`;
      const description = post.excerpt.slice(0, 160) + '...';

      document.title = title;

      // Update meta tags
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) metaDescription.setAttribute('content', description);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.setAttribute('content', description);

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', `https://thesquare.ro/blog/${post.id}`);

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage && post.image) ogImage.setAttribute('content', `https://thesquare.ro/${post.image}`);

      // Add article structured data
      const existingScript = document.querySelector('script[data-article-schema]');
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-article-schema', 'true');
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image ? `https://thesquare.ro/${post.image}` : undefined,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "THE SQUARE Chess Club",
          "logo": {
            "@type": "ImageObject",
            "url": "https://thesquare.ro/images/logo/square-logo.png"
          }
        },
        "datePublished": post.date,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://thesquare.ro/blog/${post.id}`
        }
      });
      document.head.appendChild(script);

      // Cleanup
      return () => {
        document.title = 'THE SQUARE - Cursuri de Șah București | Club Șah Copii și Adulți';
        const articleScript = document.querySelector('script[data-article-schema]');
        if (articleScript) articleScript.remove();
      };
    }
  }, [post, language]);

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
            {language === 'ro' ? 'Articolul nu a fost găsit' : 'Article not found'}
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

  // Helper function to process inline markdown (bold and links)
  const processInlineMarkdown = (text: string): (string | JSX.Element)[] => {
    const result: (string | JSX.Element)[] = [];
    // Match bold **text** and links [text](url)
    const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
    let lastIndex = 0;
    let match;
    let keyIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        result.push(text.slice(lastIndex, match.index));
      }

      const matchedText = match[0];

      if (matchedText.startsWith("**")) {
        // Bold text
        result.push(
          <strong key={`bold-${keyIndex++}`} className="font-semibold text-[#badad5]">
            {matchedText.slice(2, -2)}
          </strong>
        );
      } else if (matchedText.startsWith("[")) {
        // Link [text](url)
        const linkMatch = matchedText.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          result.push(
            <a
              key={`link-${keyIndex++}`}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#badad5] underline hover:text-white transition-colors"
            >
              {linkMatch[1]}
            </a>
          );
        }
      }

      lastIndex = match.index + matchedText.length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }

    return result.length > 0 ? result : [text];
  };

  const formatContent = (content: string) => {
    const lines = content.split("\n");
    const formatted: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];
    let bulletItems: string[] = [];
    let inList = false;
    let inBulletList = false;

    const flushParagraph = (index: number | string) => {
      if (currentParagraph.length > 0) {
        formatted.push(
          <p key={`p-${index}`} className="mb-8 text-[#c5d8d5] font-archivo leading-[1.9] text-lg">
            {processInlineMarkdown(currentParagraph.join(" "))}
          </p>
        );
        currentParagraph = [];
      }
    };

    const flushList = (index: number | string) => {
      if (inList && listItems.length > 0) {
        formatted.push(
          <ol key={`ol-${index}`} className="space-y-4 mb-10 text-[#c5d8d5] font-archivo ml-2">
            {listItems.map((item, i) => (
              <li key={i} className="flex gap-4 leading-[1.8] text-lg">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#badad5]/30 to-[#a6b6e0]/20 flex items-center justify-center text-[#badad5] font-bold text-sm border border-[#badad5]/30">
                  {i + 1}
                </span>
                <span className="flex-1 pt-1">{processInlineMarkdown(item)}</span>
              </li>
            ))}
          </ol>
        );
        listItems = [];
        inList = false;
      }
    };

    const flushBulletList = (index: number | string) => {
      if (inBulletList && bulletItems.length > 0) {
        formatted.push(
          <ul key={`ul-${index}`} className="space-y-4 mb-10 text-[#c5d8d5] font-archivo ml-2">
            {bulletItems.map((item, i) => (
              <li key={i} className="flex gap-4 leading-[1.8] text-lg">
                <span className="flex-shrink-0 w-2 h-2 mt-3 rounded-full bg-gradient-to-br from-[#badad5] to-[#a6b6e0]" />
                <span className="flex-1">{processInlineMarkdown(item)}</span>
              </li>
            ))}
          </ul>
        );
        bulletItems = [];
        inBulletList = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Handle markdown images ![alt](src)
      const imageMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        flushParagraph(index);
        flushList(index);
        flushBulletList(index);
        formatted.push(
          <figure key={`img-${index}`} className="my-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#233d36]/50 bg-[#0a1f1a]">
              <img
                src={imageMatch[2]}
                alt={imageMatch[1]}
                className="w-full max-w-3xl mx-auto"
                loading="lazy"
              />
            </div>
            {imageMatch[1] && (
              <figcaption className="text-center text-[#a6b6e0]/70 text-sm font-archivo mt-4 italic">
                {imageMatch[1]}
              </figcaption>
            )}
          </figure>
        );
        return;
      }

      // H1 heading (skip - already shown as title)
      if (trimmedLine.startsWith("# ") && !trimmedLine.startsWith("## ") && !trimmedLine.startsWith("### ")) {
        flushParagraph(index);
        flushList(index);
        flushBulletList(index);
        // Skip H1 as it's the article title
        return;
      }

      // H2 heading
      if (trimmedLine.startsWith("## ")) {
        flushParagraph(index);
        flushList(index);
        flushBulletList(index);
        formatted.push(
          <h2 key={`h2-${index}`} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#badad5] font-archivo mb-6 mt-16 first:mt-0 relative">
            <span className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#badad5] to-[#a6b6e0] rounded-full hidden sm:block" />
            {trimmedLine.replace(/^## /, "")}
          </h2>
        );
        return;
      }

      // H3 heading
      if (trimmedLine.startsWith("### ")) {
        flushParagraph(index);
        flushList(index);
        flushBulletList(index);
        formatted.push(
          <h3 key={`h3-${index}`} className="text-xl sm:text-2xl font-bold text-[#badad5] font-archivo mb-5 mt-12">
            {trimmedLine.replace(/^### /, "")}
          </h3>
        );
        return;
      }

      // Bold standalone line **text**
      if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**") && !trimmedLine.includes(":**")) {
        flushParagraph(index);
        flushList(index);
        flushBulletList(index);
        formatted.push(
          <p key={`bold-${index}`} className="text-xl text-[#badad5] font-archivo mb-6 font-semibold leading-relaxed">
            {trimmedLine.replace(/\*\*/g, "")}
          </p>
        );
        return;
      }

      // Lines starting with ** but not ending with ** (e.g., **Label:** content)
      if (trimmedLine.startsWith("**") && !trimmedLine.endsWith("**")) {
        flushParagraph(index);
        flushList(index);
        flushBulletList(index);
        formatted.push(
          <div key={`callout-${index}`} className="my-8 p-6 bg-gradient-to-r from-[#233d36]/60 to-[#1a2d28]/60 rounded-xl border-l-4 border-[#badad5] backdrop-blur-sm">
            <p className="text-lg text-[#c5d8d5] font-archivo leading-relaxed">
              {processInlineMarkdown(trimmedLine)}
            </p>
          </div>
        );
        return;
      }

      // Numbered list item
      if (/^\d+\./.test(trimmedLine)) {
        flushParagraph(index);
        flushBulletList(index);
        if (!inList) {
          inList = true;
        }
        const listItem = trimmedLine.replace(/^\d+\.\s*/, "");
        listItems.push(listItem);
        return;
      }

      // Bullet list item (- item)
      if (trimmedLine.startsWith("- ")) {
        flushParagraph(index);
        flushList(index);
        if (!inBulletList) {
          inBulletList = true;
        }
        const bulletItem = trimmedLine.replace(/^-\s*/, "");
        bulletItems.push(bulletItem);
        return;
      }

      // Empty line
      if (trimmedLine === "") {
        flushParagraph(index);
        flushList(index);
        flushBulletList(index);
        return;
      }

      // Regular text
      flushList(index);
      flushBulletList(index);
      currentParagraph.push(trimmedLine);
    });

    // Flush remaining content
    flushParagraph("final");
    flushList("final");
    flushBulletList("final");

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
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#badad5]/10 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-[#a6b6e0]/10 rounded-full blur-3xl -translate-x-1/2" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[#a6b6e0] hover:text-[#badad5] font-archivo mb-8 transition-all duration-300 group px-4 py-2 rounded-xl hover:bg-[#233d36]/50"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {t('blog.backToBlogShort')}
              </Link>
            </motion.div>

            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-gradient-to-br from-[#1a2d28] via-[#233d36]/80 to-[#001a00] backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-[#233d36]/50"
            >
              {post.image ? (
                <div className="relative h-80 sm:h-[450px] md:h-[550px] w-full overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2d28] via-[#1a2d28]/50 to-transparent"></div>

                  {/* Category badge on image */}
                  <div className="absolute top-6 left-6 z-20">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#001a00]/80 backdrop-blur-md border border-[#badad5]/40 text-[#badad5] rounded-full text-sm font-bold font-archivo uppercase tracking-wider shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
              ) : null}
              <div className="p-8 sm:p-12 lg:p-16">
              {/* Meta info bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8 flex items-center gap-4 flex-wrap text-[#a6b6e0]/70 text-sm font-archivo"
              >
                {!post.image && (
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#badad5]/20 backdrop-blur-sm border border-[#badad5]/30 text-[#badad5] rounded-full text-xs font-semibold font-archivo">
                    {post.category}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#a6b6e0]/40" />
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4" />
                  {post.date}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#badad5] font-archivo mb-8 leading-tight"
              >
                {post.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-10 border-b border-[#233d36]/50"
              >
                <div className="flex items-center gap-4">
                  {post.authorImage ? (
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="w-14 h-14 rounded-full object-cover ring-3 ring-[#badad5]/30 shadow-xl"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#badad5]/30 to-[#a6b6e0]/20 flex items-center justify-center ring-3 ring-[#badad5]/30">
                      <User className="w-7 h-7 text-[#badad5]" />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-[#badad5] font-archivo text-lg">{post.author}</p>
                    <p className="text-[#a6b6e0]/60 text-sm font-archivo">{language === 'ro' ? 'Autor' : 'Author'}</p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#233d36]/80 hover:bg-[#badad5]/20 border border-[#233d36] hover:border-[#badad5]/40 text-[#a6b6e0] hover:text-[#badad5] rounded-xl font-archivo font-medium text-sm transition-all duration-300"
                  >
                    <Share2 className="w-4 h-4" />
                    {language === 'ro' ? 'Distribuie' : 'Share'}
                  </button>

                  {showShareMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-[#1a2d28] border border-[#233d36] rounded-xl shadow-2xl p-3 z-50 min-w-[200px]">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#233d36]">
                        <span className="text-[#badad5] font-archivo text-sm font-medium">
                          {language === 'ro' ? 'Distribuie pe' : 'Share on'}
                        </span>
                        <button
                          onClick={() => setShowShareMenu(false)}
                          className="text-[#a6b6e0] hover:text-[#badad5] p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        {/* Facebook */}
                        <a
                          href={socialShareLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#233d36] text-[#a6b6e0] hover:text-[#badad5] transition-colors"
                          onClick={() => setShowShareMenu(false)}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                          </svg>
                          <span className="font-archivo text-sm">Facebook</span>
                        </a>

                        {/* Twitter/X */}
                        <a
                          href={socialShareLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#233d36] text-[#a6b6e0] hover:text-[#badad5] transition-colors"
                          onClick={() => setShowShareMenu(false)}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                          <span className="font-archivo text-sm">X (Twitter)</span>
                        </a>

                        {/* LinkedIn */}
                        <a
                          href={socialShareLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#233d36] text-[#a6b6e0] hover:text-[#badad5] transition-colors"
                          onClick={() => setShowShareMenu(false)}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          <span className="font-archivo text-sm">LinkedIn</span>
                        </a>

                        {/* WhatsApp */}
                        <a
                          href={socialShareLinks.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#233d36] text-[#a6b6e0] hover:text-[#badad5] transition-colors"
                          onClick={() => setShowShareMenu(false)}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          <span className="font-archivo text-sm">WhatsApp</span>
                        </a>

                        {/* Copy Link */}
                        <button
                          onClick={() => {
                            handleCopyLink();
                            setTimeout(() => setShowShareMenu(false), 1500);
                          }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#233d36] text-[#a6b6e0] hover:text-[#badad5] transition-colors w-full"
                        >
                          {copied ? (
                            <>
                              <Check className="w-5 h-5 text-green-400" />
                              <span className="font-archivo text-sm text-green-400">
                                {language === 'ro' ? 'Link copiat!' : 'Link copied!'}
                              </span>
                            </>
                          ) : (
                            <>
                              <LinkIcon className="w-5 h-5" />
                              <span className="font-archivo text-sm">
                                {language === 'ro' ? 'Copiază link' : 'Copy link'}
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="max-w-none prose-custom"
              >
                <div className="text-[#a6b6e0] font-archivo leading-relaxed text-base sm:text-lg lg:text-xl">
                  {formatContent(post.content)}
                </div>
              </motion.div>

              {/* Footer with back button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-16 pt-10 border-t border-[#233d36]/50 flex items-center justify-between flex-wrap gap-4"
              >
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] rounded-xl font-archivo font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-[#badad5]/30 hover:scale-105 shadow-xl group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  {t('blog.backToBlog')}
                </Link>

                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#233d36]/80 hover:bg-[#badad5]/20 border border-[#233d36] hover:border-[#badad5]/40 text-[#a6b6e0] hover:text-[#badad5] rounded-xl font-archivo font-medium text-sm transition-all duration-300"
                >
                  {language === 'ro' ? 'Sus' : 'Top'} ↑
                </button>
              </motion.div>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
      <SnowEffect />
    </div>
  );
}
