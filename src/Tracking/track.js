import React, { useState } from 'react';
// import { getCourierByTracking } from "../services/courierService";
// import MapComponent from "../components/MapComponent";
import axios from 'axios';
import { createUrl } from '../utils';
const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    try {
      const url=createUrl("track/")+trackingId;
      const response = await axios.get(url);
      setTrackingData(response.data);
    } catch (error) {
      console.error('Error fetching tracking data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleTrack} className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <button type="submit" className="btn btn-primary ms-2">Track</button>
          </form>
        </div>
      </div>
      {trackingData && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Arrived Date</th>
                  <th>Dispatched Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
          {trackingData.map((route) => (
            <tr>
              <td>{route.fromWarehouse}</td>
              <td>{route.toWarehouse}</td>
              <td>{route.arrivalDate}</td>
              <td>{route.dispatchDate}</td>
              <td>{route.status}</td>
              
            </tr>
          ))}
        </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;




