"use client";
import { useEffect, useState } from "react";
import Producto from "./productos/Producto";
import CreateButton from "./CreateButton";

export default function ProductCol({ id, token, type }) {
  const [productos, setProductos] = useState();
  const [tag, setTag] = useState();

  const getProductos = async () => {
    try {
      const response = await fetch(`api/busqueda/productos_${type}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          Id: id,
        },
      });
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (type === "rest") setTag("restaurantes");
    if (type === "prov") setTag("proveedores");
    getProductos();
  }, [id, token]);

  const createProduct = async (rawBody) => {
    try {
      const response = await fetch("api/productos", {
        method: "POST",
        headers: {
          // Authorization: `Token ${token}`,
        },
        body: JSON.stringify(rawBody),
      });
      const data = await response.json();
      getProductos();
    } catch (error) {
      console.error("Error Creating Product: ", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="w-full flex flex-row justify-between">
        <div className="text-2xl pt-2 font-semibold">Productos</div>
        <CreateButton tag={tag} id={id} onClick={createProduct} />
      </div>
      <div className="h-[620px] w-full max-h-[620px] p-6 bg-white rounded-lg space-y-4 overflow-y-auto snap-y">
        {productos &&
          productos.map((producto) => (
            <Producto key={producto.id} producto={producto} />
          ))}
      </div>
    </div>
  );
}
