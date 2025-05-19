import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#001a00] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#badad5] mb-8 text-center">
          Politica de Confidențialitate
        </h1>

        <div className="space-y-8 text-[#a6b6e0]">
          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              1. Informații Generale
            </h2>
            <p className="mb-4">
              THE SQUARE Chess Club ("noi", "ne", "nostru") respectă
              confidențialitatea dumneavoastră și se angajează să protejeze
              datele personale pe care ni le furnizați. Această politică de
              confidențialitate explică cum colectăm, utilizăm și protejăm
              informațiile dumneavoastră.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              2. Informații pe care le Colectăm
            </h2>
            <p className="mb-4">Colectăm următoarele tipuri de informații:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Informații de contact (nume, adresă de email, număr de telefon)
              </li>
              <li>
                Informații despre copilul dumneavoastră (nume, vârstă, nivel de
                șah)
              </li>
              <li>Informații despre participarea la cursuri și evenimente</li>
              <li>Informații despre progresul în învățarea șahului</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              3. Cum Utilizăm Informațiile
            </h2>
            <p className="mb-4">Utilizăm informațiile colectate pentru:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Administrarea înscrierilor la cursuri și evenimente</li>
              <li>Comunicarea despre programul de cursuri și evenimente</li>
              <li>Îmbunătățirea serviciilor noastre educaționale</li>
              <li>Respectarea obligațiilor legale</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              4. Protecția Datelor
            </h2>
            <p className="mb-4">
              Implementăm măsuri de securitate tehnice și organizaționale pentru
              a proteja datele dumneavoastră împotriva accesului neautorizat,
              modificării, divulgării sau distrugerii.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              5. Drepturile Dumneavoastră
            </h2>
            <p className="mb-4">Aveți dreptul la:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accesul la datele dumneavoastră personale</li>
              <li>Corectarea datelor inexacte</li>
              <li>Ștergerea datelor în anumite circumstanțe</li>
              <li>Opoziția la procesarea datelor</li>
              <li>Portabilitatea datelor</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              6. Contact
            </h2>
            <p className="mb-4">
              Pentru întrebări sau solicitări legate de confidențialitatea
              datelor dumneavoastră, vă rugăm să ne contactați la:
            </p>
            <p className="mb-4">
              Email: contact@thesquare.ro
              <br />
              Telefon: 0742 898 793
              <br />
              Adresă: Strada Corbeni nr. 34, Sector 2, București
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#badad5] mb-4">
              7. Actualizări ale Politicii
            </h2>
            <p className="mb-4">
              Ne rezervăm dreptul de a actualiza această politică de
              confidențialitate în orice moment. Vă vom notifica despre orice
              modificări semnificative prin email sau prin intermediul site-ului
              nostru.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
