import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const CarList = () => {
  const { isAdmin } = useAuth(); // Access admin status from AuthContext
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [transmission, setTransmission] = useState('');
  const [seats, setSeats] = useState('');
  const [fuelBurning, setFuelBurning] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    fetch('http://localhost:7042/api/product')
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:7042/api/product/${id}`, { method: 'DELETE' })
      .then(() => {
        setCars(cars.filter((car) => car.id !== id));
      })
      .catch((error) => console.error('Error deleting car:', error));
  };

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category ? car.category === category : true;
    const matchesTransmission = transmission ? car.transmission === transmission : true;
    const matchesSeats = seats ? car.seats === parseInt(seats) : true;
    const matchesFuelBurning = fuelBurning ? car.fuel_burning === parseInt(fuelBurning) : true;
    const matchesPrice =
      (minPrice ? car.rentalPricePerDay >= parseFloat(minPrice) : true) &&
      (maxPrice ? car.rentalPricePerDay <= parseFloat(maxPrice) : true);

    return matchesSearch && matchesCategory && matchesTransmission && matchesSeats && matchesFuelBurning && matchesPrice;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortOption === 'price') {
      return a.rentalPricePerDay - b.rentalPricePerDay;
    } else if (sortOption === 'fuelBurning') {
      return a.fuel_burning - b.fuel_burning;
    }
    return 0;
  });

  return (
    <div>
      <h1>Dostępne samochody</h1>
      <input
        type="text"
        placeholder="Szukaj po nazwie lub modelu"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">Wybierz kategorię</option>
        <option value="Sportowy">Sportowy</option>
        <option value="SUV">SUV</option>
        <option value="Sedan">Sedan</option>
      </select>
      <select onChange={(e) => setTransmission(e.target.value)} value={transmission}>
        <option value="">Wybierz skrzynię biegów</option>
        <option value="manualna">Manualna</option>
        <option value="automatyczna">Automatyczna</option>
      </select>
      <input
        type="number"
        placeholder="Liczba siedzeń"
        value={seats}
        onChange={(e) => setSeats(e.target.value)}
      />
      <input
        type="number"
        placeholder="Spalanie (l/100km)"
        value={fuelBurning}
        onChange={(e) => setFuelBurning(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min. cena za dzień"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max. cena za dzień"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
        <option value="">Sortuj według</option>
        <option value="price">Cena</option>
        <option value="fuelBurning">Spalanie</option>
      </select>
      <button
        onClick={() => {
          setSearchTerm('');
          setCategory('');
          setTransmission('');
          setSeats('');
          setFuelBurning('');
          setMinPrice('');
          setMaxPrice('');
          setSortOption('');
        }}
      >
        Usuń wszystkie filtry
      </button>
      <ul>
        {sortedCars.map((car) => (
          <li key={car.id}>
            <strong>{car.name}</strong> - {car.model} - {car.category} - {car.transmission} - {car.seats} siedzeń -{' '}
            {car.fuel_burning} l/100km - {car.rentalPricePerDay} PLN/dzień
            <Link to={`/details/${car.id}`}>Szczegóły</Link>
            {isAdmin && (
              <>
                <button onClick={() => handleDelete(car.id)}>Usuń</button>
                <Link to={`/edit/${car.id}`}>
                  <button>Modyfikuj</button>
                </Link>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
