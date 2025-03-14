import Navbar from '../components/NavBars/Navbar';
import {  useState } from 'react';
import bgImg from '../assets/image/bgImg.png';
import { createUrl } from '../utils';
import axios from 'axios';

function Home() {
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
    <div className="dashboard-container">
      <Navbar />

      <div className="hero-section">
        <div className="hero-content">
          <h1>Fast, Reliable & Secure Courier Service</h1>
          <p>Track your shipments, manage deliveries, and experience seamless courier management.</p>

          {/* Tracking Form */}
          <div className="form-container">
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
      </div>

    

      {/* Display tracking information if available */}
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
      

      <style>
      {`
            .dashboard-container {
            background-image: url(${bgImg});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: 100vh;
            width: 100%;
            display: flex;
            flex-direction: column;
          }

          .dashboard-content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            text-align: center;      
          }

          .heading {
            font-size: 3rem;
            font-weight: bold;
          }

          .hero-section {
            display: flex;
            justify-content: left;
            align-items: right;
            flex-direction: column;
            padding: 100px;
            background: rgba(0, 0, 0, 0.5);
            // border-radius: 10px;
            width: 100%;
          }

          .hero-content {
          align-items: right;
           flex: 1;
           color: white;
           max-width: 500px;
           text-align: center;
           position: relative;
           z-index: 2;
           padding: 20px;
           margin-left: auto;
           margin-top: auto;
           }


          .hero-content h1 {
            font-size: 3rem;
            font-weight: bold;
            // margin-top: 10px;
            align-items: right;
          }

          .hero-content p {
            font-size: 1.2rem;
            margin: 15px 0;
          }

          .form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-top: 20px;
          }

    //       .form-control {
    //   width: 300px;
    //   margin-right: 10px;
    // }

    // .btn-primary {
    //   padding: 10px 20px;
    // }

          .cta-btn {
            background-color: #ff9800;
            color: white;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            border-radius: 5px;
          }

          // .hero-image img {
          //   max-width: 100%;
          //   height: auto;
          //   margin-top: 20px;
          // }
        `}
      </style>
    </div>
  );
}

export default Home;
                                                                                                                                                                                                                                                                                                                                                                                                                                                         