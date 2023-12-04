import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

export default function TableOrdenes({ ordenes }) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(ordenes.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return ordenes.slice(start, end);
  }, [page, ordenes]);

  return (
    <div className="w-full h-full flex flex-col justify-start">
      <div className="text-2xl py-2 font-semibold">Pedidos Realizados</div>
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
          {/* <TableColumn key="cliente">CLIENTE</TableColumn> */}
          {/* <TableColumn key="fecha">FECHA</TableColumn> */}
          <TableColumn key="estado">ESTADO</TableColumn>
          <TableColumn key="producto">PRODUCTO</TableColumn>
          <TableColumn key="cantidad">CANTIDAD</TableColumn>
          {/* <TableColumn key="precio">PRECIO</TableColumn> */}
          {/* <TableColumn key="total">TOTAL</TableColumn> */}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
