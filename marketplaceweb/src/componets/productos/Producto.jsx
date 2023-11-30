"use client";
import React, { useState } from "react";
import EstadoButton from "./EstadoButton";
import EditNombre from "./EditNombre";
import EditPrecio from "./EditPrecio";
import EditDescripcion from "./EditDescripcion";
import EditImage from "../info/EditImage";

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
  const updateNombre = (newNombre) => {
    producto.nombre = newNombre;
  };
  const updateDescripcion = (newDescripcion) => {
    producto.descripcion = newDescripcion;
  };
  const updateEstado = (newEstado) => {
    producto.estado = newEstado;
  };
  const updatePrecio = (newPrecio) => {
    producto.precio = newPrecio;
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };
  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <div
      className={`scale-up-animation w-full p-4 bg-yellow-500 rounded-lg flex flex-row justify-between items-center overflow-hidden hover:snap-end ${
        isExpanded ? "h-60" : "h-14"
      } transition-all duration-100`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isExpanded ? (
        <div className="h-full w-full flex flex-col justify-between">
          <EditNombre
            nombre={producto.nombre}
            patch={patchProduct}
            update={updateNombre}
          />
          <div className="w-full flex flex-row justify-between">
            <div>Precio:</div>
            <EditPrecio
              precio={producto.precio}
              patch={patchProduct}
              update={updatePrecio}
            />
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
          <div className="grid grid-cols-3 items-center">
            <div className="col-span-2 pr-5">
              <EditDescripcion
                descripcion={producto.descripcion}
                patch={patchProduct}
                update={updateDescripcion}
              />
            </div>
            <div className="col-span-1">
              <EditImage
                imageUrl={producto.image}
                patch={patchProduct}
                field="image"
              />
            </div>
          </div>
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
