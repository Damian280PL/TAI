import React from "react";
import "./CustomerReviews.css";

const CustomerReviews = () => {
  return (
    <div className="reviews-container">
      <h3 className="reviews-title">Opinie klientów</h3>
      <div className="reviews-rating">
        <span className="star">★ ★ ★ ★ ★</span>
        <span className="rating-score">4.9/5</span>
        <span className="reviews-count">(1363 opinie)</span>
      </div>
      
      <div className="review">
        <p className="review-text">"Świetna obsługa i doskonałe samochody! Bardzo polecam!"</p>
        <p className="review-author">- Jan Kowalski</p>
      </div>

      <div className="review">
        <p className="review-text">"Samochód czysty, dobrze przygotowany, szybki i bezproblemowy wynajem."</p>
        <p className="review-author">- Anna Nowak</p>
      </div>
    </div>
  );
};

export default CustomerReviews;
