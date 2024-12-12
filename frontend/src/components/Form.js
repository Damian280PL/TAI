import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import AuthContext

const Form = () => {
  const { state } = useLocation(); // Retrieve data passed to this component
  const navigate = useNavigate();
  const { keycloak, userSub } = useAuth(); // Access Keycloak instance and `userSub`

  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pesel: '',
    drivingLicenseNumber: '',
    street: '',
    postalCode: '',
    city: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.rentalDate || !state.returnDate || !state.totalCost || !state.protectionPackage) {
      alert("Upewnij się, że wszystkie pola dotyczące wypożyczenia są wypełnione.");
      return;
    }

    try {
      const token = keycloak?.token;

      console.log('User Sub from Context:', userSub);

      if (!token) {
        alert('Brak tokenu uwierzytelnienia.');
        return;
      }

      if (!userSub) {
        alert('Nie można pobrać sub z AuthContext. Sprawdź konfigurację.');
        return;
      }

      // Add Driver
      const driverResponse = await axios.post(
        'http://localhost:7042/api/drivers',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      const newDriverId = driverResponse.data.id;

      // Prepare rent data
      const rentData = {
        productId: parseInt(state.carId),
        driverId: newDriverId,
        rentalDate: state.rentalDate,
        returnDate: state.returnDate,
        rentalCost: state.totalCost,
        protectionPackage: state.protectionPackage,
        status: "nieopłacony",
        userSub: userSub
      };

      console.log('Rent Data:', rentData);

      // Add Rent
      const rentResponse = await axios.post(
        'http://localhost:7042/api/rent',
        rentData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (rentResponse.status === 201) {
        const rentId = rentResponse.data.id; // Get rentId from response
        alert('Wypożyczenie zostało zarejestrowane!');
        navigate(`/payment/${rentId}`); // Redirect to payment page with rentId
      }
    } catch (error) {
      console.error('Błąd:', error.response?.data || error.message);
      alert('Wystąpił błąd podczas dodawania danych. Sprawdź szczegóły w konsoli.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Dane osobowe</h2>
      <div>
        <label>* Imię:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div>
        <label>* Nazwisko:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div>
        <label>* E-mail:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>* Telefon:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <div>
        <label>PESEL:</label>
        <input type="text" name="pesel" value={formData.pesel} onChange={handleChange} />
      </div>
      <div>
        <label>* Nr prawa jazdy:</label>
        <input type="text" name="drivingLicenseNumber" value={formData.drivingLicenseNumber} onChange={handleChange} required />
      </div>
      <h2>Dane adresowe</h2>
      <div>
        <label>* Ulica numer domu/lokalu:</label>
        <input type="text" name="street" value={formData.street} onChange={handleChange} required />
      </div>
      <div>
        <label>* Kod pocztowy:</label>
        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
      </div>
      <div>
        <label>* Miasto:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
      </div>
      <button type="submit">Zapisz</button>
    </form>
  );
};

export default Form;
