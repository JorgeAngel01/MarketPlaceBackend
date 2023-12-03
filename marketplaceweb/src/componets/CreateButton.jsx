import React, { useState } from "react";

const CreateButton = ({ tag, id, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    const dicBody = {
      nombre: "Cambiar Nombre",
      descripcion: "Cambiar Descripcion",
      precio: "0.00",
      estado: "2",
      [tag]: [id],
    };
    try {
      await onClick(dicBody);
    } catch (error) {
      console.error("Error Creating Product: ", error);
    }
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleOnClick}
      className="my-2 bg-green-500 hover:scale-110 text-white font-bold py-2 px-4 rounded-lg"
    >
      {isLoading ? "creando..." : "Crear"}
    </button>
  );
};

export default CreateButton;
