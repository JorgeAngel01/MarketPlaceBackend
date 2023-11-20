"use client";
import React, { useState } from "react";

export default function Producto({ producto }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`w-full p-4 bg-yellow-500 rounded-lg flex flex-row justify-between items-center overflow-hidden ${
        isExpanded ? "h-36" : "h-14"
      } hover:scale-90 transition-all duration-100`}
      onClick={toggleExpand}
    >
      {isExpanded ? (
        <>
          <div className="h-full w-1/2 flex flex-col justify-between">
            <Text text="Nombre:" />
            <Text text="Precio:" />
            <Text text="Estado:" />
            <Text text="Descripcion:" />
          </div>
          <div className="h-full w-1/2 flex flex-col justify-between">
            <Text text="Helado de Fresa" />
            <Text text="$ 99.99" />
            <Text text="Activo" />
            <Text text="Variedad de frutas frescas de la temporada" />
          </div>
        </>
      ) : (
        <>
          <div>Nombre</div>
          <div>$ 99.99</div>
        </>
      )}
    </div>
  );
}

function Text({ text }) {
  return <div className="h-6 overflow-hidden">{text}</div>;
}
