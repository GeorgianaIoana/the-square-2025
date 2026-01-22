import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ro' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'ro') ? saved : 'ro';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const translations: Record<Language, Record<string, string>> = {
    ro: {
      // Navigation
      'nav.about': 'Despre noi',
      'nav.team': 'Echipa',
      'nav.services': 'Cursuri de șah',
      'nav.gallery': 'Galerie',
      'nav.testimonials': 'Testimoniale',
      'nav.blog': 'Blog',
      'nav.contact': 'Contact',
      'nav.enroll': 'Înscrie-te la primul tău curs!',
      
      // Banner
      'banner.title1': 'Antrenează-te cu profesioniști',
      'banner.subtitle1': 'Șahul este viața în miniatură. Șahul este o luptă, o bătălie. - Garry Kasparov',
      'banner.title2': 'Depășește-ți limitele',
      'banner.subtitle2': 'Setăm împreună obiectivele tale și le îndeplinim!',
      'banner.title3': 'Mutările inspirate încep la clubul THE SQUARE',
      
      // About Section
      'about.title': 'Despre',
      'about.subtitle': 'THE SQUARE',
      'about.description': 'Clubul de Șah THE SQUARE este spațiul în care pasiunea pentru șah capătă formă, indiferent de vârstă sau nivel de experiență. Fondat din dorința de a promova gândirea strategică, disciplina și spiritul de comunitate, clubul nostru a devenit un punct de întâlnire pentru toți cei care vor să se dezvolte prin șah. Suntem o echipă de antrenori dedicați, convinși de puterea șahului de a educa, motiva și aduce oamenii împreună. Organizăm cursuri pentru copii și adulți, competiții, pregătiri pentru turnee și evenimente interactive care încurajează învățarea și socializarea. Te ajutăm să îți setezi obiective și să le împlinești într-un spațiu primitor și prietenos.',
      'about.whyChess.title': 'De ce este șahul sportul minții?',
      'about.whyChess.point1': '■ Concentrare și prezență. Fiecare partidă de șah este o oportunitate de a cultiva răbdarea.',
      'about.whyChess.point2': '■ Gândire strategică. Îți dezvolți capacitatea de a anticipa mutări și a lua decizii atât pe tabla de șah, cât și în viață.',
      'about.whyChess.point3': '■ Evoluezi continuu, în ritmul tău. La THE SQUARE ne ghidează bucuria. Apreciem fiecare pas către progres. Crești cu răbdare, poți să te bucuri de proces și să îți cultivi încrederea în forțele proprii.',
      'about.whyChess.point4': '■ Faci parte dintr-o comunitate prietenoasă, cu valori comune. La THE SQUARE, jucători începători și avansați se întâlnesc, se provoacă, se susțin. Fie că vii pentru socializare, învățare sau competiție, lumea THE SQUARE îți este deschisă.',
      'mission.title': 'MISIUNEA NOASTRĂ',
      'mission.description': 'Într-o lume tot mai digitală, care se mișcă în pas alert, THE SQUARE dorește să ofere prin șah un context în care timpul încetinește pentru câteva momente, un loc în care răbdarea și strategia se cultivă mutare cu mutare, alături de antrenori dedicați.',
      'mission.chooseEducation': 'Alege educația!',
      'mission.education.title': 'EDUCAȚIE',
      'mission.education.description': 'La THE SQUARE, fiecare lecție începe cu teorie solidă: 30-50 de minute dedicate deschiderilor, unde cursanții învață să construiască planuri clare și capătă încredere în jocul de mijloc. Urmează exerciții tactice sau finaluri explicate pas cu pas, care dezvoltă gândirea logică și calculul matematic. Apoi, în cele 30 de minute de practică, aplică noțiunile învățate în partide reale, antrenându-și concentrarea și inteligența emoțională.',
      'mission.integrity.title': 'INTEGRITATE',
      'mission.integrity.description': 'Integritatea este fundamentul fiecărei decizii pe tabla de șah și în viață. Într-un mediu în care onestitatea, respectul pentru reguli și fair-play-ul sunt valori de bază. A câștiga cu demnitate și a pierde cu grație sunt lecții esențiale care se deprind din practica fiecarei partide de șah.',
      'mission.community.title': 'COMUNITATE',
      'mission.community.description': 'Comunitatea THE SQUARE reunește pasionații de șah în evenimente unde jocul, socializarea și momentele plăcute sunt adesea însoțite de ceai. Suntem deschiși să primim voluntari pasionați, dornici să contribuie la inițiative caritabile sau să susțină workshop-uri educative. Astfel, prin educație strategică, contribuim împreună la o lume mai bună.',
      
      // Team Section
      'team.title': 'Echipa noastră',
      'team.readMore': 'Citește mai mult',
      'team.back': 'Înapoi',
      
      // Services Section
      'services.title': 'Abonamente și servicii',
      'services.more': 'Mai mult',
      'services.enroll': 'Înscrie-te acum!',
      'services.adults.title': 'Grupă adulți',
      'services.adults.price': '380 lei/lună',
      'services.adults.feature1': '4 sesiuni lunare cu instructor',
      'services.adults.feature2': '6 ore de curs',
      'services.adults.feature3': 'disponibil fizic și online',
      'services.adults.feature4': 'coach online pentru întrebări 24/7',
      'services.kids.title': 'Grupă copii',
      'services.kids.price': '260 lei/lună',
      'services.kids.feature1': '4 sesiuni lunare cu instructor',
      'services.kids.feature2': '4 ore de curs',
      'services.kids.feature3': 'teme și verificare exerciții',
      'services.kids.feature4': 'activități distractive pentru copii',
      'services.tournament.title': 'Concurs de șah',
      'services.tournament.price': '60lei',
      'services.tournament.feature1': '5 runde de sah rapid (15+10sec/mutare)',
      'services.tournament.feature2': 'prezența unui arbitru fide',
      'services.tournament.feature3': 'șahuri și ceasuri profesioniste',
      'services.tournament.feature4': 'premii pentru primii 3 clasați',
      'services.camp.title': 'Tabără de șah',
      'services.camp.price': 'de la 1380 lei',
      'services.camp.feature1': '10 ore intensive de șah',
      'services.camp.feature2': 'Activități recreative și distractive',
      'services.camp.feature3': 'Cazare și masă de vis',
      'services.camp.feature4': 'Concurs și premii',
      'services.camp.feature5': 'Petrecere',
      'services.individualKids.title': 'Curs individual copii',
      'services.individualKids.price': 'de la 90 lei',
      'services.individualKids.feature1': 'Atenție personalizată',
      'services.individualKids.feature2': 'Evoluție accelerată',
      'services.individualKids.feature3': 'Rezultate bune la competiții și școală',
      'services.individualKids.feature4': 'Disponibil fizic și online',
      'services.individualAdults.title': 'Curs individual adulți',
      'services.individualAdults.price': 'de la 120 lei',
      'services.individualAdults.feature1': 'Atenție personalizată',
      'services.individualAdults.feature2': 'Evoluție accelerată',
      'services.individualAdults.feature3': 'Atingerea obiectivelor setate inițial',
      'services.individualAdults.feature4': 'Disponibil fizic și online',
      
      // Gallery Section
      'gallery.title': 'Galerie',
      
      // Testimonials Section
      'testimonials.title': 'Experiența cursanților noștri',
      
      // Contact Section
      'contact.title': 'Contactează-ne',
      'contact.subtitle': 'Așteptăm mesajul tău!',
      'contact.formTitle': 'Formular de Contact',
      'contact.name': 'Numele tău',
      'contact.phone': 'Număr de telefon',
      'contact.email': 'Email',
      'contact.message': 'Mesaj',
      'contact.submit': 'Trimite',
      'contact.submitting': 'Se trimite...',
      'contact.success': '✅ Mulțumim! Mesajul a fost trimis cu succes.',
      'contact.error': '❌ A apărut o problemă de rețea. Încearcă din nou.',
      
      // Footer
      'footer.copyright': '© 2025 THE SQUARE. Developed by THE SQUARE.',
      'footer.privacy': 'Politica de Confidențialitate',
      'footer.terms': 'Termeni și Condiții',
      'footer.cookies': 'Politica Cookie',
      
      // Blog
      'blog.readArticle': 'Citește articolul',
      'blog.backToBlog': 'Înapoi la toate articolele',
      'blog.backToBlogShort': 'Înapoi la blog',
      'blog.newsletter.title': 'Abonează-te la newsletter',
      'blog.newsletter.description': 'Primește cele mai recente articole, strategii și sfaturi despre șah direct în inbox-ul tău',
      'blog.newsletter.placeholder': 'Adresa ta de email',
      'blog.newsletter.subscribe': 'Abonează-te',
      'blog.newsletter.submitting': 'Se trimite...',
      'blog.newsletter.success': 'Ne bucurăm că îți plac articolele noastre. Așteptăm părerile tale despre ele. Mulțumim!',
    },
    en: {
      // Navigation
      'nav.about': 'About Us',
      'nav.team': 'Team',
      'nav.services': 'Chess Courses',
      'nav.gallery': 'Gallery',
      'nav.testimonials': 'Testimonials',
      'nav.blog': 'Blog',
      'nav.contact': 'Contact',
      'nav.enroll': 'Enrol in your first course!',
      
      // Banner
      'banner.title1': 'Train with professionals',
      'banner.subtitle1': 'Chess is life in miniature. Chess is a struggle, a battle. - Garry Kasparov',
      'banner.title2': 'Push your limits',
      'banner.subtitle2': 'We set your goals together and achieve them!',
      'banner.title3': 'Inspired moves begin at THE SQUARE club',
      
      // About Section
      'about.title': 'About',
      'about.subtitle': 'THE SQUARE',
      'about.description': 'THE SQUARE Chess Club is the space where passion for chess takes shape, regardless of age or experience level. Founded from the desire to promote strategic thinking, discipline, and community spirit, our club has become a meeting point for all those who want to develop through chess. We are a team of dedicated trainers, convinced of chess\'s power to educate, motivate, and bring people together. We organise courses for children and adults, competitions, tournament preparation, and interactive events that encourage learning and socialisation. We help you set goals and achieve them in a welcoming and friendly space.',
      'about.whyChess.title': 'Why is chess the sport of the mind?',
      'about.whyChess.point1': '■ Concentration and presence. Each chess game is an opportunity to cultivate patience.',
      'about.whyChess.point2': '■ Strategic thinking. You develop the ability to anticipate moves and make decisions both on the chessboard and in life.',
      'about.whyChess.point3': '■ You evolve continuously, at your own pace. At THE SQUARE, joy guides us. We appreciate every step towards progress. You grow with patience, can enjoy the process, and cultivate confidence in your own strengths.',
      'about.whyChess.point4': '■ You are part of a friendly community with shared values. At THE SQUARE, beginner and advanced players meet, challenge each other, and support one another. Whether you come for socialisation, learning, or competition, the world of THE SQUARE is open to you.',
      'mission.title': 'OUR MISSION',
      'mission.description': 'In an increasingly digital world that moves at a fast pace, THE SQUARE wishes to offer through chess a context in which time slows down for a few moments, a place where patience and strategy are cultivated move by move, alongside dedicated trainers.',
      'mission.chooseEducation': 'Choose education!',
      'mission.education.title': 'EDUCATION',
      'mission.education.description': 'At THE SQUARE, each lesson begins with solid theory: 30-50 minutes dedicated to openings, where students learn to build clear plans and gain confidence in the middlegame. This is followed by tactical exercises or endgames explained step by step, which develop logical thinking and mathematical calculation. Then, in the 30 minutes of practice, they apply the concepts learned in real games, training their concentration and emotional intelligence.',
      'mission.integrity.title': 'INTEGRITY',
      'mission.integrity.description': 'Integrity is the foundation of every decision on the chessboard and in life. In an environment where honesty, respect for rules, and fair play are core values. Winning with dignity and losing with grace are essential lessons learned from practising each chess game.',
      'mission.community.title': 'COMMUNITY',
      'mission.community.description': 'The THE SQUARE community brings together chess enthusiasts at events where play, socialisation, and pleasant moments are often accompanied by tea. We are open to welcoming passionate volunteers, eager to contribute to charitable initiatives or support educational workshops. Thus, through strategic education, we contribute together to a better world.',
      
      // Team Section
      'team.title': 'Our Team',
      'team.readMore': 'Read more',
      'team.back': 'Back',
      
      // Services Section
      'services.title': 'Subscriptions and Services',
      'services.more': 'More',
      'services.enroll': 'Enrol now!',
      'services.adults.title': 'Adults Group',
      'services.adults.price': '380 lei/month',
      'services.adults.feature1': '4 monthly sessions with instructor',
      'services.adults.feature2': '6 hours of lessons',
      'services.adults.feature3': 'available in-person and online',
      'services.adults.feature4': 'online coach for questions 24/7',
      'services.kids.title': 'Children\'s Group',
      'services.kids.price': '260 lei/month',
      'services.kids.feature1': '4 monthly sessions with instructor',
      'services.kids.feature2': '4 hours of lessons',
      'services.kids.feature3': 'homework and exercise review',
      'services.kids.feature4': 'fun activities for children',
      'services.tournament.title': 'Chess Tournament',
      'services.tournament.price': '60 lei',
      'services.tournament.feature1': '5 rounds of rapid chess (15+10 sec/move)',
      'services.tournament.feature2': 'presence of a FIDE arbiter',
      'services.tournament.feature3': 'professional chess sets and clocks',
      'services.tournament.feature4': 'prizes for top 3 finishers',
      'services.camp.title': 'Chess Camp',
      'services.camp.price': 'from 1380 lei',
      'services.camp.feature1': '10 intensive hours of chess',
      'services.camp.feature2': 'Recreational and fun activities',
      'services.camp.feature3': 'Accommodation and dream meals',
      'services.camp.feature4': 'Tournament and prizes',
      'services.camp.feature5': 'Party',
      'services.individualKids.title': 'Individual Course for Children',
      'services.individualKids.price': 'from 90 lei',
      'services.individualKids.feature1': 'Personalised attention',
      'services.individualKids.feature2': 'Accelerated progress',
      'services.individualKids.feature3': 'Good results in competitions and school',
      'services.individualKids.feature4': 'Available in-person and online',
      'services.individualAdults.title': 'Individual Course for Adults',
      'services.individualAdults.price': 'from 120 lei',
      'services.individualAdults.feature1': 'Personalised attention',
      'services.individualAdults.feature2': 'Accelerated progress',
      'services.individualAdults.feature3': 'Achieving initially set goals',
      'services.individualAdults.feature4': 'Available in-person and online',
      
      // Gallery Section
      'gallery.title': 'Gallery',
      
      // Testimonials Section
      'testimonials.title': 'Our Students\' Experience',
      
      // Contact Section
      'contact.title': 'Contact Us',
      'contact.subtitle': 'We look forward to your message!',
      'contact.formTitle': 'Contact Form',
      'contact.name': 'Your Name',
      'contact.phone': 'Phone Number',
      'contact.email': 'Email',
      'contact.message': 'Message',
      'contact.submit': 'Submit',
      'contact.submitting': 'Submitting...',
      'contact.success': '✅ Thank you! Your message has been sent successfully.',
      'contact.error': '❌ A network problem occurred. Please try again.',
      
      // Footer
      'footer.copyright': '© 2025 THE SQUARE. Developed by THE SQUARE.',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms and Conditions',
      'footer.cookies': 'Cookie Policy',
      
      // Blog
      'blog.readArticle': 'Read article',
      'blog.backToBlog': 'Back to all articles',
      'blog.backToBlogShort': 'Back to blog',
      'blog.newsletter.title': 'Subscribe to our newsletter',
      'blog.newsletter.description': 'Receive the latest articles, strategies, and chess tips directly in your inbox',
      'blog.newsletter.placeholder': 'Your email address',
      'blog.newsletter.subscribe': 'Subscribe',
      'blog.newsletter.submitting': 'Submitting...',
      'blog.newsletter.success': 'We\'re delighted you enjoy our articles. We look forward to your feedback. Thank you!',
    },
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
