import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import aboutUs from './FooterContent/Aboutus';
// import contactUs from './FooterContent/ContactUs';

function Footer() {
  return (
    <footer className="footer bg-light text-dark py-3">
      <div className="container text-center">
        <nav className="mb-3">
          <Link to="/" className="text-dark mx-2">Home</Link>
          <Link to="/aboutUs" className="text-dark mx-2">About Us</Link>
          <Link to="/contactUs" className="text-dark mx-2">Contact Us</Link>
        </nav>
        <hr className="border-dark" />
        <p className="mb-0">© 2025 Company, Inc</p>
      </div>
    </footer>
  );
}


export default Footer;
