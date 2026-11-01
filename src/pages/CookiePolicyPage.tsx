import React from "react";
import { Link } from "react-router-dom";
import { openCookieSettings } from "../hooks/useCookieConsent";

type CookieRow = {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
};

const COOKIE_GROUPS: { title: string; description: string; rows: CookieRow[] }[] = [
  {
    title: "Cookie-uri strict necesare",
    description:
      "Sunt indispensabile pentru funcționarea site-ului și pentru serviciile pe care le solicitați explicit. Nu necesită consimțământ și nu pot fi dezactivate.",
    rows: [
      {
        name: "cookieyes-consent",
        provider: "CookieYes (thesquarechessclub.com)",
        purpose: "Reține opțiunile dumneavoastră privind cookie-urile.",
        duration: "1 an",
      },
      {
        name: "__cf_bm",
        provider: "Calendly (calendly.com)",
        purpose:
          "Protecție anti-bot, setat doar când deschideți fereastra de programare Calendly.",
        duration: "1 oră",
      },
    ],
  },
  {
    title: "Cookie-uri funcționale",
    description:
      "Activează funcții suplimentare. Se plasează doar după ce vă dați acordul pentru categoria „Funcționale” sau, în cazul hărții, după ce alegeți să o afișați.",
    rows: [
      {
        name: "TawkConnectionTime, twk_idm_key",
        provider: "tawk.to (embed.tawk.to)",
        purpose: "Mențin conversația din fereastra de chat live.",
        duration: "Sesiune",
      },
      {
        name: "twk_uuid_*, __tawkuuid",
        provider: "tawk.to (embed.tawk.to)",
        purpose:
          "Recunosc vizitatorul care revine, pentru a păstra istoricul conversației.",
        duration: "Până la 6 luni",
      },
      {
        name: "NID și alte cookie-uri Google",
        provider: "Google Maps (google.com)",
        purpose: "Afișarea hărții interactive cu locația clubului.",
        duration: "Până la 6 luni",
      },
    ],
  },
];

