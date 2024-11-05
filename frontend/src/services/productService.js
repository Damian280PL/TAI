import axios from 'axios';

const API_URL = 'https://localhost:7042/Warehouse/List'; // Adjust the URL based on your setup

const productService = {
    getProducts: async () => {
        return await axios.get(API_URL); // Fetches all products
    },
    searchProducts: async (searchString) => {
        return await axios.get(`${API_URL}/search`, {
            params: { searchString } // Passes the search string as a query parameter
        });
    },
    deleteProduct: async (id) => {
        return await axios.delete(`${API_URL}/${id}`); // Adjust based on your delete implementation
    }
};

export default productService;
