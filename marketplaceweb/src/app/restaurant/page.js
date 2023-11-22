"use client";
import { useState } from "react";
import InfoCol from "@/componets/info/InfoCol";
import Column from "@/componets/Column";
import ProductCol from "@/componets/ProductsCol";
import AuthGuard from "../auth/authGuard/page";

export default function Page() {
    const token = localStorage.getItem("token")
    const propietarioName= localStorage.getItem("username")

  const [idRestaurante, setIdRestaurante] = useState();

  const handleDataFetched = (data) => {
    setIdRestaurante(data);
  };

  return (
    <AuthGuard>
      <div className="h-full w-full grid grid-cols-2 shadow-md rounded-sm text-black">
        <Column>
          <InfoCol
            propietario= {propietarioName}
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
      </AuthGuard>
  );
}
