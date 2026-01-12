import React, { useEffect, useState } from "react";
import { CheckCircle, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { ContactSubmission } from "../types/contact";

const getStoredSubmission = (): ContactSubmission | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const stored = window.sessionStorage.getItem("lastContactSubmission");
  if (!stored) {
    return null;
  }
  try {
    return JSON.parse(stored) as ContactSubmission;
  } catch (error) {
    console.warn("Failed to parse stored contact submission", error);
    return null;
  }
};

const ThankYouPage = () => {
  const location = useLocation();
  const locationState = location.state as { submission?: ContactSubmission } | null;
  const [submission, setSubmission] = useState<ContactSubmission | null>(
    locationState?.submission ?? getStoredSubmission()
  );

  useEffect(() => {
    if (locationState?.submission) {
      setSubmission(locationState.submission);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          "lastContactSubmission",
          JSON.stringify(locationState.submission)
        );
      }
    } else if (!submission) {
      setSubmission(getStoredSubmission());
    }
  }, [locationState, submission]);

  return (
    <div className="min-h-screen bg-[#001a00] flex items-center justify-center px-4 pt-8 md:pt-16">
      <div className="max-w-2xl w-full">
        <div className="bg-[#a6b6e0] rounded-2xl shadow-2xl p-6 md:p-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-[#233d36] rounded-full md:p-6 p-4">
              <CheckCircle className="w-16 h-16 text-[#badad5]" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#233d36] font-archivo tracking-[0.1em] mb-4">
            Mulțumim pentru mesaj!
          </h1>

          <p className="text-lg text-[#233d36] font-archivo tracking-[0.05em] mb-8 leading-relaxed">
            Mesajul tău a fost trimis cu succes. Echipa noastră îți va răspunde
            în cel mai scurt timp posibil.
          </p>

          <div className="bg-white/60 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-[#233d36] font-archivo tracking-[0.1em] mb-4">
              Contactează-ne direct
            </h3>
            <div className="space-y-3 text-[#233d36]">
              <div className="flex items-center justify-center">
                <Mail className="w-5 h-5 mr-3" />
                <span className="font-archivo tracking-[0.05em]">
                  contact@thesquarechessclub.com
                </span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="w-5 h-5 mr-3" />
                <span className="font-archivo tracking-[0.05em]">
                  0742898793
                </span>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="w-5 h-5 mr-3" />
                <span className="font-archivo tracking-[0.05em]">
                  Str. Corbeni 34, Sector 2, București
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#233d36] rounded-xl p-6 mb-8">
            <h4 className="text-lg font-semibold text-[#badad5] font-archivo tracking-[0.1em] mb-2">
              Ce urmează?
            </h4>
            <p className="text-[#badad5] font-archivo tracking-[0.05em] text-sm leading-relaxed">
              Vom analiza mesajul tău și îți vom răspunde în maximum 24 de ore.
              Dacă ai întrebări urgente, nu ezita să ne contactezi direct.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#233d36] text-[#badad5] font-semibold rounded-lg hover:bg-[#001a00] transition-colors duration-300 font-archivo tracking-[0.1em]"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Înapoi la pagina principală
            </Link>

            <Link
              to="/#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/80 text-[#233d36] font-semibold rounded-lg hover:bg-white transition-colors duration-300 font-archivo tracking-[0.1em]"
            >
              Trimite alt mesaj
            </Link>
          </div>
        </div>

        <div className="text-center mt-8"></div>
      </div>
    </div>
  );
};

export default ThankYouPage;
