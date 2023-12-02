import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ score }) => {
  const totalStars = 5;
  const filledStars = Math.floor(score);
  const hasHalfStar = score % 1 !== 0;

  const renderStars = () => {
    const stars = [];

    // Filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={i} />);
    }

    // Half star (if needed)
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }

    // Remaining empty stars
    const remainingStars = totalStars - (filledStars + (hasHalfStar ? 1 : 0));
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }

    return stars;
  };

  return <div className="flex flex-row">{renderStars()}</div>;
};

export default RatingStars;
