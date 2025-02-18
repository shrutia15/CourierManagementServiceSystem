import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/NavBars/AdminNavbar';
import { createUrl } from '../utils';
import { useNavigate } from 'react-router-dom';

const AllWareHouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    // Fetch the data from the API when the component mounts
    const url=createUrl('admin/warehouses')
    const token = sessionStorage['token']
    axios.get(url,{
      headers: {
        'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
      },
    })
      .then(response => {
        setWarehouses(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/editwarehouse/${id}`)
  };


  return (
    <div>
      <AdminNavbar/>
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="thead-dark">
            <tr>
              <th>Warehouse ID</th>
              <th>Warehouse Manager</th>
              <th>Warehouse Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse) => (
              <tr key={warehouse.id}>
                <td>{warehouse.id}</td>
                <td>{warehouse.managerName}</td>
                <td>{warehouse.location.flatNo},{warehouse.location.streetName},{warehouse.location.landmark},{warehouse.location.city},{warehouse.location.state},{warehouse.location.pincode}</td>
                <td>
                  <button className="btn btn-warning mr-2" onClick={() => handleEdit(warehouse.id)}>Edit</button>                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AllWareHouses;




