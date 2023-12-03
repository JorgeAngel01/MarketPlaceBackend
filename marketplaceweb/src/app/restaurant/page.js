"use client";
import { useState } from "react";
import InfoCol from "@/componets/info/InfoCol";
import Column from "@/componets/Column";
import ProductCol from "@/componets/ProductsCol";
import { Tabs, Tab } from "@nextui-org/react";

export default function Page() {
  const token = localStorage.getItem("token");
  const propietarioName = localStorage.getItem("username");

  const [idRestaurante, setIdRestaurante] = useState();

  const handleDataFetched = (data) => {
    setIdRestaurante(data);
  };

  return (
    <Tabs variant="underlined" aria-label="Tabs variants">
      <Tab key="photos" title="Photos">
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
      </Tab>
      <Tab key="music" title="Music" />
      <Tab key="videos" title="Videos" />
    </Tabs>
  );
}
