import React, { useState } from "react";

export default function EditInfoDesc({ descripcion, patch, reload }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescripcion, setEditedDescripcion] = useState(descripcion);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditedDescripcion(e.target.value);
  };

  const handleBlur = async () => {
    setIsLoading(true);
    const dicDescripcion = {
      descripcion: editedDescripcion,
    };
    try {
      await patch(dicDescripcion);
    } catch (error) {
      console.error("Error updating descripcion: ", error);
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
          value={editedDescripcion}
          onChange={handleInputChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div onClick={handleEdit} className="cursor-pointer hover:scale-95">
          {editedDescripcion}
        </div>
      )}
    </div>
  );
}
