import React from "react";
import { Link } from "react-router-dom";

type Processing = {
  purpose: string;
  data: string;
  legalBasis: string;
  retention: string;
};

const PROCESSING: Processing[] = [
  {
    purpose: "Răspunsul la mesajele trimise prin formularul de contact sau WhatsApp",
    data: "Nume, telefon, email, conținutul mesajului",
    legalBasis:
      "Demersuri făcute la cererea dumneavoastră înainte de încheierea unui contract – art. 6 alin. (1) lit. b) GDPR",
    retention: "12 luni de la ultimul mesaj, dacă nu urmează o înscriere",
  },
  {
    purpose: "Programarea ședințelor prin Calendly",
    data: "Nume, email, telefon, detaliile programării",
    legalBasis:
      "Demersuri precontractuale / executarea contractului – art. 6 alin. (1) lit. b) GDPR",
    retention: "12 luni de la data ședinței, dacă nu urmează o înscriere",
  },
  {
    purpose:
      "Înscrierea și organizarea cursurilor și competițiilor de șah, comunicarea programului de activități",
    data:
      "Nume și prenume, data nașterii, telefon, email, datele părinților sau tutorilor legali (pentru minori)",
    legalBasis: "Executarea contractului de înscriere – art. 6 alin. (1) lit. b) GDPR",
    retention:
      "Pe durata calității de membru și încă 3 ani după încetarea acesteia (termenul general de prescripție)",
  },
  {
    purpose:
      "Emiterea de documente (facturi, adeverințe, diplome) și îndeplinirea obligațiilor legale, inclusiv față de federațiile sportive",
    data: "Nume și prenume, data nașterii, date de facturare",
    legalBasis: "Obligație legală – art. 6 alin. (1) lit. c) GDPR",
    retention:
      "Termenele prevăzute de legislația financiar-contabilă (Legea contabilității nr. 82/1991) și de reglementările sportive aplicabile",
  },
  {
    purpose: "Informarea privind evenimente speciale sau campanii ale clubului",
    data: "Nume, email, telefon",
    legalBasis: "Consimțământ – art. 6 alin. (1) lit. a) GDPR",
    retention: "Până la retragerea consimțământului (dezabonare)",
  },
  {
    purpose: "Securitatea site-ului și prevenirea abuzurilor (de exemplu, a spamului prin formular)",
    data: "Adresă IP, date tehnice de acces",
    legalBasis: "Interes legitim – art. 6 alin. (1) lit. f) GDPR",
    retention: "Conform politicilor furnizorilor de hosting și formulare, în general sub 30 de zile",
  },
];

