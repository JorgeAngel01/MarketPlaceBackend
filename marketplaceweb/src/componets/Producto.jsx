"use client";
import React, { useState } from "react";
import EstadoButton from "./EstadoButton";

export default function Producto({ producto }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const patchProduct = async (rawBody) => {
    console.log("raw body", rawBody);
    try {
      const response = await fetch("api/productos", {
        method: "PATCH",
        headers: {
          // Authorization: `Token ${token}`,
          Id: producto.id,
        },
        body: JSON.stringify(rawBody),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error Patching Product: ", error);
    }
  };
  const updateEstado = (newEstado) => {
    producto.estado = newEstado;
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <div
      className={`w-full p-4 bg-yellow-500 rounded-lg flex flex-row justify-between items-center overflow-hidden ${
        isExpanded ? "h-48" : "h-14"
      } transition-all duration-100`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isExpanded ? (
        <div className="h-full w-full flex flex-col justify-between">
          <div>{producto.nombre}</div>
          <div className="w-full flex flex-row justify-between">
            <div>Precio:</div>
            <div>$ {producto.precio}</div>
          </div>
          <div className="w-full flex flex-row justify-between">
            <div>Estado:</div>
            <EstadoButton
              estado={producto.estado === "1" ? true : false}
              patch={patchProduct}
              update={updateEstado}
            />
          </div>
          <div>Descripcion:</div>
          <div className="text-justify">{producto.descripcion}</div>
        </div>
      ) : (
        <>
          <div>{producto.nombre}</div>
          <div>$ {producto.precio}</div>
        </>
      )}
    </div>
  );
}
