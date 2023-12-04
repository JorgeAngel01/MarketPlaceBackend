"use client";
import { useState } from "react";
import InfoCol from "@/componets/info/InfoCol";
import Column from "@/componets/Column";
import ProductCol from "@/componets/ProductsCol";
import AdminOrdenes from "@/componets/AdminOrdenes";
import PageTabs from "@/componets/PageTab";

export default function Page() {
  const token = localStorage.getItem("token");
  const propietarioName = localStorage.getItem("username");

  const [idProveedor, setIdProveedor] = useState();

  const handleDataFetched = (data) => {
    setIdProveedor(data);
  };

  return (
    <PageTabs
      key="proveedor"
      type="Proveedor"
      tab1={
        <div className="h-full w-full grid grid-cols-2 shadow-md rounded-sm text-black">
          <Column>
            <InfoCol
              type="proveedor"
              propietario={propietarioName}
              token={token}
              onDataFetched={handleDataFetched}
            />
          </Column>
          <Column>
            {idProveedor ? (
              <ProductCol id={idProveedor} token={token} type="prov" />
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
        idProveedor ? (
          <AdminOrdenes id={idProveedor} type="proveedor" token={token} />
        ) : (
          <div>Cargando...</div>
        )
      }
      tab3={<div></div>}
    />
  );
}
