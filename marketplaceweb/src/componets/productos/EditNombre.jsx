import React, { useState } from "react";

export default function EditNombre({ nombre, patch, update }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNombre, setEditedNombre] = useState(nombre);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditedNombre(e.target.value);
  };

  const handleBlur = async () => {
    setIsLoading(true);
    const dicNombre = {
      nombre: editedNombre,
    };
    try {
      await patch(dicNombre);
      update(editedNombre);
    } catch (error) {
      console.error("Error updating nombre: ", error);
      setEditedNombre(nombre);
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
          value={editedNombre}
          onChange={handleInputChange}
          onBlur={handleBlur}
          autoFocus
          maxLength={50}
        />
      ) : (
        <div
          onClick={handleEdit}
          className="cursor-pointer hover:scale-95"
        >
          {editedNombre}
        </div>
      )}
    </div>
  );
}
