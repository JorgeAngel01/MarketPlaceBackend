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

  useEffect(() => {
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
          console.log(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      getReviews();
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col">
      <Button color="secondary" onPress={onOpen}>
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
              <ModalBody>
                {fetchedReviews.length > 0 &&
                  fetchedReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
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
