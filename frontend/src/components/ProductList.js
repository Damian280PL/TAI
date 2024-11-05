import React, { useState, useEffect } from 'react';
import productService from '../services/productService';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productService.getProducts();
                console.log("Pobrane produkty:", response.data);
                setProducts(response.data);
            } catch (error) {
                setErrorMessage("Błąd podczas pobierania produktów");
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await productService.searchProducts(searchString);
            console.log("Wyniki wyszukiwania:", response.data);
            setProducts(response.data);
        } catch (error) {
            setErrorMessage("Błąd podczas wyszukiwania produktów");
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await productService.deleteProduct(id);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            setErrorMessage("Błąd podczas usuwania produktu");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Dostępne produkty</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="search"
                    className="form-control"
                    placeholder="Szukaj po nazwie lub modelu"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    aria-label="Search"
                />
                <button className="btn btn-dark" type="submit">Szukaj po nazwie</button>
            </form>
            <a href="#" onClick={() => setSearchString('')} className="text-dark">Usuń wszystkie filtry</a>
            <hr />

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            {Array.isArray(products) && products.length > 0 ? (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            <b>{product.name} {product.model}</b> - {product.category}
                            <a href={`/products/${product.id}`}>Szczegóły</a>
                            <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Usuń</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Brak produktów do wyświetlenia.</p>
            )}
        </div>
    );
};

export default ProductList;
