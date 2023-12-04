import { useEffect, useState } from "react";
import TableOrdenes from "./TableOrdenes";
import PedidosCol from "./PedidosCol";
import { Spinner } from "@nextui-org/react";

export default function AdminOrdenes({ id, type, token }) {
  const [loading, setLoading] = useState(true);
  const [ordenes, setOrdenes] = useState(null);
  const [nuevas, setNuevas] = useState(null);

  const fetchOrdenes = async () => {
    setLoading(true);
    try {
      const resItems = await fetch(`api/busqueda/items`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          [type]: id,
        },
      });
      const ordenItems = await resItems.json();
      setOrdenes(ordenItems.filter((ordenItem) => ordenItem.estado !== "0"));
      setNuevas(ordenItems.filter((ordenItem) => ordenItem.estado === "0"));
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdenes();
  }, [id, token]);

  return (
    <div className="h-[720px] w-full flex flex-row p-10 space-x-8 shadow-md rounded-sm text-black">
      {ordenes ? (
        <TableOrdenes ordenes={ordenes} className="place-self-center" />
      ) : (
        <Spinner label="Cargando" color="primary" />
      )}
      {nuevas ? <PedidosCol pedidos={nuevas} update={fetchOrdenes} /> : undefined}
    </div>
  );
}
