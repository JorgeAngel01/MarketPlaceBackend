import React, { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import RatingStarts from "./RatingStarts";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function ReviewsModal({ query, value, btnText, title, score }) {
  const token = localStorage.getItem("token");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fetchedReviews, setFetchedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (isOpen) {
      const getReviews = async () => {
        try {
          const response = await fetch("api/reviews", {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
              [query]: [value],
            },
          });
          const data = await response.json();
          setFetchedReviews(data);
          setIsLoading(false);
          console.log(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      getReviews();
    }
  }, [isOpen]);

  return (
    <div className="w-full flex flex-col">
      <Button
        color="secondary"
        onPress={onOpen}
        fullWidth={true}
        className="hover:scale-105"
      >
        {btnText}
        <RatingStarts score={score} />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                {title}
              </ModalHeader>
              <ModalBody className="text-black">
                {isLoading ? (
                  <p>Cargando...</p>
                ) : fetchedReviews.length > 0 ? (
                  fetchedReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))
                ) : (
                  <p>No se encontraron reviews</p>
                )}
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
    </div>
  );
}
