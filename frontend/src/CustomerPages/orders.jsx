import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Container } from 'react-bootstrap';
import { createUrl } from '../utils';
import CustomerNavbar from '../components/NavBars/customerNavbar';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // Fetch the data from the API when the component mounts
    const id =sessionStorage['userId']
    const url = createUrl(`customer/orders/${id}`)
    const token=sessionStorage['token']
    axios.get(url,{
      headers: {
        'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
      },
    })
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);



  return (
    <div>
    <CustomerNavbar/>
    <Container className="mt-4">
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>Tracking ID</th>
            <th>Order Date</th>
            <th>Delivery Date</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.trackingId}</td>
              <td>{order.orderDate}</td>
              <td>{order.deliveryDate}</td>
              <td>{order.source}</td>
              <td>{order.destination}</td>
              <td>{order.weight}</td>
              <td>{order.price}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </Container>
    </div>
  );
};

export default CustomerOrders;