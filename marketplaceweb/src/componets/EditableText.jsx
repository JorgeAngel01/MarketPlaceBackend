import React, { useState } from "react";

export default function EditableText({
  text,
  field,
  patch,
  update,
  maxLength,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleBlur = async () => {
    setIsLoading(true);
    if (maxLength && editedText.length > maxLength) {
      console.error(
        `Text exceeds the maximum length of ${maxLength} characters.`
      );
      setIsEditing(false);
      setIsLoading(false);
      window.location.reload();
      return;
    }
    const dicText = {
      [field]: editedText,
    };
    try {
      await patch(dicText);
      if (update) update(editedText);
    } catch (error) {
      console.error(`Error updating ${field}: `, error);
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
          value={editedText}
          onChange={handleInputChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div onClick={handleEdit} className="cursor-pointer hover:scale-95">
          {editedText}
        </div>
      )}
    </div>
  );
}
