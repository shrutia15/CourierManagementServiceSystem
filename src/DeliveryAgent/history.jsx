import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createUrl } from '../utils';
import DeliveryAgentNavbar from '../components/NavBars/DeliveryAgentNavbar';

function DeliveryHistory() {
  const [orders, setOrders] = useState([]);

  const onLoad = async () => {
    const id = sessionStorage.getItem("userId");
    const url = createUrl(`delivery/history/${id}`);
    const token = sessionStorage['token']; 
    const result = (await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })).data;
    setOrders(result);
  };
  
    useEffect(() => {
      onLoad();
    }, []);
  


  return (
    <div>
    <DeliveryAgentNavbar/>
    <div className="container">
      <h2 className="my-4">Delivery History</h2>
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th>Sender Name</th>
            <th>Receiver Name</th>
            <th>Receiver Contact Number</th>
            <th>Receiver Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.trackingId}>
              <td>{order.senderId.firstName}</td>
              <td>{order.receiverName}</td>
              <td>{order.contactNumber}</td>
              <td>{order.toWarehouse.location.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default DeliveryHistory;