import React, { useState } from "react";
import {
  Image,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaCamera } from "react-icons/fa";

const PhotoButton = ({ imageUrl }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [visible, setVisible] = useState(false);

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
                <Image
                  isZoomed
                  width={520}
                  src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                />
              </ModalBody>
              <ModalFooter>
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
