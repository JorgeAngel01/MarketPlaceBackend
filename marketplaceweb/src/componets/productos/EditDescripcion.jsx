import React, { useState } from "react";

export default function EditDescripcion({ descripcion, patch, update }) {
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
      update(editedDescripcion);
    } catch (error) {
      console.error("Error updating descripcion: ", error);
      setEditedDescripcion(descripcion)
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
          value={editedDescripcion}
          onChange={handleInputChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div onClick={handleEdit} className="text-justify cursor-pointer hover:scale-90" >{editedDescripcion}</div>
      )}
    </div>
  );
}
