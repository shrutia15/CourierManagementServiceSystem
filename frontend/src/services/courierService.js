import axios from 'axios';

const API_URL = "http://localhost:8080/api/couriers";

export const getAllCouriers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getCourierByTracking = async (trackingNumber) => {
    const response = await axios.get(`${API_URL}/${trackingNumber}`);
    return response.data;
};
