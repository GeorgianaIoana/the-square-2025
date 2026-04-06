import React, { useMemo, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import ContactMap from "./ContactMap";
import type { ContactSubmission } from "../types/contact";
import { useLanguage } from "../contexts/LanguageContext";

const STORAGE_KEY = "contactFormDraft";
const ACCESS_KEY = "3a3bc6f4-794b-4588-9dc4-b5ea1eb8be5b";

const initialFormState: ContactSubmission = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

const readDraft = (): ContactSubmission | null => {
  if (typeof window === "undefined") return null;
  const rawValue = window.sessionStorage.getItem(STORAGE_KEY);
  if (!rawValue) return null;
  try {
    const parsed = JSON.parse(rawValue) as Partial<ContactSubmission>;
    return {
      name: parsed.name ?? "",
      phone: parsed.phone ?? "",
      email: parsed.email ?? "",
      message: parsed.message ?? "",
    };
  } catch (error) {
    console.warn("Failed to read contact draft", error);
    window.sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

const persistDraft = (draft: ContactSubmission) => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch (error) {
    console.warn("Failed to persist contact draft", error);
  }
};

const clearDraft = () => {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(STORAGE_KEY);
};

export default function ContactSection() {
  const { t } = useLanguage();
  const [formValues, setFormValues] = useState<ContactSubmission>(
    () => readDraft() ?? initialFormState
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const navigate = useNavigate();

  const memoizedMap = useMemo(() => <ContactMap />, []);

  const handleChange = (
    event:
      | import("react").ChangeEvent<HTMLInputElement>
      | import("react").ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => {
      const sanitizedValue =
        name === "phone" ? value.replace(/\D/g, "") : value;
      const next = { ...prev, [name]: sanitizedValue };
      persistDraft(next);
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    // Validate consent checkbox
    if (!consentChecked) {
      setStatusMessage(t('contact.consentRequired'));
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(t('contact.submitting'));

    // Create clean FormData with only necessary fields
    const formData = new FormData();
    formData.append("access_key", ACCESS_KEY);
    formData.append("name", formValues.name.trim());
    formData.append("phone", formValues.phone.trim());
    formData.append("email", formValues.email.trim());
    formData.append("message", formValues.message.trim());

    // Add recipient email (where the form will be sent)
    formData.append("from_name", formValues.name.trim());
    formData.append("subject", `Mesaj nou de la ${formValues.name.trim()} - THE SQUARE Contact Form`);

    // Add honeypot field (empty string for real users)
    formData.append("botcheck", "");

    // Add consent confirmation
    formData.append("consent", "true");

    const submission: ContactSubmission = {
      name: formValues.name.trim(),
      phone: formValues.phone.trim(),
      email: formValues.email.trim(),
      message: formValues.message.trim(),
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatusMessage(t('contact.success'));

        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(
            "lastContactSubmission",
            JSON.stringify(submission)
          );
        }

        setTimeout(() => {
          clearDraft();
          setFormValues(initialFormState);
          setConsentChecked(false);
          navigate("/thank-you", { state: { submission } });
        }, 1500);
      } else {
        console.error("API Error:", data);
        setStatusMessage(data.message || t('contact.error'));
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatusMessage(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="bg-[#001a00] border-t border-[#233d36] py-20 px-4"
      id="contact"
    >
      <div className="container mx-auto">
        <h2 className="font-archivo tracking-[0.1em] text-2xl sm:text-3xl font-bold text-center text-[#a6b6e0] mb-16">
          {t('contact.title')}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#a6b6e0] font-archivo tracking-[0.1em] ">
                {t('contact.subtitle')}
              </h3>
              <div className="space-y-4 text-sm sm:text-base sm:mb-28">
                <p className="flex items-center text-[#a6b6e0] font-archivo tracking-[0.1em] ">
                  <Mail className="w-5 h-5 mr-2" />
                  contact@thesquarechessclub.com
                </p>
                <p className="flex items-center text-[#a6b6e0] font-archivo tracking-[0.1em] ">
                  <Phone className="w-5 h-5 mr-2" />
                  0742898793
                </p>
                <p className="flex items-center text-[#a6b6e0] font-archivo tracking-[0.1em] ">
                  <MapPin className="w-5 h-5 mr-2" />
                  Str. Corbeni 34, Sector 2, București
                </p>
              </div>
            </div>

            {memoizedMap}
          </div>

          <div className="w-full max-w-lg lg:max-w-xl bg-[#a6b6e0] rounded-xl shadow-xl px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-16 mx-auto mb-10 sm:mb-28">
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              {/* Honeypot field for spam protection - hidden from users */}
              <input
                type="text"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="text-center mb-6">
                <h5 className="text-xl sm:text-2xl font-semibold text-[#233d36] font-archivo tracking-[0.1em]">
                  {t('contact.formTitle')}
                </h5>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm sm:text-base font-medium text-[#233d36] mb-2 transition-colors duration-200"
                >
                  {t('contact.name')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  placeholder={t('contact.name')}
                  className="w-full px-3 sm:px-4 py-3 sm:py-2 border-2 border-[#badad5] rounded-lg bg-white placeholder-[#233d36]/60 focus:outline-none focus:ring-2 focus:ring-[#233d36]/20 focus:border-[#233d36] text-sm sm:text-base text-[#233d36] transition-all duration-300 ease-in-out hover:border-[#233d36]/40"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm sm:text-base font-medium text-[#233d36] mb-2 transition-colors duration-200"
                >
                  {t('contact.phone')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  pattern="^[0-9]*$"
                  value={formValues.phone}
                  onChange={handleChange}
                  required
                  maxLength={15}
                  placeholder={t('contact.phone')}
                  inputMode="numeric"
                  className="w-full px-3 sm:px-4 py-3 sm:py-2 border-2 border-[#badad5] rounded-lg bg-white placeholder-[#233d36]/60 focus:outline-none focus:ring-2 focus:ring-[#233d36]/20 focus:border-[#233d36] text-sm sm:text-base text-[#233d36] transition-all duration-300 ease-in-out hover:border-[#233d36]/40"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-base font-medium text-[#233d36] mb-2 transition-colors duration-200"
                >
                  {t('contact.email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  placeholder={t('contact.email')}
                  className="w-full px-3 sm:px-4 py-3 sm:py-2 border-2 border-[#badad5] rounded-lg bg-white placeholder-[#233d36]/60 focus:outline-none focus:ring-2 focus:ring-[#233d36]/20 focus:border-[#233d36] text-sm sm:text-base text-[#233d36] transition-all duration-300 ease-in-out hover:border-[#233d36]/40"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm sm:text-base font-medium text-[#233d36] mb-2 transition-colors duration-200"
                >
                  {t('contact.message')}
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formValues.message}
                  onChange={handleChange}
                  maxLength={2000}
                  placeholder={t('contact.message')}
                  className="w-full px-3 sm:px-4 py-3 sm:py-2 border-2 border-[#badad5] rounded-lg bg-white placeholder-[#233d36]/60 focus:outline-none focus:ring-2 focus:ring-[#233d36]/20 focus:border-[#233d36] text-sm sm:text-base text-[#233d36] transition-all duration-300 ease-in-out hover:border-[#233d36]/40 resize-y min-h-[100px]"
                ></textarea>
              </div>

              <label
                htmlFor="consent"
                className="group flex items-start gap-3 sm:gap-3.5 cursor-pointer select-none rounded-lg border-2 border-[#233d36]/15 bg-white/40 px-4 py-3.5 transition-all duration-300 ease-in-out hover:bg-white/80 hover:border-[#233d36]/40 hover:shadow-md focus-within:ring-2 focus-within:ring-[#233d36]/20 focus-within:border-[#233d36]"
              >
                {/* Hidden native checkbox */}
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="sr-only peer"
                />

                {/* Custom checkbox visual */}
                <span
                  aria-hidden="true"
                  className={`
                    mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center
                    rounded border-2 transition-all duration-200
                    ${consentChecked
                      ? 'border-[#233d36] bg-[#233d36]'
                      : 'border-[#233d36]/40 bg-white group-hover:border-[#233d36]/60'}
                  `}
                >
                  <svg
                    className={`h-3 w-3 text-white transition-all duration-200 ${consentChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                </span>

                {/* Label text */}
                <span className="text-[13px] sm:text-sm leading-relaxed text-[#233d36]/80 font-archivo tracking-wide">
                  {t('contact.consent')}{' '}
                  <Link
                    to="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#233d36] underline decoration-[#233d36]/30 underline-offset-2 transition-all duration-200 hover:decoration-[#233d36]/70"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t('contact.consentLink')}
                  </Link>
                  <span className="text-red-500 ml-0.5">*</span>
                </span>
              </label>

              <div className="text-center pt-2 sm:pt-4 sm:pb-0 pb-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !consentChecked}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#233d36] text-[#badad5] font-semibold rounded-lg hover:bg-[#a6b6e0] hover:text-[#233d36] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out text-sm sm:text-base touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none active:scale-95"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('contact.submitting')}
                    </span>
                  ) : (
                    t('contact.submit')
                  )}
                </button>
                {statusMessage && (
                  <p
                    className="mt-4 text-sm text-[#233d36]"
                    aria-live="polite"
                    role="status"
                  >
                    {statusMessage}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
