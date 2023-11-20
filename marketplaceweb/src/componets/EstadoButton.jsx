import React, { useState } from "react";

export default function EstadoButton() {
  const [inStock, setInStock] = useState(true);

  const handleClick = () => {
    // Toggle the inStock state
    setInStock(!inStock);

    // Execute different functions based on the state
    if (inStock) {
      handleOutOfStock();
    } else {
      handleInStock();
    }
  };

  const handleInStock = () => {
    console.log("Product is in stock");
    // Implement in-stock logic here
  };

  const handleOutOfStock = () => {
    console.log("Product is out of stock");
    // Implement out-of-stock logic here
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      {inStock ? "En Stock" : "Agotado"}
    </div>
  );
}

