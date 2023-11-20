import React, { useState } from "react";

export default function EditPrecio({ precio, patch, update }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrecio, setEditedPrecio] = useState(precio);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditedPrecio(e.target.value);
  };

  const handleBlur = async () => {
    setIsLoading(true);
    const dicPrecio = {
      precio: editedPrecio,
    };
    try {
      await patch(dicPrecio);
      update(editedPrecio);
    } catch (error) {
      console.error("Error updating precio: ", error);
      setEditedPrecio(precio)
    }
    setIsEditing(false);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>actualizando...</div>;
  }

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={editedPrecio}
          onChange={handleInputChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div onClick={handleEdit}>$ {editedPrecio}</div>
      )}
    </div>
  );
}
