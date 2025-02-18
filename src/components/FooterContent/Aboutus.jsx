import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../NavBars/Navbar';

function AboutUs() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5 main-content">
      <h2 className="mb-4">About Us</h2>
      <p>Welcome to CourierConnect, your trusted partner in innovative courier management solutions. Founded in 2025, we are a dynamic startup dedicated to revolutionizing the way you manage and track your deliveries.</p>
      
      <h4 className="mt-4">Our Mission</h4>
      <p>At CourierConnect, our mission is to simplify and streamline the courier management process for businesses of all sizes. We aim to provide reliable, efficient, and cost-effective solutions that empower our clients to focus on what they do best – running their business.</p>
      
      <h4 className="mt-4">Who We Are</h4>
      <p>We are a team of passionate professionals with expertise in logistics, technology, and customer service. Our combined experience and commitment to excellence drive us to continuously innovate and improve our platform, ensuring that we meet the evolving needs of our customers.</p>
      
      <h4 className="mt-4">What We Offer</h4>
      <ul>
        <li><strong>Comprehensive Tracking:</strong> Our state-of-the-art tracking system provides real-time updates on the status and location of your shipments.</li>
        <li><strong>User-Friendly Interface:</strong> Designed with ease of use in mind, our platform offers an intuitive interface that simplifies the management of your deliveries.</li>
        <li><strong>Reliable Support:</strong> Our dedicated support team is always ready to assist you with any questions or issues you may encounter.</li>
        <li><strong>Customizable Solutions:</strong> We understand that every business is unique, which is why we offer customizable features to meet your specific requirements.</li>
      </ul>
      
      <h4 className="mt-4">Our Commitment</h4>
      <p>We are committed to delivering exceptional value to our clients through continuous innovation, quality service, and a customer-centric approach. Your satisfaction is our top priority, and we strive to exceed your expectations with every interaction.</p>
      
      <h4 className="mt-4">Join Us</h4>
      <p>Join the growing number of businesses that trust ParcelPilot for their courier management needs. Together, we can make your delivery process seamless and efficient.</p>
      
      <p>Thank you for choosing ParcelPilot. We look forward to serving you!</p>
    </div>
    </div>
  );
}

export default AboutUs;
