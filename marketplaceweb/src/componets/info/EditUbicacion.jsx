import React, { useState } from "react";

export default function EditUbicacion({ ubicacion, patch, reload, tag }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUbicacion, setEditedUbicacion] = useState(ubicacion);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditedUbicacion(e.target.value);
  };

  const handleBlur = async () => {
    if (editedUbicacion === ubicacion) {
      setIsEditing(false);
      return null;
    }
    setIsLoading(true);
    const dicUbicacion = {
      [tag]: editedUbicacion,
    };
    try {
      await patch(dicUbicacion);
    } catch (error) {
      console.error("Error updating ubicacion: ", error);
    }
    setIsEditing(false);
    setIsLoading(false);
    reload();
  };

  if (isLoading) {
    return <div>Actualizando...</div>;
  }

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={editedUbicacion}
          onChange={handleInputChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div
          onClick={handleEdit}
          className="text-xl font-semibold cursor-pointer hover:scale-95"
        >
          {editedUbicacion}
        </div>
      )}
    </div>
  );
}
