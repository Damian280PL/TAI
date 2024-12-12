import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCar = () => {
<<<<<<< HEAD
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState(null);
  const [formData, setFormData] = useState({});
  const [picture, setPicture] = useState(null);

  // Fetch car data
=======
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
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:7042/api/product/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCarData(data);
<<<<<<< HEAD
          setFormData(data);
        } else {
=======
        } else {
          console.error('Failed to fetch car data.');
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
          alert('Nie znaleziono samochodu.');
          navigate('/products');
        }
      } catch (error) {
<<<<<<< HEAD
=======
        console.error('Error fetching car data:', error);
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
        alert('Wystąpił błąd podczas pobierania danych samochodu.');
        navigate('/products');
      }
    };

    fetchCarData();
  }, [id, navigate]);

<<<<<<< HEAD
  // Handle input change
=======
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

<<<<<<< HEAD
  // Handle file change
  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (picture) {
      data.append('Picture', picture);
    }

    try {
      const response = await fetch(`http://localhost:7042/api/product/${id}`, {
        method: 'PUT',
        body: data,
=======
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
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
      });

      if (response.ok) {
        alert('Dane samochodu zostały zaktualizowane!');
<<<<<<< HEAD
        navigate('/products');
      } else {
        const errorData = await response.json();
        alert(`Błąd podczas aktualizacji: ${errorData.message || 'Nieznany błąd.'}`);
      }
    } catch (error) {
      alert('Wystąpił błąd podczas aktualizacji danych samochodu.');
      console.error(error);
=======
        navigate('/products'); // Redirect to the car list page
      } else {
        alert('Wystąpił błąd podczas aktualizacji danych samochodu.');
      }
    } catch (error) {
      console.error('Error updating car data:', error);
      alert('Wystąpił błąd podczas aktualizacji danych samochodu.');
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
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
<<<<<<< HEAD
            value={formData.name || ''}
            onChange={handleInputChange}
            required
=======
            placeholder={carData.name}
            value={formData.name}
            onChange={handleInputChange}
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            name="model"
<<<<<<< HEAD
            value={formData.model || ''}
            onChange={handleInputChange}
            required
=======
            placeholder={carData.model}
            value={formData.model}
            onChange={handleInputChange}
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
          />
        </div>
        <div>
          <label>Kategoria:</label>
          <input
            type="text"
            name="category"
<<<<<<< HEAD
            value={formData.category || ''}
            onChange={handleInputChange}
            required
=======
            placeholder={carData.category}
            value={formData.category}
            onChange={handleInputChange}
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
          />
        </div>
        <div>
          <label>Skrzynia biegów:</label>
<<<<<<< HEAD
          <select
            name="transmission"
            value={formData.transmission || ''}
            onChange={handleInputChange}
            required
          >
            <option value="manualna">Manualna</option>
            <option value="automatyczna">Automatyczna</option>
          </select>
        </div>
        <div>
          <label>Ilość miejsc:</label>
          <input
            type="number"
            name="seats"
            value={formData.seats || ''}
            onChange={handleInputChange}
            required
=======
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
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
          />
        </div>
        <div>
          <label>Spalanie (l/100km):</label>
          <input
            type="number"
            name="fuel_burning"
<<<<<<< HEAD
            value={formData.fuel_burning || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Cena za dzień (PLN):</label>
          <input
            type="number"
            name="rentalPricePerDay"
            value={formData.rentalPricePerDay || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Kolor:</label>
          <input
            type="text"
            name="color"
            value={formData.color || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Zdjęcie:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Zapisz zmiany</button>
        <button type="button" onClick={() => navigate('/products')}>
=======
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
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
          Anuluj
        </button>
      </form>
    </div>
  );
};

export default EditCar;
