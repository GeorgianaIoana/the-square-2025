import React from "react";
import { JSX } from "react/jsx-runtime";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2851.234567890123!2d26.1147312!3d44.4394113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff0048fa6941%3A0x152bced0c3995902!2sClubul%20Sportiv%20de%20%C8%98ah%20ACS%20THE%20SQUARE!5e0!3m2!1sro!2sro!4v1234567890123!5m2!1sro!2sro";

const ContactMap = React.memo(function ContactMap() {
  return (
    <div className="w-full h-[260px] sm:h-[320px] lg:h-[420px] rounded-xl overflow-hidden shadow-lg font-archivo tracking-[0.1em] relative bg-[#233d36]">
      <iframe
        title="Locație THE SQUARE Chess Club - Str. Corbeni 34, Sector 2, București"
        src={MAP_SRC}
        className="w-full h-full"
        style={{
          border: 0,
        }}
        allowFullScreen
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
});

export default ContactMap;
