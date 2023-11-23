"use client";
import { useEffect, useState } from "react";
import EditInfoNombre from "./info/EditInfoNombre";
import EditInfoDesc from "./info/EditInfoDesc";
import Producto from "./productos/Producto";
import CreateButton from "./CreateButton";

export default function OneCol({ propietario, token }) {
  const [businessData, setBusinessData] = useState();
  const [productos, setProductos] = useState();

  useEffect(() => {
    const getProveedor = async () => {
      try {
        const response = await fetch("api/busqueda/proveedor", {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            Username: propietario,
          },
        });
        const data = await response.json();
        setBusinessData(data[0]);
        console.log(data);
        return data[0]; // Return the fetched data
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    const getProductos = async (id) => {
      try {
        const response = await fetch("api/busqueda/productos_prov", {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            Id: id,
          },
        });
        const data = await response.json();
        setProductos(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    getProveedor().then((businessData) => {
      if (businessData) getProductos(businessData.id);
    });
  }, []);
  

  const patchProveedor = async (rawBody) => {
    console.log("raw body", rawBody);
    try {
      const response = await fetch("api/proveedor", {
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

  const createProduct = async (rawBody) => {
    console.log("raw body", rawBody);
    try {
      const response = await fetch("api/productos", {
        method: "POST",
        headers: {
          // Authorization: `Token ${token}`,
        },
        body: JSON.stringify(rawBody),
      });
      const data = await response.json();
      console.log(data);
      setProductos([...productos, rawBody]);
    } catch (error) {
      console.error("Error Creating Product: ", error);
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
            patch={patchProveedor}
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
            patch={patchProveedor}
            reload={reloadPage}
          />
        ) : (
          "Cargando..."
        )}
      </div>
      <>
        {productos ? (
          <>
            <div className="w-full flex pr-5 flex-row justify-between">
              <div className="text-2xl pt-2 font-semibold">Productos</div>
              <CreateButton
                tag="proveedores"
                id={businessData.id}
                onClick={createProduct}
              />
            </div>
            <div className="h-full w-full p-6 bg-white rounded-lg space-y-4 overflow-y-scroll snap-y">
              {productos &&
                productos.map((producto) => (
                  <Producto key={producto.id} producto={producto} />
                ))}
            </div>
          </>
        ) : (
          <>
            <div className="text-2xl pt-2 font-semibold">Productos</div>
            <div className="h-full w-full p-6 bg-white rounded-lg space-y-4">
              Cargando...
            </div>
          </>
        )}
      </>
    </>
  );
}
