import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerNavbar from '../components/NavBars/customerNavbar';
import { placeOrder } from '../services/user';
import { createUrl } from '../utils';
import axios from 'axios';
import { toast } from 'react-toastify';


const ParcelOrderForm = () => {
  const navigate = useNavigate();
  const [fromWarehouse, setFromWarehouse] = useState('');
  const [toWarehouse, setToWarehouse] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverContact, setReceiverContact] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState(0);
  const [senderId, setSenderId] = useState('');
  const [trackingId, setTrackingId] = useState(null);
  
  // Address-related state
  const [flatNo, setFlatNo] = useState('');
  const [streetName, setStreetName] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const cities = ['Mumbai', 'Chennai', 'Hyderabad', 'Pune', 'Delhi'];

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      setSenderId(userId);
    } else {
      console.error("Error: User ID missing in session storage");
    }
  }, []);

  useEffect(() => {
    if (weight) handleCalculate();
  }, [weight, fromWarehouse, toWarehouse]);

  const handleCalculate = async () => {
    try {
      if (!fromWarehouse || !toWarehouse) {
        toast.warning("Please select valid source and destination cities.");
        return;
      }

      const url = createUrl(`price/${fromWarehouse}/${toWarehouse}`);
      const response = await axios.get(url);
      const distance = response.data;

      const pricePerKm = 1.5;
      const pricePerKg = 5;
      const calculatedPrice = (distance * pricePerKm) + (weight * pricePerKg);

      setPrice(calculatedPrice.toFixed(2));
    } catch (error) {
      console.error('Error fetching distance:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromWarehouse || !toWarehouse || !receiverName || !receiverContact || !weight || !flatNo || !streetName || !landmark || !city || !state || !pincode) {
      toast.warning("Please fill all fields.");
      return;
    }
    if(weight<=0){
      toast.warning("Invalid Weight");
      return;
    }

    const id = sessionStorage.getItem("userId");
    if (!id) {
      toast.error("Error: User not logged in.");
      return;
    }

    const orderData = {
      senderId: id,
      fromWarehouse,
      toWarehouse,
      receiverName,
      contactNumber: receiverContact,
      weight,
      price,
      flatNo,
      streetName,
      landmark,
      city,
      state,
      pincode
      
    };

    try {
      const response = await placeOrder(orderData);
      if (response.status === 201) {
        setTrackingId(response.data.trackingId);
        toast.success(`Order placed successfully! Your tracking ID is ${response.data.trackingId}`);
        navigate(`/customer/order-history`);
      } else {
        toast.error(`Error placing order: ${response.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Place Parcel Order</h2>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="senderId" value={senderId} />

              <div className="mb-3">
                <label className="form-label">Source</label>
                <select 
                  className="form-select" 
                  value={fromWarehouse} 
                  onChange={(e) => setFromWarehouse(e.target.value)}
                >
                  <option value="">Select Source</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Destination</label>
                <select 
                  className="form-select" 
                  value={toWarehouse} 
                  onChange={(e) => setToWarehouse(e.target.value)}
                >
                  <option value="">Select Destination</option>
                  {cities.filter(city => city !== fromWarehouse).map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Weight(kg) of Parcle</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                />
              </div>
              <h4 className="mt-3">Receiver's Details</h4>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={receiverName} 
                  onChange={(e) => setReceiverName(e.target.value)} 
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={receiverContact} 
                  onChange={(e) => setReceiverContact(e.target.value)} 
                />
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="flatNo">Flat No</label>
                    <input
                      id="flatNo"
                      name="flatNo"
                      onChange={(e) => setFlatNo(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="streetName">Street Name</label>
                    <input
                      id="streetName"
                      name="streetName"
                      onChange={(e) => setStreetName(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="landmark">Landmark</label>
                    <input
                      id="landmark"
                      name="landmark"
                      onChange={(e) => setLandmark(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      name="city"
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="state">State</label>
                    <input
                      id="state"
                      name="state"
                      onChange={(e) => setState(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="pincode">Pincode</label>
                    <input
                      id="pincode"
                      name="pincode"
                      onChange={(e) => setPincode(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Price (₹)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={price} 
                  readOnly 
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">Place Order</button>
            </form>

            {trackingId && (
              <div className="alert alert-success mt-3">
                Order placed successfully! Your tracking ID is: <strong>{trackingId}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelOrderForm;
