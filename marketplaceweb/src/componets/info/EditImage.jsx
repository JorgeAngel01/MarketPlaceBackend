import React, { useState } from "react";

const EditImage = ({ imageUrl, patch, field, reload }) => {
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState(imageUrl);

  const handleImageClick = () => {
    setEditing(true);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const isValidUrl = isValidURL(inputValue);

    if (isValidUrl) setNewImageUrl(e.target.value);
  };

  const handleInputBlur = async () => {
    setIsLoading(true);
    const dicNombre = {
      [field]: newImageUrl,
    };
    try {
      await patch(dicNombre);
    } catch (error) {
      console.error("Error updating image: ", error);
      reload();
    }
    setEditing(false);
    setIsLoading(false);
  };

  const isValidURL = (str) => {
    // eslint-disable-next-line no-useless-escape
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    return !!pattern.test(str);
  };

  return (
    <div>
      {editing ? (
        <input
          type="text"
          value={newImageUrl}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-full"
        />
      ) : (
        <img
          src={newImageUrl}
          alt="Agregue una Imagen"
          className="w-full hover:scale-95 cursor-pointer"
          onClick={handleImageClick}
        />
      )}
    </div>
  );
};

export default EditImage;
