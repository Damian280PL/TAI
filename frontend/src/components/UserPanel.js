import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from './AuthContext';

const UserPanel = () => {
  const { isAuthenticated, keycloak, userSub } = useAuth();
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRentId, setSelectedRentId] = useState(null); // Przechowuje ID wybranego zamówienia

  useEffect(() => {
    const fetchUserRents = async () => {
      try {
        if (isAuthenticated && userSub) {
          const response = await axios.get('http://localhost:7042/api/rent/user', {
            params: { userSub },
          });
          console.log("Fetched rents:", response.data);
          setRents(response.data);
        }
      } catch (error) {
        console.error('Error fetching user rents:', error);
        setError('Nie udało się pobrać zamówień użytkownika. Sprawdź połączenie z serwerem.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRents();
  }, [isAuthenticated, userSub]);

  const handleEditAccount = () => {
    if (keycloak && keycloak.authServerUrl && keycloak.realm) {
      const accountUrl = `${keycloak.authServerUrl.replace(/\/+$/, "")}/realms/${keycloak.realm}/account`;
      window.open(accountUrl, '_blank');
    } else {
      console.error('Nie można otworzyć panelu ustawień użytkownika. Brak danych Keycloak.');
    }
  };

  const updateRentStatus = async (rentId) => {
    try {
      console.log("Updating status for rent ID:", rentId);
      const response = await axios.put(
        `http://localhost:7042/api/rent/${rentId}/update-status`,
        { status: "opłacony" }
      );
      console.log("Rent status updated:", response.data);

      setRents((prevRents) =>
        prevRents.map((rent) =>
          rent.id === rentId ? { ...rent, status: "opłacony" } : rent
        )
      );

      alert("Status zamówienia został zmieniony na opłacony.");
    } catch (err) {
      console.error("Error updating rent status:", err.response?.data || err.message);
      alert("Nie udało się zaktualizować statusu zamówienia.");
    }
  };

  const handlePayNow = (rentId) => {
    console.log("Selected rent for payment:", rentId);
    setSelectedRentId(rentId); // Ustaw ID wybranego zamówienia
  };

  if (!isAuthenticated) {
    return <p>Musisz być zalogowany, aby zobaczyć Panel użytkownika.</p>;
  }

  if (loading) {
    return <p>Ładowanie danych...</p>;
  }

  return (
    <div>
      <h1>Panel użytkownika</h1>
      <div>
        <button
          onClick={handleEditAccount}
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Edytuj ustawienia użytkownika
        </button>
      </div>
      <h2>Zamówienia</h2>
      {error && <p>{error}</p>}
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
              {rent.status === 'nieopłacony' && (
                <>
                  <button
                    onClick={() => handlePayNow(rent.id)}
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
                    Opłać
                  </button>
                  {selectedRentId === rent.id && (
                    <div style={{ marginTop: '10px' }}>
                      <PayPalScriptProvider
                        options={{
                          "client-id": "AdWl5SeBaJZeX0i2B4pJJ6uJSU_Zx3dU6Nxg1PFNmPDf7I5umURxURIUKxMdUZRIe1xDnCl_AvGD-LeM",
                          currency: "PLN",
                        }}
                      >
                        <PayPalButtons
                          createOrder={(data, actions) => {
                            return actions.order
                              .create({
                                purchase_units: [
                                  {
                                    amount: {
                                      value: rent.rentalCost.toString(),
                                    },
                                    description: `Payment for Rent ID: ${rent.id}`,
                                  },
                                ],
                              })
                              .then((orderId) => {
                                console.log("Order ID created:", orderId);
                                return orderId;
                              });
                          }}
                          onApprove={(data, actions) => {
                            return actions.order.capture().then(async (details) => {
                              console.log("Payment successful:", details);
                              alert("Payment completed successfully!");
                              await updateRentStatus(rent.id); // Zmień status zamówienia na "opłacony"
                              setSelectedRentId(null); // Usuń wybrane zamówienie
                            });
                          }}
                          onError={(err) => {
                            console.error("PayPal Checkout Error:", err);
                            alert("Wystąpił błąd podczas przetwarzania płatności. Spróbuj ponownie.");
                          }}
                        />
                      </PayPalScriptProvider>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak zamówień do wyświetlenia.</p>
      )}
    </div>
  );
};

export default UserPanel;
