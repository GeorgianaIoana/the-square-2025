"use client"; // Dacă folosești Next.js 13+ cu app/

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  const [result, setResult] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target as HTMLFormElement);

    formData.append("access_key", "9e26e303-368c-44fc-86ac-7e427470a472");
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("✅ Form submitted successfully!");
      if (event.target) {
        (event.target as HTMLFormElement).reset();
      }
    } else {
      console.error("Error", data);
      setResult("❌ Something went wrong. Try again later.");
    }
  };

  return (
    <section
      className="bg-[#001a00] border-t border-[#233d36] py-20 px-4"
      id="contact"
    >
      <div className="sm:container mx-auto">
        {/* Titlu */}
        <h2 className="font-archivo tracking-[0.1em] text-2xl sm:text-3xl font-bold text-center text-[#a6b6e0] mb-16">
          Contactează-ne
        </h2>

        {/* Grid adaptiv */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[500px] items-start">
          {/* Coloana 1: Contact Info + Harta */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#a6b6e0] font-archivo tracking-[0.1em] ">
                Așteptăm mesajul tău!
              </h3>
              <div className="space-y-4 text-sm sm:text-base sm:mb-28">
                <p className="flex items-center text-[#a6b6e0] font-archivo tracking-[0.1em] ">
                  <Mail className="w-5 h-5 mr-2" />
                  contact@thesquarechess.com
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

            {/* Harta responsive */}
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg font-archivo tracking-[0.1em]">
              <iframe
                title="Locație Corbeni 34, București"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.0272974536827!2d26.14550747681926!3d44.45684807107302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff4bc8086df3%3A0xe545af59f7a5f5df!2sStrada%20Coreni%2034%2C%20Bucure%C8%99ti%20023025!5e0!3m2!1sro!2sro!4v1712411561872!5m2!1sro!2sro"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Coloana 2: Formular */}
          <div className="w-full max-w-xl bg-[#a6b6e0] rounded-xl shadow-xl px-6 sm:px-10 py-10 sm:py-16 mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Hidden input pentru access_key */}
              <input
                type="hidden"
                name="access_key"
                value="9e26e303-368c-44fc-86ac-7e427470a472"
              />

              <div className="text-center mb-6">
                <h5 className="text-xl sm:text-2xl font-semibold text-[#233d36] font-archivo tracking-[0.1em]">
                  Formular de Contact
                </h5>
              </div>

              {/* Nume */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#233d36] mb-1"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-[#badad5] rounded-lg bg-white/80 placeholder-[#badad5] focus:outline-none focus:ring-2 focus:ring-[#233d36]"
                />
              </div>

              {/* Telefon */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[#233d36] mb-1"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  pattern="^[0-9-+\\s()]*$"
                  required
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border border-[#badad5] rounded-lg bg-white/80 placeholder-[#badad5] focus:outline-none focus:ring-2 focus:ring-[#233d36]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#233d36] mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-[#badad5] rounded-lg bg-white/80 placeholder-[#badad5] focus:outline-none focus:ring-2 focus:ring-[#233d36]"
                />
              </div>

              {/* Mesaj */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#233d36] mb-1"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="Comment"
                  className="w-full px-4 py-2 border border-[#badad5] rounded-lg bg-white/80 placeholder-[#badad5] focus:outline-none focus:ring-2 focus:ring-[#233d36]"
                ></textarea>
              </div>

              {/* Buton submit */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#233d36] text-white font-semibold rounded-lg hover:bg-[#a6b6e0] transition-colors duration-300"
                >
                  Contact Us
                </button>
              </div>

              {/* Feedback result */}
              {result && (
                <p className="text-center text-sm text-green-700 pt-4">
                  {result}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
