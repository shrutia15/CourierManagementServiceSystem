import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import WarehouseNavbar from '../components/NavBars/WarehouseNavbar';

function ManageDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedTab, setSelectedTab] = useState('arrival');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDeliveries = async (status) => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      toast.error('User ID not found in session storage');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `http://localhost:8080/routes/byWarehouse/status`;
      const token = sessionStorage["token"];
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, 
        params: { userId, status }
      });

      setDeliveries(response.data);
    } catch (error) {
      setError('Error fetching deliveries');
      console.error('Fetch error:', error);
      toast.error('Error fetching deliveries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let status;
    if (selectedTab === 'arrival') status = 'PLACED';
    else if (selectedTab === 'departure') status = 'ACCEPTED';
    else if (selectedTab === 'delivery') status = 'REACHED';
    
    fetchDeliveries(status);
  }, [selectedTab]);

  const handleAccept = async (routeId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8080/routes/acceptOrder/${routeId}`, 
        {},
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        toast.success("Order accepted successfully!");
        setDeliveries((prev) => prev.filter((d) => d.id !== routeId));
      }
    } catch (error) {
      toast.error("Error accepting order");
      console.error("Error:", error);
    }
  };

  const handleForward = async (routeId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8080/routes/forwardOrder/${routeId}`,
        {},
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        toast.success("Order forwarded successfully!");
        setDeliveries((prev) => prev.filter((d) => d.id !== routeId));
      }
    } catch (error) {
      toast.error("Error forwarding order");
      console.error("Error:", error);
    }
  };

  const handleDeliver = async (routeId) => {
    try {
      const token = sessionStorage['token'];
      const userId=sessionStorage['userId'];
      const response = await axios.get(
        `http://localhost:8080/warehouse/deliverOrder/${routeId}/${userId}`,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        toast.success(`Delivery Agent ${response.data.id} assigned successfully!`);
        setDeliveries((prev) => prev.filter((d) => d.id !== routeId));
      }
    } catch (error) {
      toast.error("Error delivering order");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <WarehouseNavbar/>
    
      <div className="d-flex flex-column min-vh-100 p-4">
        <ToastContainer />
        <h2 className="mb-4">Manage Deliveries</h2>
        
        <div className="mb-3">
          <select
            className="form-select w-25"
            value={selectedTab}
            onChange={(e) => setSelectedTab(e.target.value)}
          >
            <option value="arrival">Arrivals</option>
            <option value="departure">Departures</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>

        {loading && <div className="spinner-border text-primary" role="status"></div>}
        
        {error && <div className="alert alert-danger">{error}</div>}

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>From Warehouse</th>
              <th>To Warehouse</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.orderId.id}>
                <td>{delivery.orderId.id }</td>
                <td>
                  {delivery.fromId.location.city === delivery.toId.location.city 
                  ? `${delivery.fromId.location.city} (user)` 
                  : delivery.fromId.location.city}
                  </td>

                <td>{delivery.toId.location.city}</td>
                <td>
                  {selectedTab === 'arrival' ? (
                    <button
                      onClick={() => handleAccept(delivery.id)}
                      className="btn btn-success btn-sm"
                    >
                      Accept
                    </button>
                  ) : selectedTab === 'departure' ? (
                    <button
                      onClick={() => handleForward(delivery.id)}
                      className="btn btn-primary btn-sm"
                    >
                      Forward
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeliver(delivery.id)}
                      className="btn btn-warning btn-sm"
                    >
                      Deliver
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageDeliveries;
