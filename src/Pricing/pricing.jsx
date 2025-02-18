
import React, { useState } from 'react';
import { createUrl } from '../utils';
import axios from 'axios';

const PricingPage = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');

  const handleCalculate = async (e) => {
    e.preventDefault();

    try {
      const url = createUrl(`price/${source}/${destination}`)
      const response =await axios.get(url);
      const distance = response.data;
      const pricePerKm = 1.5; // Example price per km
      const pricePerKg = 5; // Example price per kg
      const calculatedPrice = (distance * pricePerKm) + (weight * pricePerKg);
      setPrice(calculatedPrice.toFixed(2));
    } catch (error) {
      console.error('Error fetching distance:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Check Pricing Details</h2>
          <form onSubmit={handleCalculate}>
            <div className="mb-3">
              <label className="form-label">Source</label>
              <select className="form-select" value={source} onChange={(e) => setSource(e.target.value)}>
                <option value="">Select Source</option>
                {['Delhi', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai'].map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Destination</label>
              <select className="form-select" value={destination} onChange={(e) => setDestination(e.target.value)}>
                <option value="">Select Destination</option>
                {['Delhi', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai'].filter(city => city !== source).map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Weight (kg)</label>
              <input type="number" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>

            <div className="mt-4">
              <label className="form-label">Estimated Price (₹)</label>
              <input type="text" className="form-control" value={price} readOnly />
            </div>

           
            <button type="submit" className="btn btn-primary w-100 mt-4">Calculate Price</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
