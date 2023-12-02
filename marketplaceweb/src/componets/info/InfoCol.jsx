"use client";
import { useEffect, useState } from "react";
import Map from "../Map";
import EditableText from "../EditableText";
import EditUbicacion from "./EditUbicacion";
import EditImage from "./EditImage";
import ReviewsModal from "../ReviewsModal";
import { Skeleton, Button } from "@nextui-org/react";

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
          <EditableText
            text={businessData.nombre}
            field="nombre"
            patch={patchRestaurante}
            maxLength={30}
          />
        ) : (
          "Cargando..."
        )}
      </div>
      <div className="text-xl text-justify">
        {businessData ? (
          <EditableText
            text={businessData.descripcion}
            field="descripcion"
            patch={patchRestaurante}
            maxLength={100}
          />
        ) : (
          "Cargando..."
        )}
      </div>
      <div>
        {/* <div>{businessData.promedio_calific}</div> */}
        {businessData ? (
          <ReviewsModal
            query="Restaurante"
            value={businessData.id}
            score={businessData.promedio_calific}
            title="Reviews Restaurante"
            btnText="Ver Reviews"
          />
        ) : (
          <Skeleton className="rounded-2xl">
            <Button />
          </Skeleton>
        )}
      </div>
      <div className="h-1/6 overflow-hidden">
        {businessData ? (
          <EditImage
            imageUrl={businessData.banner}
            patch={patchRestaurante}
            reload={reloadPage}
            field="banner"
          />
        ) : (
          <Skeleton className="w-full h-32"/>
        )}
      </div>
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
