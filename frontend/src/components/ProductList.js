import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

<<<<<<< HEAD
const ProductList = () => {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
=======
const CarList = () => {
  const { isAdmin } = useAuth(); // Access admin status from AuthContext
  const [cars, setCars] = useState([]);
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
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
<<<<<<< HEAD
      .then((data) => setProducts(data))
=======
      .then((data) => setCars(data))
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:7042/api/product/${id}`, { method: 'DELETE' })
      .then(() => {
<<<<<<< HEAD
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    const matchesTransmission = transmission ? product.transmission === transmission : true;
    const matchesSeats = seats ? product.seats === parseInt(seats) : true;
    const matchesFuelBurning = fuelBurning ? product.fuel_burning === parseInt(fuelBurning) : true;
    const matchesPrice =
      (minPrice ? product.rentalPricePerDay >= parseFloat(minPrice) : true) &&
      (maxPrice ? product.rentalPricePerDay <= parseFloat(maxPrice) : true);
=======
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
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15

    return matchesSearch && matchesCategory && matchesTransmission && matchesSeats && matchesFuelBurning && matchesPrice;
  });

<<<<<<< HEAD
  const sortedProducts = [...filteredProducts].sort((a, b) => {
=======
  const sortedCars = [...filteredCars].sort((a, b) => {
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
    if (sortOption === 'price') {
      return a.rentalPricePerDay - b.rentalPricePerDay;
    } else if (sortOption === 'fuelBurning') {
      return a.fuel_burning - b.fuel_burning;
    }
    return 0;
  });

  return (
    <div>
<<<<<<< HEAD
      <h1>Dostępne produkty</h1>
=======
      <h1>Dostępne samochody</h1>
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
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
<<<<<<< HEAD
        {sortedProducts.map((product) => (
          <li key={product.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            {product.picturePath && (
              <img
                src={`data:image/png;base64,${product.picturePath}`}
                alt={product.name}
                style={{ width: '150px', height: '100px', objectFit: 'cover', marginRight: '20px' }}
              />
            )}
            <div>
              <strong>{product.name}</strong> - {product.model} - {product.category} - {product.transmission} -{' '}
              {product.seats} siedzeń - {product.fuel_burning} l/100km - {product.rentalPricePerDay} PLN/dzień
              <br />
              <Link to={`/details/${product.id}`}>Szczegóły</Link>
              {isAdmin && (
                <>
                  <button onClick={() => handleDelete(product.id)} style={{ marginLeft: '10px' }}>
                    Usuń
                  </button>
                  <Link to={`/edit/${product.id}`}>
                    <button>Modyfikuj</button>
                  </Link>
                </>
              )}
            </div>
=======
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
>>>>>>> ce8f9f1d4b0886f600dcfd6d1ecbc1d5ddd12b15
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
