import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Payment = () => {
  const { rentId } = useParams(); // Pobierz rentId z parametrów URL
  const [orderDetails, setOrderDetails] = useState(null); // Przechowuj szczegóły zamówienia
  const [error, setError] = useState(null); // Obsługa błędów
  const [isLoading, setIsLoading] = useState(true); // Status ładowania danych

  useEffect(() => {
    // Funkcja do pobrania szczegółów zamówienia
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7042/api/payment/order-details/${rentId}`
        );
        setOrderDetails(response.data); // Ustaw dane zamówienia w stanie
      } catch (err) {
        setError(err.response?.data || "Failed to fetch order details");
      } finally {
        setIsLoading(false);
      }
    };

    if (rentId) fetchOrderDetails();
  }, [rentId]);

  const updateRentStatus = async () => {
    try {
      const response = await axios.put(
        `http://localhost:7042/api/rent/${rentId}/update-status`,
        { status: "opłacony" }
      );
      console.log("Rent status updated:", response.data);
      alert("Status zamówienia został zmieniony na opłacony.");
    } catch (err) {
      console.error("Error updating rent status:", err.response?.data || err.message);
      alert("Nie udało się zaktualizować statusu zamówienia.");
    }
  };

  if (isLoading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <div>
      <h1>Payment Page</h1>
      {orderDetails && (
        <div>
          <h2>Order Details</h2>
          <p>
            <strong>Driver:</strong> {orderDetails.driverFirstName}{" "}
            {orderDetails.driverLastName}
          </p>
          <p>
            <strong>Email:</strong> {orderDetails.driverEmail}
          </p>
          <p>
            <strong>Phone:</strong> {orderDetails.driverPhone}
          </p>
          <p>
            <strong>Product:</strong> {orderDetails.productName}
          </p>
          <p>
            <strong>Rental Cost:</strong> ${orderDetails.rentalCost}
          </p>
        </div>
      )}
      <PayPalScriptProvider
        options={{
          "client-id":
            "AdWl5SeBaJZeX0i2B4pJJ6uJSU_Zx3dU6Nxg1PFNmPDf7I5umURxURIUKxMdUZRIe1xDnCl_AvGD-LeM",
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
                      value: orderDetails.rentalCost.toString(), // Kwota płatności
                    },
                    description: `Payment for Rent ID: ${rentId}`,
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
              // Zmień status zamówienia na "opłacony"
              await updateRentStatus();
            });
          }}
          onError={(err) => {
            console.error("PayPal Checkout Error:", err);
            alert("An error occurred during the payment process. Please try again.");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default Payment;
