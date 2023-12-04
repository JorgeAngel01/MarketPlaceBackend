"use client";
import { useEffect, useState } from "react";
import Pedido from "./Pedido";

export default function PedidosCol({ pedidos }) {
  const [items, setItems] = useState(pedidos);

  useEffect(() => {
    console.log(items);
    
  }, []);

  return (
    <div className="w-96 h-full flex flex-col justify-between">
      <div className="text-2xl py-2 font-semibold">Nuevos Pedidos</div>
      <div className="h-full w-full p-6 bg-white rounded-lg space-y-4 overflow-y-auto snap-y">
        {items && items.map((item) => <Pedido key={item.id} item={item} />)}
      </div>
    </div>
  );
}
