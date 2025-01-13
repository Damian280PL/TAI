import React, { useState, useEffect } from 'react';
import './CarCarousel.css';

const images = [
  "/cars/audi.jpg",
  "/cars/ford.jpg",
  "/cars/bmw.jpg",
  "/cars/skoda.jpg",
  "/cars/yaris.jpg",
  "/cars/opel.jpg",
  "/cars/porsche.jpg"
];

const CarCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatyczna zmiana obrazu co 5 sekund
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Funkcje obsługi ręcznej zmiany zdjęć
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        {/* Strzałki do przewijania */}
        <button className="prev-btn" onClick={prevImage}>◀</button>
        <button className="next-btn" onClick={nextImage}>▶</button>

        <div className="carousel" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Car ${index + 1}`} className="carousel-image" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarCarousel;
