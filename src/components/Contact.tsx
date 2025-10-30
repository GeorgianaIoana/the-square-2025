import React, { useMemo, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContactMap from "./ContactMap";
import type { ContactSubmission } from "../types/contact";

const STORAGE_KEY = "contactFormDraft";
const ACCESS_KEY = "9e26e303-368c-44fc-86ac-7e427470a472";

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
  const [formValues, setFormValues] = useState<ContactSubmission>(
    () => readDraft() ?? initialFormState
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);
    setStatusMessage("Sending...");

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    formData.set("access_key", ACCESS_KEY);
    formData.set("name", formValues.name.trim());
    formData.set("phone", formValues.phone.trim());
    formData.set("email", formValues.email.trim());
    formData.set("message", formValues.message.trim());

    const submission: ContactSubmission = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatusMessage("✅ Mulțumim! Mesajul a fost trimis cu succes.");

        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(
            "lastContactSubmission",
            JSON.stringify(submission)
          );
        }

        setTimeout(() => {
          clearDraft();
          setFormValues(initialFormState);
          navigate("/thank-you", { state: { submission } });
        }, 1500);
      } else {
        console.error("Error", data);
        setStatusMessage("❌ Something went wrong. Try again later.");
      }
    } catch (error) {
      console.error("Network error", error);
      setStatusMessage("❌ A apărut o problemă de rețea. Încearcă din nou.");
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
        {/* Titlu */}
        <h2 className="font-archivo tracking-[0.1em] text-2xl sm:text-3xl font-bold text-center text-[#a6b6e0] mb-16">
          Contactează-ne
        </h2>

        {/* Grid adaptiv */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Coloana 1: Contact Info + Harta */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#a6b6e0] font-archivo tracking-[0.1em] ">
                Așteptăm mesajul tău!
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

          {/* Coloana 2: Formular */}
          <div className="w-full max-w-lg lg:max-w-xl bg-[#a6b6e0] rounded-xl shadow-xl px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-16 mx-auto mb-10 sm:mb-28">
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="text-center mb-6">
                <h5 className="text-xl sm:text-2xl font-semibold text-[#233d36] font-archivo tracking-[0.1em]">
                  Formular de Contact
                </h5>
              </div>

              {/* Nume */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm sm:text-base font-medium text-[#233d36] mb-2"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-3 sm:px-4 py-3 sm:py-2 border border-[#badad5] rounded-lg bg-white placeholder-[#233d36]/60 focus:outline-none focus:ring-2 focus:ring-[#233d36] focus:border-[#233d36] text-sm sm:text-base text-[#233d36] transition-colors duration-200"
                />
              </div>

              {/* Telefon */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm sm:text-base font-medium text-[#233d36] mb-2"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  pattern="^[0-9]*$"
                  value={formValues.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone Number"
                  inputMode="numeric"
                  className="w-full px-3 sm:px-4 py-3 sm:py-2 border border-[#badad5] rounded-lg bg-white placeholder-[#233d36]/60 focus:outline-none focus:ring-2 focus:ring-[#233d36] focus:border-[#233d36] text-sm sm:text-base text-[#233d36] transition-colors duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-base font-medium text-[#233d36] mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="w-full px-3 sm:px-4 py-3 sm:py-2 border border-[#badad5] rounded-lg bg-white placeholder-[#233d36]/60 focus:outline-none focus:ring-2 focus:ring-[#233d36] focus:border-[#233d36] text-sm sm:text-base text-[#233d36] transition-colors duration-200"
                />
              </div>

              {/* Mesaj */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm sm:text-base font-medium text-[#233d36] mb-2"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formValues.message}
                  onChange={handleChange}
                  placeholder="Comment"
                  className="w-full px-3 sm:px-4 py-3 sm:py-2 border border-[#badad5] rounded-lg bg-white placeholder-[#233d36]/60 focus:outline-none focus:ring-2 focus:ring-[#233d36] focus:border-[#233d36] text-sm sm:text-base text-[#233d36] transition-colors duration-200"
                ></textarea>
              </div>

              {/* Buton submit */}
              <div className="text-center pt-2 sm:pt-4 sm:pb-0 pb-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 bg-[#233d36] text-[#badad5] font-semibold rounded-lg hover:bg-[#a6b6e0] hover:text-[#233d36] transition-colors duration-300 text-sm sm:text-base touch-manipulation disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Se trimite..." : "Trimite"}
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
