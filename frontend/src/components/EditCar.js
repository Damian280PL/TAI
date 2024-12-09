import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCar = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const navigate = useNavigate();
  const [carData, setCarData] = useState(null); // State to store car data
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    category: '',
    transmission: '',
    seats: '',
    fuel_burning: '',
    rentalPricePerDay: '',
  });

  // Fetch car data on component mount
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:7042/api/product/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCarData(data);
        } else {
          console.error('Failed to fetch car data.');
          alert('Nie znaleziono samochodu.');
          navigate('/products');
        }
      } catch (error) {
        console.error('Error fetching car data:', error);
        alert('Wystąpił błąd podczas pobierania danych samochodu.');
        navigate('/products');
      }
    };

    fetchCarData();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Merge updated form data with existing car data
      const updatedCarData = {
        ...carData,
        ...formData, // Override with form inputs
      };

      // Send PUT request to update the car
      const response = await fetch(`http://localhost:7042/api/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCarData),
      });

      if (response.ok) {
        alert('Dane samochodu zostały zaktualizowane!');
        navigate('/products'); // Redirect to the car list page
      } else {
        alert('Wystąpił błąd podczas aktualizacji danych samochodu.');
      }
    } catch (error) {
      console.error('Error updating car data:', error);
      alert('Wystąpił błąd podczas aktualizacji danych samochodu.');
    }
  };

  if (!carData) {
    return <p>Ładowanie danych samochodu...</p>;
  }

  return (
    <div>
      <h1>Modyfikuj samochód</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nazwa:</label>
          <input
            type="text"
            name="name"
            placeholder={carData.name}
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            placeholder={carData.model}
            value={formData.model}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Kategoria:</label>
          <input
            type="text"
            name="category"
            placeholder={carData.category}
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Skrzynia biegów:</label>
          <input
            type="text"
            name="transmission"
            placeholder={carData.transmission}
            value={formData.transmission}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Liczba siedzeń:</label>
          <input
            type="number"
            name="seats"
            placeholder={carData.seats}
            value={formData.seats}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Spalanie (l/100km):</label>
          <input
            type="number"
            name="fuel_burning"
            placeholder={carData.fuel_burning}
            value={formData.fuel_burning}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Cena wynajmu za dzień (PLN):</label>
          <input
            type="number"
            name="rentalPricePerDay"
            placeholder={carData.rentalPricePerDay}
            value={formData.rentalPricePerDay}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Zapisz zmiany</button>
        <button
          type="button"
          onClick={() => navigate('/products')}
          style={{
            marginLeft: '10px',
          }}
        >
          Anuluj
        </button>
      </form>
    </div>
  );
};

export default EditCar;
