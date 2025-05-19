import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-[#001a00] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#badad5] mb-8 text-center">
          Termeni și Condiții
        </h1>

        <div className="space-y-8 text-[#a6b6e0]">
          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              1. Acceptarea Termenilor
            </h2>
            <p className="mb-4">
              Prin accesarea și utilizarea serviciilor THE SQUARE Chess Club,
              acceptați acești termeni și condiții în totalitate. Dacă nu
              sunteți de acord cu acești termeni, vă rugăm să nu utilizați
              serviciile noastre.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              2. Înscrieri și Program
            </h2>
            <p className="mb-4">
              Înscrierile la cursuri și evenimente sunt supuse următoarelor
              condiții:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Înscrierile trebuie făcute cu cel puțin 24 de ore înainte de
                începerea cursului
              </li>
              <li>Plata trebuie efectuată înainte de începerea cursului</li>
              <li>
                Programul cursurilor poate fi modificat cu o notificare
                prealabilă
              </li>
              <li>
                Anulările trebuie comunicate cu cel puțin 24 de ore înainte
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              3. Taxe și Plăți
            </h2>
            <p className="mb-4">Taxele pentru cursuri și evenimente:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sunt exprimate în RON și nu includ TVA</li>
              <li>Pot fi plătite în numerar sau prin transfer bancar</li>
              <li>Sunt valabile pentru perioada specificată la înscriere</li>
              <li>Nu sunt rambursabile în cazul absențelor neanunțate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              4. Responsabilități
            </h2>
            <p className="mb-4">THE SQUARE Chess Club se angajează să:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Oferă servicii educaționale de calitate</li>
              <li>Mențină un mediu sigur și prietenos pentru copii</li>
              <li>Respecte programul stabilit pentru cursuri</li>
              <li>Comunice prompt orice modificări sau evenimente speciale</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              5. Drepturi de Autor
            </h2>
            <p className="mb-4">
              Toate materialele educaționale, inclusiv metodele de predare,
              exercițiile și materialele de curs, sunt proprietatea THE SQUARE
              Chess Club și sunt protejate de legile drepturilor de autor. Nu
              sunt permise copierea, distribuirea sau utilizarea acestora fără
              acordul nostru scris.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              6. Limitarea Răspunderii
            </h2>
            <p className="mb-4">
              THE SQUARE Chess Club nu poate fi tras la răspundere pentru:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pierderi sau daune rezultate din forță majoră</li>
              <li>Întârzieri sau anulări cauzate de evenimente neprevăzute</li>
              <li>Consecințe ale deciziilor individuale ale participanților</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              7. Modificări ale Termenilor
            </h2>
            <p className="mb-4">
              Ne rezervăm dreptul de a modifica acești termeni și condiții în
              orice moment. Modificările vor intra în vigoare imediat după
              publicarea lor pe site-ul nostru. Utilizarea continuă a
              serviciilor noastre după modificări constituie acceptarea noilor
              termeni.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              8. Contact
            </h2>
            <p className="mb-4">
              Pentru întrebări sau clarificări legate de acești termeni și
              condiții, vă rugăm să ne contactați la:
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

export default TermsAndConditions;