const PROCESSORS: { name: string; role: string; location: string }[] = [
  {
    name: "Vercel Inc.",
    role: "Găzduirea site-ului",
    location: "SUA",
  },
  {
    name: "Web3Forms",
    role: "Transmiterea mesajelor trimise prin formularul de contact",
    location: "În afara SEE",
  },
  {
    name: "Calendly LLC",
    role: "Programarea ședințelor",
    location: "SUA",
  },
  {
    name: "Google Ireland Ltd. / Google LLC",
    role: "Google Tag Manager, Google Maps",
    location: "UE / SUA",
  },
  {
    name: "CookieYes Limited",
    role: "Gestionarea consimțământului pentru cookie-uri",
    location: "Regatul Unit",
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="bg-[#001a00] min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl font-bold text-center text-[#a6b6e0] tracking-wide mb-10"
          style={{ fontFamily: "Archivo, sans-serif" }}
        >
          Politică de Confidențialitate
        </h1>

        <div
          className="space-y-8 text-[#a6b6e0] tracking-wide"
          style={{ fontFamily: "Archivo, sans-serif" }}
        >
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Cine suntem</h2>
            <p>
              Clubul de Șah "The Square" respectă confidențialitatea datelor
              personale ale tuturor membrilor săi – copii, părinți și adulți.
              Această politică explică, în conformitate cu art. 13 din
              Regulamentul (UE) 2016/679 (GDPR), ce date prelucrăm, în ce scop,
              pe ce temei legal și cât timp le păstrăm.
            </p>
            <p className="mt-2">
              <strong>Operatorul datelor:</strong>
              <br />
              Denumire: ACS The Square
              <br />
              Adresă: Strada Corbeni 34, București, Sector 2, România
              <br />
              Email: contact@thesquarechessclub.com
              <br />
              Telefon: +40742898793
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Ce date personale colectăm
            </h2>
            <p>Colectăm următoarele date personale:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Nume și prenume</li>
              <li>Data nașterii</li>
              <li>Număr de telefon</li>
              <li>Adresă de email</li>
              <li>Alte informații furnizate voluntar</li>
              <li>Datele părinților sau tutorilor legali (pentru minori)</li>
              <li>
                Date tehnice despre navigare, colectate prin cookie-uri, conform{" "}
                <Link to="/cookie-policy" className="underline hover:text-white">
                  Politicii de Cookie-uri
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. Scopurile, temeiul legal și durata păstrării
            </h2>
            <div className="space-y-4">
              {PROCESSING.map((item) => (
                <div
                  key={item.purpose}
                  className="rounded-lg border border-[#a6b6e0]/20 p-4"
                >
                  <h3 className="font-semibold mb-2">{item.purpose}</h3>
                  <dl className="text-sm space-y-1">
                    <div>
                      <dt className="inline font-semibold">Date: </dt>
                      <dd className="inline">{item.data}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold">Temei legal: </dt>
                      <dd className="inline">{item.legalBasis}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold">Durata păstrării: </dt>
                      <dd className="inline">{item.retention}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
            <p className="mt-4">
              La expirarea acestor termene, datele sunt șterse sau
              anonimizate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Cui transmitem datele
            </h2>
            <p>
              Nu vindem și nu închiriem datele dumneavoastră. Pentru a
              funcționa, folosim însă următorii furnizori (persoane
              împuternicite), care prelucrează datele doar în numele nostru și
              conform instrucțiunilor noastre:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              {PROCESSORS.map((processor) => (
                <li key={processor.name}>
                  <strong>{processor.name}</strong> – {processor.role} (
                  {processor.location})
                </li>
              ))}
            </ul>
            <p className="mt-2">
              Dacă ne contactați prin WhatsApp, mesajele sunt prelucrate și de
              WhatsApp Ireland Ltd. (Meta), conform propriei politici de
              confidențialitate.
            </p>
            <p className="mt-2">
              De asemenea, putem transmite date autorităților publice și
              federațiilor sportive atunci când legea sau regulamentele
              competițiilor ne obligă.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Transferuri internaționale
            </h2>
            <p>
              Unii dintre furnizorii de mai sus prelucrează date în afara
              Spațiului Economic European, în special în SUA. Aceste
              transferuri se fac doar cu garanții adecvate, conform cap. V
              GDPR: decizia de adecvare a Comisiei Europene pentru Regatul Unit,
              decizia de adecvare EU-US Data Privacy Framework (pentru
              furnizorii certificați) sau clauzele contractuale standard
              aprobate de Comisia Europeană. Ne puteți cere o copie a acestor
              garanții la adresa de email de mai sus.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Stocarea și protecția datelor
            </h2>
            <p>
              Datele sunt păstrate în siguranță, pe servere protejate,
              accesibile doar personalului autorizat. Aplicăm măsuri tehnice și
              organizatorice pentru protecția datelor personale.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Drepturile dumneavoastră
            </h2>
            <p>Aveți următoarele drepturi:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Dreptul de acces la date</li>
              <li>Dreptul la rectificare</li>
              <li>Dreptul la ștergere</li>
              <li>Dreptul la restricționarea prelucrării</li>
              <li>Dreptul de opoziție</li>
              <li>Dreptul la portabilitatea datelor</li>
              <li>
                Dreptul de a vă retrage oricând consimțământul, fără a afecta
                legalitatea prelucrării făcute înainte de retragere
              </li>
            </ul>
            <p className="mt-2">
              Pentru solicitări, ne puteți contacta la
              contact@thesquarechessclub.com. Vă răspundem în cel mult o lună
              de la primirea cererii.
            </p>
            <p className="mt-2">
              Nu luăm decizii bazate exclusiv pe prelucrarea automată a
              datelor și nu creăm profiluri.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Dreptul de a depune plângere
            </h2>
            <p>
              Dacă considerați că prelucrarea datelor dumneavoastră încalcă
              legea, aveți dreptul să depuneți o plângere la Autoritatea
              Națională de Supraveghere a Prelucrării Datelor cu Caracter
              Personal (ANSPDCP):
            </p>
            <p className="mt-2">
              B-dul G-ral. Gheorghe Magheru nr. 28-30, Sector 1, București
              <br />
              Email: anspdcp@dataprotection.ro
              <br />
              Website:{" "}
              <a
                href="https://www.dataprotection.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                www.dataprotection.ro
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              9. Politica privind datele minorilor
            </h2>
            <p>
              Datele copiilor sub 16 ani sunt prelucrate doar cu acordul
              părinților sau tutorilor legali, astfel:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>
                Datele unui copil sub 16 ani ne sunt furnizate de părinte sau
                de tutorele legal, care completează formularul, face
                programarea sau înscrierea în numele copilului, cu propriile
                date de contact.
              </li>
              <li>
                Comunicarea privind cursurile și activitățile copilului se
                face cu părintele sau tutorele legal.
              </li>
              <li>
                Părintele sau tutorele legal își poate retrage oricând acordul
                și poate cere accesul la datele copilului sau ștergerea lor,
                la adresa contact@thesquarechessclub.com.
              </li>
              <li>
                Dacă aflăm că am primit date ale unui copil sub 16 ani fără
                acordul părintelui sau tutorelui legal, le ștergem.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              10. Modificări ale politicii de confidențialitate
            </h2>
            <p>
              Putem actualiza această politică periodic. Vă recomandăm să
              verificați pagina pentru eventuale modificări.
            </p>
            <p className="mt-2">Ultima actualizare: Noiembrie 2026</p>
          </section>
        </div>
      </div>
    </section>
  );
}
