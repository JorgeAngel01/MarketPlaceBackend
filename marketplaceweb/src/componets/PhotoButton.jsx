import React, { useState } from "react";
import {
  Image,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaCamera } from "react-icons/fa";
import UpImgButton from "./UpImgButton";

const PhotoButton = ({ url, patch, update }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(url);

  const uploadImage = async (e) => {
    setIsLoading(true);
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      console.warn(formData);

      const response = await fetch("api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setImageUrl(data.url);

      if (data.url && data.url.length > 200) {
        console.error(
          `Text exceeds the maximum length of ${maxLength} characters.`
        );
        setIsLoading(false);
        window.location.reload();
        return;
      }

      const dicImage = {
        image: data.url,
      };
      try {
        await patch(dicImage);
        if (update) update(data.url);
      } catch (error) {
        console.error(`Error updating ${field}: `, error);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        isIconOnly
        color="success"
        aria-label="delete"
        className="hover:scale-110"
        onClick={onOpen}
      >
        <FaCamera />
      </Button>

      <Modal
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="p-4 flex justify-center items-center">
                <Image isZoomed width={520} src={imageUrl} />
              </ModalBody>
              <ModalFooter className="flex flex-row px-4 justify-between">
                <UpImgButton isLoading={isLoading} upload={uploadImage} />
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PhotoButton;
