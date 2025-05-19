import React from "react";

const CookiePolicy: React.FC = () => {
  return (
    <div className="bg-[#001a00] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#badad5] mb-8 text-center">
          Politica de Cookie-uri
        </h1>

        <div className="space-y-8 text-[#a6b6e0]">
          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              1. Ce sunt Cookie-urile?
            </h2>
            <p className="mb-4">
              Cookie-urile sunt fișiere text de mici dimensiuni care sunt
              stocate pe dispozitivul dumneavoastră când vizitați un site web.
              Acestea sunt utilizate pe scară largă pentru a face site-urile
              funcționale sau mai eficiente, precum și pentru a furniza
              informații proprietarilor site-ului.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              2. Tipurile de Cookie-uri pe care le Utilizăm
            </h2>
            <p className="mb-4">
              Pe site-ul nostru utilizăm următoarele tipuri de cookie-uri:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Cookie-uri esențiale:</strong> Necesare pentru
                funcționarea site-ului. Nu pot fi dezactivate în sistemele
                noastre.
              </li>
              <li>
                <strong>Cookie-uri de performanță:</strong> Ne ajută să
                înțelegem cum interacționează vizitatorii cu site-ul nostru.
              </li>
              <li>
                <strong>Cookie-uri de funcționalitate:</strong> Permit site-ului
                să își amintească alegerile pe care le faceți pentru a oferi o
                experiență mai personalizată.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              3. Cum Controlăm Cookie-urile
            </h2>
            <p className="mb-4">
              Puteți controla și/sau șterge cookie-urile după cum doriți. Puteți
              șterge toate cookie-urile care sunt deja pe computerul
              dumneavoastră și puteți seta majoritatea browserelor să le
              blocheze. Dacă faceți acest lucru, este posibil să trebuiască să
              ajustați manual unele preferințe de fiecare dată când vizitați un
              site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              4. Cookie-uri Terțe Părți
            </h2>
            <p className="mb-4">
              În unele cazuri speciale, folosim și cookie-uri furnizate de terțe
              părți de încredere. Următoarele secțiuni detaliază cookie-urile
              terțe părți pe care le puteți întâlni prin acest site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              5. Cookie-uri Analitice
            </h2>
            <p className="mb-4">
              Folosim cookie-uri analitice pentru a înțelege cum utilizați
              site-ul nostru. Acestea ne ajută să îmbunătățim conținutul și
              funcționalitatea site-ului nostru. Informațiile colectate sunt
              anonime și sunt utilizate doar în scopuri statistice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              6. Modificări ale Politicii de Cookie-uri
            </h2>
            <p className="mb-4">
              Ne rezervăm dreptul de a modifica această politică de cookie-uri
              în orice moment. Orice modificări vor fi publicate pe această
              pagină și vor intra în vigoare imediat după publicare.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              7. Contact
            </h2>
            <p className="mb-4">
              Dacă aveți întrebări despre utilizarea cookie-urilor pe site-ul
              nostru, vă rugăm să ne contactați la:
            </p>
            <p className="mb-4">
              Email: contact@thesquare.ro
              <br />
              Telefon: 0742 898 793
              <br />
              Adresă: Strada Corbeni nr. 34, Sector 2, București
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
