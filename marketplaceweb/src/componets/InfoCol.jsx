"use client";
import { useEffect, useState } from "react";
import Map from "./Map";

export default function InfoCol({ propietario, token }) {
  const [businessData, setBusinessData] = useState();

  useEffect(() => {
    const getRestaurante = async () => {
      try {
        const response = await fetch("api/restaurante", {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            Username: propietario,
          },
        });
        const data = await response.json();
        setBusinessData(data[0]);
        console.log(data);
        console.log(businessData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getRestaurante();
  }, []);

  return (
    <>
      <div className="text-4xl font-semibold">
        {businessData ? businessData.nombre : "Cargando..."}
      </div>
      <div className="text-xl text-justify">
        {businessData ? businessData.descripcion : "Cargando..."}
      </div>
      {businessData ? (
        businessData.latitud ? (
          <>
            <div className="space-y-2">
              <div className="text-2xl font-semibold">Ubicacion</div>
              <div className="grid grid-cols-2">
                <div>
                  <MidText text="Latitud:" />
                  <MidText text="Longitud:" />
                </div>
                <div>
                  <MidText text={businessData.latitud} />
                  <MidText text={businessData.longitud} />
                </div>
              </div>
            </div>
            <Map
              latitude={businessData.latitud}
              longitude={businessData.longitud}
            />
          </>
        ) : (
          "Cargando Ubicacion..."
        )
      ) : undefined}
    </>
  );
}

function MidText({ text }) {
  return <div className="text-xl font-semibold">{text}</div>;
}
