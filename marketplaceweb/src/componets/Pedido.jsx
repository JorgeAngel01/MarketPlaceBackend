"use client";
import React, { useState, useEffect } from "react";
import { Button, Skeleton } from "@nextui-org/react";

export default function Pedido({ item, update }) {
  const token = localStorage.getItem("token");
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orden, setOrden] = useState();
  const [user, setUser] = useState();
  const [producto, setProducto] = useState();

  useEffect(() => {
    const getJoinData = async () => {
      try {
        const resOrden = await fetch(`api/ordenes`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            Id: item.orden,
          },
        });
        const dataOrden = await resOrden.json();
        setOrden(dataOrden);

        // const resUser = await fetch(`api/usuarios`, {
        //   method: "GET",
        //   headers: {
        //     Authorization: `Token ${token}`,
        //     Id: orden.cliente,
        //   },
        // });
        // const dataUser = await resUser.json();
        // setUser(dataUser);

        const resProduto = await fetch(`api/productos`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            Id: item.producto,
          },
        });
        const dataProducto = await resProduto.json();
        setProducto(dataProducto);
        console.log(dataProducto);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    getJoinData();
  }, [item]);

  const patchProduct = async (rawBody) => {
    console.log("raw body", rawBody);
    try {
      const response = await fetch("api/productos", {
        method: "PATCH",
        headers: {
          // Authorization: `Token ${token}`,
          Id: item.id,
        },
        body: JSON.stringify(rawBody),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error Patching Product: ", error);
    }
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };
  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <Skeleton isLoaded={!loading} className="rounded-lg">
      <div
        className={`w-full p-4 bg-yellow-500 rounded-lg flex flex-row justify-between items-center overflow-hidden hover:snap-end ${
          isExpanded ? "h-40" : "h-14"
        } transition-all duration-100`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isExpanded ? (
          <div className="h-full w-full flex flex-col justify-between">
            <div>{producto.nombre}</div>
            <div className="w-full flex flex-row justify-between">
              <div>Cantidad:</div>
              <div>{item.cantidad}</div>
            </div>
            <div className="w-full flex flex-row justify-between">
              <div>Precio:</div>
              <div>$ {producto.precio}</div>
            </div>
            <div className="w-full flex flex-row justify-between">
              <div>Total:</div>
              <div>$ {(item.cantidad * producto.precio).toFixed(2)}</div>
            </div>
            <div className="w-full flex flex-row gap-x-4 justify-between"></div>
          </div>
        ) : (
          <>
            {producto ? (
              <div>
                {item.cantidad} x {producto.nombre}
              </div>
            ) : (
              "Cargando..."
            )}
          </>
        )}
      </div>
    </Skeleton>
  );
}
