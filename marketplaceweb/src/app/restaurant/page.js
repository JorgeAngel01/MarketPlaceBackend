"use client";
import { useState } from "react";
import InfoCol from "@/componets/info/InfoCol";
import Column from "@/componets/Column";
import ProductCol from "@/componets/ProductsCol";
import PageTabs from "@/componets/PageTab";
import AdminOrdenes from "@/componets/AdminOrdenes";

export default function Page() {
  const token = localStorage.getItem("token");
  const propietarioName = localStorage.getItem("username");

  const [idRestaurante, setIdRestaurante] = useState();

  const handleDataFetched = (data) => {
    setIdRestaurante(data);
  };

  return (
    <PageTabs
      key="restaurante"
      type="Restaurante"
      tab1={
        <div className="h-full w-full grid grid-cols-2 shadow-md rounded-sm text-black">
          <Column>
            <InfoCol
              propietario={propietarioName}
              token={token}
              onDataFetched={handleDataFetched}
            />
          </Column>
          <Column>
            {idRestaurante ? (
              <ProductCol id={idRestaurante} token={token} type="rest" />
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
      }
      tab2={
        idRestaurante ? (
          <AdminOrdenes id={idRestaurante} type="restaurante" token={token} />
        ) : (
          <div>Cargando...</div>
        )
      }
      tab3={<div></div>}
    />
  );
}
