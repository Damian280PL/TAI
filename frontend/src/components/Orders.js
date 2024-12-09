import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllRents = async () => {
      try {
        const response = await axios.get('http://localhost:7042/api/rent'); // Pobieranie zamówień
        console.log("Fetched all rents:", response.data);
        setRents(response.data);
      } catch (error) {
        console.error('Error fetching rents:', error);
        setError('Nie udało się pobrać zamówień. Sprawdź połączenie z serwerem.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllRents();
  }, []);

  if (loading) {
    return <p>Ładowanie danych zamówień...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Panel Zamówień</h1>
      <h2>Lista zamówień</h2>
      {rents.length > 0 ? (
        <ul>
          {rents.map((rent) => (
            <li key={rent.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc' }}>
              <p><strong>ID Zamówienia:</strong> {rent.id}</p>
              <p><strong>Produkt ID:</strong> {rent.productId}</p>
              <p><strong>Data wypożyczenia:</strong> {new Date(rent.rentalDate).toLocaleDateString()}</p>
              <p><strong>Data zwrotu:</strong> {rent.returnDate ? new Date(rent.returnDate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Koszt:</strong> {rent.rentalCost} PLN</p>
              <p><strong>Status:</strong> {rent.status}</p>
              <Link to={`/edit-order/${rent.id}`}>
                <button
                  style={{
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}
                >
                  Edytuj
                </button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak zamówień do wyświetlenia.</p>
      )}
    </div>
  );
};

export default Orders;
