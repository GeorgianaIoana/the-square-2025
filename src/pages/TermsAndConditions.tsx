import React from "react";

export default function TermsAndConditions() {
  return (
    <section className="bg-[#001a00] min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl font-bold text-center text-[#a6b6e0] tracking-wide mb-10"
          style={{ fontFamily: "Archivo, sans-serif" }}
        >
          Termeni și Condiții
        </h1>

        <div
          className="space-y-8 text-[#a6b6e0] tracking-wide"
          style={{ fontFamily: "Archivo, sans-serif" }}
        >
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Acceptarea termenilor
            </h2>
            <p>
              Prin accesarea și utilizarea site-ului clubului de șah "The
              Square", sunteți de acord cu acești Termeni și Condiții. Dacă nu
              sunteți de acord, vă rugăm să nu utilizați site-ul.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Scopul site-ului</h2>
            <p>
              Site-ul are scop informativ și educațional, oferind informații
              despre activitățile și serviciile clubului de șah pentru copii și
              adulți.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. Drepturi de autor
            </h2>
            <p>
              Conținutul acestui site (texte, imagini, grafică) este protejat de
              drepturile de autor. Reproducerea sau utilizarea conținutului fără
              acordul scris al clubului este interzisă.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Limitarea răspunderii
            </h2>
            <p>
              Ne străduim să oferim informații corecte și actualizate, însă nu
              garantăm acuratețea, exhaustivitatea sau disponibilitatea
              permanentă a site-ului.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Modificări ale termenilor
            </h2>
            <p>
              Clubul de șah "The Square" își rezervă dreptul de a modifica
              acești termeni fără notificare prealabilă. Vă recomandăm să
              verificați periodic această pagină.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
            <p>
              Pentru orice întrebări sau sesizări, ne puteți contacta la:
              <br />
              <strong>Email:</strong> contact@thesquarechessclub.com
              <br />
              <strong>Telefon:</strong> +40742898793
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
