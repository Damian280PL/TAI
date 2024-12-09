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
    color: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
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
          color: ''
        });
      } else {
        alert('Wystąpił problem podczas dodawania samochodu.');
      }
    } catch (error) {
      console.error('Błąd podczas dodawania samochodu:', error);
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
          <input type="number" step="0.01" name="rentalPricePerDay" value={formData.rentalPricePerDay} onChange={handleChange} required />
        </div>
        <div>
          <label>Kolor:</label>
          <input type="text" name="color" value={formData.color} onChange={handleChange} required />
        </div>
        <button type="submit">Dodaj Samochód</button>
      </form>
    </div>
  );
};

export default AddCar;
