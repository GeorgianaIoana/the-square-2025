import React from "react";

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
              utilizatorilor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Ce tipuri de cookie-uri folosim?
            </h2>
            <ul className="list-disc list-inside ml-4">
              <li>
                <strong>Cookie-uri necesare:</strong> esențiale pentru
                funcționarea site-ului.
              </li>
              <li>
                <strong>Cookie-uri de performanță:</strong> analizează modul de
                utilizare al site-ului pentru îmbunătățiri.
              </li>
              <li>
                <strong>Cookie-uri de funcționalitate:</strong> memorează
                preferințele utilizatorilor.
              </li>
              <li>
                <strong>Cookie-uri de marketing:</strong> momentan, NU folosim
                cookie-uri de marketing.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Cookie-uri terțe</h2>
            <p>
              Putem utiliza servicii externe precum Google Maps și Web3Forms,
              care pot plasa propriile cookie-uri.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Cum puteți controla cookie-urile?
            </h2>
            <p>
              Puteți controla sau șterge cookie-urile din setările browserului.
              Dezactivarea cookie-urilor poate afecta funcționarea site-ului.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Modificări ale politicii de cookie-uri
            </h2>
            <p>
              Această politică poate fi actualizată periodic. Ultima
              actualizare: Aprilie 2025.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
            <p>
              Pentru orice întrebări sau sesizări, ne puteți contacta la:
              <br />
              <strong>Email:</strong> contact@thesquarechess.com
              <br />
              <strong>Telefon:</strong> +40742898793
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
