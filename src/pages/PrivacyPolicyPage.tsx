import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="bg-[#001a00] min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#a6b6e0] tracking-wide mb-10" style={{ fontFamily: 'Archivo, sans-serif' }}>
          Politică de Confidențialitate
        </h1>

        <div className="space-y-8 text-[#a6b6e0] tracking-wide" style={{ fontFamily: 'Archivo, sans-serif' }}>
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Cine suntem</h2>
            <p>
              Clubul de Șah "The Square" respectă confidențialitatea datelor personale ale tuturor membrilor săi – copii, părinți și adulți.
              Datele colectate sunt utilizate exclusiv pentru buna desfășurare a activităților educative și administrative ale clubului.
            </p>
            <p className="mt-2">
              <strong>Date de contact:</strong><br/>
              Denumire: ACS The Square<br/>
              Adresă: Strada Coreni 34, București, Sector 2, România<br/>
              Email: contact@thesquarechess.com<br/>
              Telefon: +40742898793
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Ce date personale colectăm</h2>
            <p>
              Colectăm următoarele date personale:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Nume și prenume</li>
              <li>Data nașterii</li>
              <li>Număr de telefon</li>
              <li>Adresă de email</li>
              <li>Alte informații furnizate voluntar</li>
              <li>Datele părinților sau tutorilor legali (pentru minori)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Cum utilizăm datele personale</h2>
            <p>
              Datele colectate sunt folosite pentru:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Île inscrierea și organizarea cursurilor și competițiilor de șah</li>
              <li>Comunicarea programului de activități</li>
              <li>Informarea privind evenimente speciale sau campanii</li>
              <li>Emiterea de documente (adeverințe, diplome)</li>
            </ul>
            <p className="mt-2">
              Nu vindem, nu închiriem și nu divulgăm datele către terți.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Stocarea și protecția datelor</h2>
            <p>
              Datele sunt păstrate în siguranță, pe servere protejate, accesibile doar personalului autorizat.
              Aplicăm măsuri tehnice și organizatorice pentru protecția datelor personale.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Drepturile dumneavoastră</h2>
            <p>
              Aveți următoarele drepturi:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Dreptul de acces la date</li>
              <li>Dreptul la rectificare</li>
              <li>Dreptul la ștergere</li>
              <li>Dreptul la restricționarea prelucrării</li>
              <li>Dreptul de opoziție</li>
              <li>Dreptul la portabilitatea datelor</li>
            </ul>
            <p className="mt-2">
              Pentru solicitări, ne puteți contacta la info@masterchess.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Politica privind datele minorilor</h2>
            <p>
              Datele copiilor sub 16 ani sunt prelucrate doar cu acordul părinților sau tutorilor legali.
              Ne angajăm să protejăm confidențialitatea datelor minorilor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Modificări ale politicii de confidențialitate</h2>
            <p>
              Putem actualiza această politică periodic. Vă recomandăm să verificați pagina pentru eventuale modificări.
            </p>
            <p className="mt-2">
              Ultima actualizare: Mai 2025
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
