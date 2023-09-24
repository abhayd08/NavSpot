import React from "react";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import "./Reviews.css";

const Reviews = () => {
  const reviews = [
    {
      name: "John Doe",
      comment:
        "TripAdvise helps me a lot in finding interesting tourist destinations.",
      rating: 5,
      avatar: "/Avatars/avatar-1.webp",
    },
    {
      name: "Jane Smith",
      comment:
        "Thanks to TripAdvise, I can now realize my dream of traveling around the world.",
      rating: 4,
      avatar: "/Avatars/avatar-2.webp",
    },
    {
      name: "Mate",
      comment: "Truly loved it. Keep it up!",
      rating: 4.2,
      avatar: "/Avatars/avatar-3.webp",
    },
    {
      name: "Selena",
      comment: "Good customer support.",
      rating: 4.8,
      avatar: "/Avatars/avatar-4.webp",
    },
    {
      name: "Johnson",
      comment: "Awesome facility and great customer support.",
      rating: 4.2,
      avatar: "/Avatars/avatar-5.webp",
    },
  ];

  return (
    <div className="p-5 pt-12 pb-12 reviews-container">
      <h1 className="font-extrabold text-center text-2xl lg:text-3xl font-sans">
        What our Customer say ?
      </h1>
      <div className="review-list-container">
        <div className="review-list mt-[-25px] pr-4 pl-4">
          {reviews.map((review, index) => (
            <div className="review hover:scale-105" key={index}>
              <Avatar
                src={review.avatar}
                sx={{ width: "48px", height: "48px" }}
              ></Avatar>
              <div className="review-content">
                <div className="review-header">
                  <span className="review-name text-lg">{review.name}</span>
                  <Rating
                    name={`rating-${index}`}
                    value={review.rating}
                    readOnly
                    sx={{ fontSize: "1rem" }}
                  />
                </div>
                <p className="review-comment">~ "{review.comment}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
