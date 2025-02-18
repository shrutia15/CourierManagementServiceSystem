import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';
import Navbar from '../NavBars/Navbar';

const ContactUs = () => {
  return (
    <div className="contact-page">
      <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5 main-content">
      
      <div className="hero-section text-light text-center py-5">
        <Container>
          <h1 className="fw-bold">Get in Touch</h1>
          <p className="lead">
            Need help with your courier management? We're here to assist you.
          </p>
        </Container>
      </div>

      {/* Contact Options */}
      <Container className="my-5">
        <Row className="justify-content-center">
          {/* Talk to Sales */}
          <Col md={5} className="mb-4">
            <Card className="shadow p-4 border-0">
              <div className="text-center">
                <i className="bi bi-telephone-fill fs-1 text-primary"></i>
                <h4 className="mt-3">Talk to Sales</h4>
                <p>
                  Interested in our courier management solutions? Call our sales team.
                </p>
                <a href="tel:+18578295060" className="fw-bold text-primary d-block">
                  +1 857 829 5060
                </a>
                {/* <a href="#" className="text-dark text-decoration-none">View all global numbers</a> */}
              </div>
            </Card>
          </Col>

          
          <Col md={5} className="mb-4">
            <Card className="shadow p-4 border-0">
              <div className="text-center">
                <i className="bi bi-chat-dots-fill fs-1 text-primary"></i>
                <h4 className="mt-3">Customer Support</h4>
                <p>Need assistance with tracking or deliveries? Our team is ready to help.</p>
                <Button variant="primary">Contact Support</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
      <footer className="text-center py-4">
            <h5 className="text-dark mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
              <a href="mailto:support@courier.com" className="social-icon">
                <FaEnvelope />
              </a>
            </div>
          </footer>
        </div>
      </div>

      {/* Custom CSS */}
      <style>
        {`
          .social-icon {
            font-size: 24px;
            color: black;
            transition: color 0.3s ease-in-out;
          }
          .social-icon:hover {
            color: #ff6600;
          }

          .contact-page {
  font-family: 'Arial', sans-serif;
  color: black; /* Ensures all text is black */
}

.hero-section {
  background: #001f3f;
  color: white; /* Keeps the hero section text white */
}

.card {
  border-radius: 12px;
  transition: transform 0.3s ease-in-out;
  color: black; /* Ensures text inside cards is black */
}

.card:hover {
  transform: scale(1.02);
}

.bi {
  font-size: 2rem;
  color: #ff6600;
}

.text-primary {
  color: black !important; /* Overrides Bootstrap blue text */
}

.text-dark {
  color: black !important; /* Ensures dark text remains black */
}

        `}
      </style>
     </div>
    


  );
};

export default ContactUs;
