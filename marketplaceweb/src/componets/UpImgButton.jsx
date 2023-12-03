import React, { useState } from "react";
import { Button } from "@nextui-org/react";

const UpImgButton = ({ isLoading, upload }) => {
  return (
    <>
      <Button
        fullWidth
        isLoading={isLoading}
        as="label"
        htmlFor="file-upload"
        color="primary"
        auto
      >
        Subir Imagen
      </Button>
      <input
        id="file-upload"
        type="file"
        onChange={(e) => upload(e)}
        style={{ display: "none" }}
      />
    </>
  );
};

export default UpImgButton;
