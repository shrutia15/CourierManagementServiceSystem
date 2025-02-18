import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomerNavbar from "../components/NavBars/customerNavbar";


const FeedbackPage = () => {
  
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [userId, setUserId] = useState("");
  const {orderId} =useParams();
  console.log("order id "+orderId )

  useEffect(() => {
    // Retrieve orderId and userId from session storage
    const storedUserId = sessionStorage.getItem("userId");

    if (storedUserId && orderId) {
      setUserId(storedUserId);
    } else {
      alert("User or Order not found, please log in.");
      //navigate("/login");
    }
  }, [navigate,orderId]);

  const handleRatingClick = (starValue) => {
    setRating(starValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !reviewText.trim()) {
      alert("Please provide a rating and a review.");
      return;
    }

    const reviewData = {
      rating,
      reviewText,
    };

    try {
      const url = `http://localhost:8080/customer/add_review/${orderId}/${userId}`;
      const token = sessionStorage['token'];
      const response = await axios.post(url, reviewData, {
        headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        alert("Thank you for your feedback!");
        navigate("/customer/place-order"); // Redirect to orders page after submission
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div>
    <CustomerNavbar/>
    <div className="feedback-container">
      <h2>Rate Your Experience</h2>

      {/* Star Rating */}
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "star filled" : "star"}
            onClick={() => handleRatingClick(star)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review Input */}
      <textarea
        className="feedback-text"
        placeholder="Write your feedback..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Feedback
      </button>
    </div>
    <style>
    {`
    .feedback-container {
  width: 50%;
  margin: 50px auto;
  text-align: center;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
}

.star-rating {
  font-size: 30px;
  margin: 10px 0;
}

.star {
  cursor: pointer;
  color: lightgray;
  transition: color 0.3s;
}

.star.filled {
  color: gold;
}

.feedback-text {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 10px;
}

.submit-btn {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #0056b3;
}

    `}
    </style>
    </div>
  );
};

export default FeedbackPage;