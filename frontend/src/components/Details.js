import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importowanie hooka do uwierzytelniania

const Details = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rentalDate, setRentalDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [protectionPackage, setProtectionPackage] = useState(1);
  const { isAuthenticated } = useAuth(); // Uzyskujemy stan logowania z AuthContext
  const navigate = useNavigate();

  // Pobieranie szczegółów samochodu
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:7042/api/product/${id}`);
        const data = await response.json();
        setCarDetails(data);
      } catch (error) {
        console.error('Błąd podczas pobierania szczegółów samochodu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  // Obliczanie całkowitego kosztu wypożyczenia
  useEffect(() => {
    if (rentalDate && returnDate && carDetails) {
      const days = Math.ceil((new Date(returnDate) - new Date(rentalDate)) / (1000 * 60 * 60 * 24));
      const numberOfDays = days > 0 ? days : 1; // Minimalnie 1 dzień
      let extraCost = 0;

      // Dodawanie kosztów na podstawie wybranego pakietu ochrony
      if (protectionPackage === 1) extraCost = 100;
      else if (protectionPackage === 2) extraCost = 150;
      else if (protectionPackage === 3) extraCost = 200;

      setTotalCost(numberOfDays * carDetails.rentalPricePerDay + extraCost);
    }
  }, [rentalDate, returnDate, carDetails, protectionPackage]);

  // Obsługa przycisku wypożyczenia
  const handleRent = () => {
    console.log('Dane przekazywane do Form:', {
      carId: id,
      rentalDate,
      returnDate,
      totalCost,
      protectionPackage,
      productName: carDetails.name,
      rentalPricePerDay: carDetails.rentalPricePerDay,
    });

    navigate('/form', {
      state: {
        carId: id,
        rentalDate,
        returnDate,
        totalCost,
        protectionPackage,
        productName: carDetails.name,
        rentalPricePerDay: carDetails.rentalPricePerDay,
      },
    });
  };

  if (loading) {
    return <p>Ładowanie szczegółów samochodu...</p>;
  }

  if (!carDetails) {
    return <p>Nie znaleziono szczegółów samochodu.</p>;
  }

  // Obliczanie minimalnej daty na kalendarz
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h1>Szczegóły samochodu</h1>
      <ul>
        <li><strong>Nazwa:</strong> {carDetails.name}</li>
        <li><strong>Model:</strong> {carDetails.model}</li>
        <li><strong>Spalanie:</strong> {carDetails.fuel_burning} l/100km</li>
        <li><strong>Opis:</strong> {carDetails.description}</li>
        <li><strong>Kategoria:</strong> {carDetails.category}</li>
        <li><strong>Cena za dzień:</strong> {carDetails.rentalPricePerDay} PLN</li>
      </ul>
      {isAuthenticated ? (
        <div>
          <label>Data rozpoczęcia wypożyczenia:</label>
          <input
            type="date"
            value={rentalDate}
            onChange={(e) => setRentalDate(e.target.value)}
            min={today} // Ustawienie minimalnej daty na dzisiejszy dzień
            required
          />
          <label>Data zakończenia wypożyczenia:</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            min={rentalDate || today} // Minimalna data zakończenia to data rozpoczęcia lub dzisiejsza
            required
          />
          <label>Wybierz pakiet ochrony (1-3):</label>
          <select
            value={protectionPackage}
            onChange={(e) => setProtectionPackage(parseInt(e.target.value))}
            required
          >
            <option value={1}>Pakiet Podstawowy (100 PLN)</option>
            <option value={2}>Pakiet Rozszerzony (150 PLN)</option>
            <option value={3}>Pakiet Premium (200 PLN)</option>
          </select>
          <p><strong>Całkowity koszt:</strong> {totalCost} PLN</p>
          <button onClick={handleRent}>Wypożycz</button>
        </div>
      ) : (
        <p>Zaloguj się, aby wypożyczyć ten samochód.</p>
      )}
    </div>
  );
};

export default Details;
