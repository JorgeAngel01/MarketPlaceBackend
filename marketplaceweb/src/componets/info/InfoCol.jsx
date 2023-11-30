"use client";
import { useEffect, useState } from "react";
import Map from "../Map";
import EditInfoNombre from "./EditInfoNombre";
import EditInfoDesc from "./EditInfoDesc";
import EditUbicacion from "./EditUbicacion";
import EditImage from "./EditImage";

export default function InfoCol({ propietario, token, onDataFetched }) {
  const [businessData, setBusinessData] = useState();

  useEffect(() => {
    const getRestaurante = async () => {
      try {
        const response = await fetch("api/busqueda/restaurante", {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            Username: propietario,
          },
        });
        const data = await response.json();
        setBusinessData(data[0]);
        onDataFetched(data[0].id);
        console.log(data);
        console.log(businessData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getRestaurante();
  }, []);

  const patchRestaurante = async (rawBody) => {
    console.log("raw body", rawBody);
    try {
      const response = await fetch("api/restaurantes", {
        method: "PATCH",
        headers: {
          // Authorization: `Token ${token}`,
          Id: businessData.id,
        },
        body: JSON.stringify(rawBody),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error Patching Product: ", error);
    }
  };
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="text-4xl font-semibold">
        {businessData ? (
          <EditInfoNombre
            nombre={businessData.nombre}
            patch={patchRestaurante}
            reload={reloadPage}
          />
        ) : (
          "Cargando..."
        )}
      </div>
      <div className="text-xl text-justify">
        {businessData ? (
          <EditInfoDesc
            descripcion={businessData.descripcion}
            patch={patchRestaurante}
            reload={reloadPage}
          />
        ) : (
          "Cargando..."
        )}
      </div>
      {businessData ? (
        <EditImage
          imageUrl={businessData?.banner}
          patch={patchRestaurante}
          reload={reloadPage}
          field="banner"
        />
      ) : (
        "Cargando..."
      )}
      {businessData ? (
        <>
          <div className="space-y-2">
            <div className="text-2xl font-semibold">Ubicacion</div>
            <div className="grid grid-cols-2">
              <div>
                <MidText text="Latitud:" />
                <MidText text="Longitud:" />
              </div>
              <div>
                <EditUbicacion
                  ubicacion={businessData.latitud}
                  patch={patchRestaurante}
                  reload={reloadPage}
                  tag="latitud"
                />
                <EditUbicacion
                  ubicacion={businessData.longitud}
                  patch={patchRestaurante}
                  reload={reloadPage}
                  tag="longitud"
                />
              </div>
            </div>
          </div>
          <Map
            latitude={businessData.latitud}
            longitude={businessData.longitud}
          />
        </>
      ) : undefined}
    </>
  );
}

function MidText({ text }) {
  return <div className="text-xl font-semibold">{text}</div>;
}
