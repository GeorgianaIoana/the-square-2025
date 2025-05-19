import React from "react";

const Map: React.FC = () => {
  return (
    <section id="map" className="py-20 bg-[#233d36]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#badad5] text-center mb-12 font-archivo">
          Locația Clubului de Șah
        </h2>
        <div className="max-w-4xl mx-auto">
          <iframe
            title="Locație Corbeni 34, București"
            src="https://www.openstreetmap.org/export/embed.html?bbox=26.143507%2C44.455848%2C26.147507%2C44.457848&layer=mapnik&marker=44.456848%2C26.145507"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: "8px" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className="mt-6 text-center">
            <p className="text-[#badad5] text-lg font-archivo">
              Strada Corbeni nr. 34, Sector 2, București
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
