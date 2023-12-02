import React, { useEffect, useState } from "react";
import RatingStars from "./RatingStarts";
import { Card, CardHeader, CardBody, Divider, Avatar } from "@nextui-org/react";

export default function ReviewCard({ review }) {
  const token = localStorage.getItem("token");
  const dateObject = new Date(review.fecha);
  const fecha = dateObject.toISOString().split("T")[0];
  const [usuario, setUsuario] = useState();

  useEffect(() => {
    const getUsuario = async () => {
      try {
        const response = await fetch("api/usuarios", {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            Id: [review.autor],
          },
        });
        const data = await response.json();
        setUsuario(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getUsuario();
  }, []);

  return (
    <div>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Avatar />
          <div className="flex flex-col">
            {usuario ? (
              <p className="text-md">
                {usuario.first_name} {usuario.last_name}
              </p>
            ) : (
              "Cargado..."
            )}
            <RatingStars score={review.calificacion} />
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{fecha}</p>
          <p>{review.contenido}</p>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}
