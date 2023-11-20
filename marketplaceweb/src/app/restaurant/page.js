"use client";
import { useState } from "react";
import InfoCol from "@/componets/InfoCol";
import Column from "@/componets/Column";
import ProductCol from "@/componets/ProductsCol";

export default function Page() {
  const token = "e5e0eeb6f8a0d67b303bd3cb067c31d872280e5b";
  // const token = "99a5cb763472faa3c2ccf8158731ca2e5e085b01";
  const [idRestaurante, setIdRestaurante] = useState();

  const handleDataFetched = (data) => {
    setIdRestaurante(data);
  };

  return (
    <div className="h-full w-full grid grid-cols-2 shadow-md rounded-sm text-black">
      <Column>
        <InfoCol
          propietario="sofia"
          token={token}
          onDataFetched={handleDataFetched}
        />
      </Column>
      <Column>
        {idRestaurante ? (
          <ProductCol id={idRestaurante} token={token} />
        ) : (
          <>
            <div className="text-2xl pt-2 font-semibold">Productos</div>
            <div className="h-full w-full p-6 bg-white rounded-lg space-y-4">
              Cargando...
            </div>
          </>
        )}
      </Column>
    </div>
  );
}
