import React, { useState } from "react";

export default function EstadoButton({ estado, patch, update }) {
  const [inStock, setInStock] = useState(estado);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setInStock(!inStock);

    try {
      if (inStock) {
        await patch({ estado: "2" });
        update("2");
      } else {
        await patch({ estado: "1" });
        update("1");
      }
    } catch (error) {
      console.error("Error updating estado: ", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="cursor-pointer">actualizando...</div>;
  }

  return (
    <div onClick={handleClick} className="cursor-pointer hover:scale-110">
      {inStock ? (
        <div className="text-green-700">En Stock</div>
      ) : (
        <div className="text-red-700">Agotado</div>
      )}
    </div>
  );
}
