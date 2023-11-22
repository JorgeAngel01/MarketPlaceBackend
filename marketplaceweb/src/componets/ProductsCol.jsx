"use client";
import { useEffect, useState } from "react";
import Producto from "./productos/Producto";
import CreateButton from "./CreateButton";

export default function ProductCol({ id, token }) {
  const [productos, setProductos] = useState();

  useEffect(() => {
    const getProductos = async () => {
      try {
        const response = await fetch("api/busqueda/productos_rest", {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            Id: id,
          },
        });
        const data = await response.json();
        setProductos(data);
        console.log(data);
        console.log(productos);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getProductos();
  }, []);

  const createProduct = async (rawBody) => {
    console.log("raw body", rawBody);
    try {
      const response = await fetch("api/productos", {
        method: "POST",
        headers: {
          // Authorization: `Token ${token}`,
        },
        body: JSON.stringify(rawBody),
      });
      const data = await response.json();
      console.log(data);
      setProductos([...productos, rawBody]);
    } catch (error) {
      console.error("Error Creating Product: ", error);
    }
  };

  return (
    <>
      <div className="w-full flex pr-5 flex-row justify-between">
        <div className="text-2xl pt-2 font-semibold">Productos</div>
        <CreateButton tag="restaurantes" id={id} onClick={createProduct} />
      </div>
      <div className="h-full w-full p-6 bg-white rounded-lg space-y-4 overflow-y-scroll">
        {productos &&
          productos.map((producto) => (
            <Producto key={producto.id} producto={producto} />
          ))}
      </div>
    </>
  );
}
