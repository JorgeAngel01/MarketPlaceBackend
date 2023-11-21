import React, { useState } from "react";

export default function EditInfoNombre({ nombre, patch, reload }) {
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
    } catch (error) {
      console.error("Error updating nombre: ", error);
      reload();
    }
    setIsEditing(false);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>Actualizando...</div>;
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
        />
      ) : (
        <div onClick={handleEdit} className="cursor-pointer hover:scale-95">
          {editedNombre}
        </div>
      )}
    </div>
  );
}
