import { useState } from 'react';
import { toast } from 'react-toastify';
import { register } from '../services/user';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './NavBars/Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState({
    flatNo: '',
    streetName: '',
    landmark: '',
    city: '',
    state: '',
    pincode: ''
  });

  const navigate = useNavigate();

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onRegister = async () => {
    if (!firstName.trim()) {
      toast.warning('Please enter first name');
    } else if (!lastName.trim()) {
      toast.warning('Please enter last name');
    } else if (!email.trim()) {
      toast.warning('Please enter email');
    } else if (!phone.trim()) {
      toast.warning('Please enter phone number');
    } else if (!password) {
      toast.warning('Please enter password');
    } else if (!confirmPassword) {
      toast.warning('Please confirm password');
    } else if (password !== confirmPassword) {
      toast.warning('Passwords do not match');
    } else {
      try {
        const result = await register(firstName, lastName, email, phone, password, address);
        if (result.status === 'success') {
          toast.success('Successfully registered user');
          navigate('/login');
        } else if(result.status==='failed') {
          toast.error('Email already Exists');
        }else{
          toast.error("Failed registering user")
        }
      } catch (error) {
        toast.error('Error registering user');
        console.error(error);
      }
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container mt-4">
        <h2 className="text-center">Register</h2>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input id="email" onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" onChange={(e) => setPhone(e.target.value)} type="tel" className="form-control" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input id="password" onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" />
                </div>
              </div>
            </div>

            <h4 className="mt-3">Address</h4>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="flatNo">Flat No</label>
                  <input id="flatNo" name="flatNo" onChange={handleAddressChange} type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="streetName">Street Name</label>
                  <input id="streetName" name="streetName" onChange={handleAddressChange} type="text" className="form-control" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="landmark">Landmark</label>
                  <input id="landmark" name="landmark" onChange={handleAddressChange} type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="city">City</label>
                  <input id="city" name="city" onChange={handleAddressChange} type="text" className="form-control" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="state">State</label>
                  <input id="state" name="state" onChange={handleAddressChange} type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="pincode">Pincode</label>
                  <input id="pincode" name="pincode" onChange={handleAddressChange} type="text" className="form-control" />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <span>
                Already have an account? <Link to="/login">Login here</Link>
              </span>
              <button onClick={onRegister} className="btn btn-success">
                Register
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
}

export default Register;