export default function CookiePolicy() {
  return (
    <section className="bg-[#001a00] min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl font-bold text-center text-[#a6b6e0] tracking-wide mb-10"
          style={{ fontFamily: "Archivo, sans-serif" }}
        >
          Politica de Cookie-uri
        </h1>

        <div
          className="space-y-8 text-[#a6b6e0] tracking-wide"
          style={{ fontFamily: "Archivo, sans-serif" }}
        >
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Ce sunt cookie-urile?
            </h2>
            <p>
              Cookie-urile sunt fișiere text mici stocate pe dispozitivul
              dumneavoastră atunci când vizitați un website. Ele ajută la
              funcționarea corectă a site-ului și îmbunătățesc experiența
              utilizatorilor. Tehnologiile similare, cum ar fi stocarea locală
              a browserului (localStorage, sessionStorage), sunt tratate în
              această politică la fel ca cookie-urile.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Temeiul legal</h2>
            <p>
              Folosim cookie-uri în conformitate cu Legea nr. 506/2004 privind
              prelucrarea datelor cu caracter personal și protecția vieții
              private în sectorul comunicațiilor electronice (art. 4 alin. (5))
              și cu Regulamentul (UE) 2016/679 (GDPR).
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>
                Cookie-urile strict necesare se plasează fără consimțământ,
                fiind indispensabile pentru serviciile solicitate de
                dumneavoastră.
              </li>
              <li>
                Toate celelalte cookie-uri se plasează doar pe baza
                consimțământului dumneavoastră (art. 6 alin. (1) lit. a) GDPR),
                exprimat prin bannerul de cookie-uri.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. Ce cookie-uri folosim
            </h2>
            <p className="mb-6">
              <strong>Nu folosim cookie-uri analitice, de publicitate sau de marketing</strong>{" "}
              și nu vă afișăm reclame personalizate. Mai jos găsiți toate
              cookie-urile care pot fi plasate prin intermediul site-ului.
            </p>

            <div className="space-y-8">
              {COOKIE_GROUPS.map((group) => (
                <div key={group.title}>
                  <h3 className="text-xl font-semibold mb-2">{group.title}</h3>
                  <p className="mb-3">{group.description}</p>
                  <div className="overflow-x-auto rounded-lg border border-[#a6b6e0]/20">
                    <table className="w-full min-w-[600px] text-left text-sm">
                      <thead className="bg-[#a6b6e0]/10">
                        <tr>
                          <th className="px-3 py-2 font-semibold">Nume</th>
                          <th className="px-3 py-2 font-semibold">Furnizor</th>
                          <th className="px-3 py-2 font-semibold">Scop</th>
                          <th className="px-3 py-2 font-semibold">Durată</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.rows.map((row) => (
                          <tr
                            key={row.name}
                            className="border-t border-[#a6b6e0]/20 align-top"
                          >
                            <td className="px-3 py-2 font-mono text-xs break-words">
                              {row.name}
                            </td>
                            <td className="px-3 py-2">{row.provider}</td>
                            <td className="px-3 py-2">{row.purpose}</td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              {row.duration}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-2">
              Stocare locală în browser
            </h3>
            <p>
              Site-ul salvează în browser limba aleasă (localStorage, până o
              ștergeți), ciorna formularului de contact și progresul la
              puzzle-ul zilei (sessionStorage, până închideți fila). Aceste
              informații rămân pe dispozitivul dumneavoastră și nu ne sunt
              transmise.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Servicii terțe</h2>
            <p>
              Unele cookie-uri sunt plasate de furnizori terți, care le
              gestionează conform propriilor politici:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>
                <strong>Google</strong> (Maps) –{" "}
                <a
                  href="https://policies.google.com/technologies/cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  politica Google
                </a>
              </li>
              <li>
                <strong>Calendly</strong> (programarea ședințelor) –{" "}
                <a
                  href="https://calendly.com/legal/cookie-notice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  politica Calendly
                </a>
                . Scriptul Calendly se încarcă pe site, iar cookie-urile
                Calendly se plasează când deschideți fereastra de programare.
              </li>
              <li>
                <strong>tawk.to</strong> (chat live) –{" "}
                <a
                  href="https://www.tawk.to/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  politica tawk.to
                </a>
              </li>
              <li>
                <strong>CookieYes</strong> (gestionarea consimțământului) –{" "}
                <a
                  href="https://www.cookieyes.com/cookie-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  politica CookieYes
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Cum vă puteți modifica sau retrage acordul
            </h2>
            <p>
              Vă puteți modifica sau retrage oricând acordul, la fel de ușor
              cum l-ați dat, din butonul de mai jos sau din pictograma
              CookieYes afișată pe site. Retragerea acordului nu afectează
              legalitatea prelucrării făcute înainte de retragere.
            </p>
            <button
              type="button"
              onClick={openCookieSettings}
              className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] font-bold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Modifică preferințele cookie
            </button>
            <p className="mt-4">
              De asemenea, puteți bloca sau șterge cookie-urile din setările
              browserului. Blocarea cookie-urilor strict necesare poate afecta
              funcționarea site-ului.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Modificări ale politicii de cookie-uri
            </h2>
            <p>
              Această politică poate fi actualizată periodic. Ultima
              actualizare: Noiembrie 2026.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
            <p>
              Pentru orice întrebări sau sesizări, ne puteți contacta la:
              <br />
              <strong>Email:</strong> contact@thesquarechessclub.com
              <br />
              <strong>Telefon:</strong> +40742898793
            </p>
            <p className="mt-2">
              Detalii despre modul în care prelucrăm datele personale găsiți în{" "}
              <Link to="/privacy-policy" className="underline hover:text-white">
                Politica de Confidențialitate
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
