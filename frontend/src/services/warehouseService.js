import axios from 'axios';

const API_URL = 'http://localhost:7042/Warehouse';

export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
};

export const addProduct = async (product) => {
    const response = await axios.post(`${API_URL}/add`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
