"use client";
import { useEffect, useState } from "react";
import Producto from "./Producto";

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

  return (
    <>
      <div className="text-2xl pt-2 font-semibold">Productos</div>
      <div className="h-full w-full p-6 bg-white rounded-lg space-y-4 overflow-y-scroll">
        {productos &&
          productos.map((producto) => (
            <Producto key={producto.id} producto={producto} />
          ))}
      </div>
    </>
  );
}
