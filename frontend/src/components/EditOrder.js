import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditOrder = () => {
  const { id } = useParams(); // Pobierz ID zamówienia z URL
  const [rent, setRent] = useState(null); // Przechowuje dane zamówienia
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Do przekierowania po zapisaniu

  useEffect(() => {
    const fetchRent = async () => {
      try {
        const response = await axios.get(`http://localhost:7042/api/rent/${id}`);
        console.log("Fetched rent:", response.data);
        setRent(response.data);
      } catch (error) {
        console.error('Error fetching rent:', error);
        setError('Nie udało się pobrać danych zamówienia.');
      } finally {
        setLoading(false);
      }
    };

    fetchRent();
  }, [id]);

  const handleSaveChanges = async () => {
    try {
      // Przesyłamy wszystkie dane, w tym `userSub`, do API
      const updatedRent = { ...rent };
      if (!updatedRent.userSub) {
        alert("Pole UserSub jest wymagane.");
        return;
      }
      await axios.put(`http://localhost:7042/api/rent/${id}`, updatedRent);
      alert("Zamówienie zostało zaktualizowane.");
      navigate('/orders'); // Przekierowanie z powrotem do listy zamówień
    } catch (err) {
      console.error("Error saving changes:", err.response?.data || err.message);
      alert("Nie udało się zaktualizować zamówienia.");
    }
  };

  if (loading) {
    return <p>Ładowanie danych zamówienia...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edycja zamówienia</h1>
      <label>
        Produkt ID:
        <input
          type="text"
          value={rent.productId || ''}
          onChange={(e) => setRent({ ...rent, productId: e.target.value })}
          style={{ marginLeft: '10px', width: '300px', padding: '5px' }}
        />
      </label>
      <br />
      <label>
        Data wypożyczenia:
        <input
          type="date"
          value={rent.rentalDate ? rent.rentalDate.split('T')[0] : ''}
          onChange={(e) => setRent({ ...rent, rentalDate: e.target.value })}
          style={{ marginLeft: '10px', width: '300px', padding: '5px' }}
        />
      </label>
      <br />
      <label>
        Data zwrotu:
        <input
          type="date"
          value={rent.returnDate ? rent.returnDate.split('T')[0] : ''}
          onChange={(e) => setRent({ ...rent, returnDate: e.target.value })}
          style={{ marginLeft: '10px', width: '300px', padding: '5px' }}
        />
      </label>
      <br />
      <label>
        Koszt:
        <input
          type="number"
          value={rent.rentalCost || ''}
          onChange={(e) => setRent({ ...rent, rentalCost: parseFloat(e.target.value) })}
          style={{ marginLeft: '10px', width: '300px', padding: '5px' }}
        />
      </label>
      <br />
      <label>
        Driver ID:
        <input
          type="number"
          value={rent.driverId || ''}
          onChange={(e) => setRent({ ...rent, driverId: parseInt(e.target.value, 10) })}
          style={{ marginLeft: '10px', width: '300px', padding: '5px' }}
        />
      </label>
      <br />
      <label>
        Protection Package:
        <select
          value={rent.protectionPackage || ''}
          onChange={(e) => setRent({ ...rent, protectionPackage: parseInt(e.target.value, 10) })}
          style={{ marginLeft: '10px', width: '300px', padding: '5px' }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </label>
      <br />
      <label>
        Status:
        <select
          value={rent.status || ''}
          onChange={(e) => setRent({ ...rent, status: e.target.value })}
          style={{ marginLeft: '10px', width: '300px', padding: '5px' }}
        >
          <option value="nieopłacony">Nieopłacony</option>
          <option value="opłacony">Opłacony</option>
        </select>
      </label>
      <br />
      <label>
        UserSub:
        <input
          type="text"
          value={rent.userSub || ''}
          onChange={(e) => setRent({ ...rent, userSub: e.target.value })}
          style={{ marginLeft: '10px', width: '300px', padding: '5px' }}
          readOnly // Pole nieedytowalne
        />
      </label>
      <br />
      <button
        onClick={handleSaveChanges}
        style={{
          padding: '10px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        Zapisz zmiany
      </button>
    </div>
  );
};

export default EditOrder;
