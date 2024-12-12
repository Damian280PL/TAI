import React, { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    fuel_burning: '',
    description: '',
    category: '',
    seats: '',
    transmission: '',
    rentalPricePerDay: '',
<<<<<<< HEAD
    color: '',
  });

  const [picture, setPicture] = useState(null);

=======
    color: ''
  });

>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
<<<<<<< HEAD
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (picture) {
      data.append('Picture', picture); // Match the backend field
    }

    try {
      const response = await axios.post('http://localhost:7042/api/product', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
=======
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7042/api/product', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
      });

      if (response.status === 201) {
        alert('Samochód został pomyślnie dodany.');
        setFormData({
          name: '',
          model: '',
          fuel_burning: '',
          description: '',
          category: '',
          seats: '',
          transmission: '',
          rentalPricePerDay: '',
<<<<<<< HEAD
          color: '',
        });
        setPicture(null);
=======
          color: ''
        });
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
      } else {
        alert('Wystąpił problem podczas dodawania samochodu.');
      }
    } catch (error) {
<<<<<<< HEAD
      console.error('Błąd podczas dodawania samochodu:', error.response?.data || error.message);
=======
      console.error('Błąd podczas dodawania samochodu:', error);
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
      alert('Wystąpił błąd podczas dodawania samochodu.');
    }
  };

  return (
    <div>
      <h2>Dodaj Nowy Samochód</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nazwa:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Model:</label>
          <input type="text" name="model" value={formData.model} onChange={handleChange} required />
        </div>
        <div>
          <label>Spalanie (l/100km):</label>
          <input type="number" name="fuel_burning" value={formData.fuel_burning} onChange={handleChange} required />
        </div>
        <div>
          <label>Opis:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
        </div>
        <div>
          <label>Kategoria:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div>
          <label>Ilość miejsc:</label>
          <input type="number" name="seats" value={formData.seats} onChange={handleChange} required />
        </div>
        <div>
          <label>Skrzynia biegów:</label>
          <select name="transmission" value={formData.transmission} onChange={handleChange} required>
            <option value="">Wybierz opcję</option>
            <option value="manualna">Manualna</option>
            <option value="automatyczna">Automatyczna</option>
          </select>
        </div>
        <div>
          <label>Cena wypożyczenia za dzień (PLN):</label>
<<<<<<< HEAD
          <input
            type="number"
            step="0.01"
            name="rentalPricePerDay"
            value={formData.rentalPricePerDay}
            onChange={handleChange}
            required
          />
=======
          <input type="number" step="0.01" name="rentalPricePerDay" value={formData.rentalPricePerDay} onChange={handleChange} required />
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
        </div>
        <div>
          <label>Kolor:</label>
          <input type="text" name="color" value={formData.color} onChange={handleChange} required />
        </div>
<<<<<<< HEAD
        <div>
          <label>Zdjęcie:</label>
          <input type="file" onChange={handleFileChange} accept="image/*" required />
        </div>
=======
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
        <button type="submit">Dodaj Samochód</button>
      </form>
    </div>
  );
};

export default AddCar;
