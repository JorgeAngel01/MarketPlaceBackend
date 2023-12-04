import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";

export default function TableOrdenes({ ordenes }) {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(1);
  const [tableItems, setTableItems] = useState(null);
  const rowsPerPage = 6;

  const pages = Math.ceil(ordenes.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return ordenes.slice(start, end);
  }, [page, ordenes]);

  useEffect(() => {
    setLoading(true);
    const fetchOrdenesDetails = async () => {
      try {
        const ordersDetails = await Promise.all(
          ordenes.map((orden) =>
            fetch(`api/ordenes/`, {
              method: "GET",
              headers: {
                Authorization: `Token ${token}`,
                Id: orden.orden,
              },
            }).then((res) => res.json())
          )
        );
        const usersDetails = await Promise.all(
          ordenes.map((orden, index) =>
            fetch(`api/usuarios/`, {
              method: "GET",
              headers: {
                Authorization: `Token ${token}`,
                Id: ordersDetails[index].cliente,
              },
            }).then((res) => res.json())
          )
        );
        const productsDetails = await Promise.all(
          ordenes.map((orden) =>
            fetch(`api/productos/`, {
              method: "GET",
              headers: {
                Authorization: `Token ${token}`,
                Id: orden.producto,
              },
            }).then((res) => res.json())
          )
        );

        // Combine data
        const combinedData = ordenes.map((orden, index) => ({
          id: orden.id,
          cliente: usersDetails[index].username,
          fecha: getDate(ordersDetails[index].fecha),
          estado: orden.estado === "2" ? "Entregado" : "Cancelado",
          producto: productsDetails[index].nombre,
          cantidad: orden.cantidad,
          precio: productsDetails[index].precio,
          total: orden.cantidad * productsDetails[index].precio,
        }));

        setTableItems(combinedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenesDetails();
  }, [ordenes, token]);

  const getDate = (timeStamp) => {
    const dateObject = new Date(timeStamp);

    const cdmxTime = dateObject.toLocaleString("en-US", {
      timeZone: "America/Mexico_City",
    });
    return cdmxTime;
  };

  return (
    <div className="w-full h-full flex flex-col justify-start">
      <div className="text-2xl py-2 font-semibold">Pedidos Realizados</div>
      {tableItems && tableItems.length > 0 ? (
        <Table
          aria-label="Tabla Ordenes"
          bottomContent={
            <div className="flex w-full h-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn key="cliente">CLIENTE</TableColumn>
            <TableColumn key="fecha">FECHA</TableColumn>
            <TableColumn key="estado">ESTADO</TableColumn>
            <TableColumn key="producto">PRODUCTO</TableColumn>
            <TableColumn key="cantidad">CANTIDAD</TableColumn>
            <TableColumn key="precio">PRECIO</TableColumn>
            <TableColumn key="total">TOTAL</TableColumn>
          </TableHeader>
          <TableBody items={tableItems} isLoading={loading}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <Spinner
          label="Cargando Tabla..."
          className="h-full w-full justify-center items-center"
        />
      )}
    </div>
  );
}
