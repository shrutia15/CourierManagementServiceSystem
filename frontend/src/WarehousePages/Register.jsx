import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerDelivery } from '../services/user';
import { useNavigate } from 'react-router-dom';
import WarehouseNavbar from '../components/NavBars/WarehouseNavbar';

function RegisterDeliveryAgent() {
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

  // const { flatNo, streetName, landmark, city, state, pincode } = address;

  const navigate = useNavigate();

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onRegister = async () => {
    if (firstName.length === 0) {
      toast.warning('Please enter first name');
    } else if (lastName.length === 0) {
      toast.warning('Please enter last name');
    } else if (email.length === 0) {
      toast.warning('Please enter email');
    } else if (phone.length === 0) {
      toast.warning('Please enter phone number');
    } else if (password.length === 0) {
      toast.warning('Please enter password');
    } else if (confirmPassword.length === 0) {
      toast.warning('Please confirm password');
    } else if (password !== confirmPassword) {
      toast.warning('Passwords do not match');
    } else {
      const result = await registerDelivery(firstName, lastName, email, phone, password, address);
      if (result.status === 'success') {
        toast.success('Successfully Registered Delivery Agent');
        navigate('/warehouse/delivery-agent');
      } else {
        toast.error(result.error);
      }
    }
  };

  return (
    <div>
      <WarehouseNavbar />
      <h2 className="heading">Add Delivery Agent</h2>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="flatNo">Flat No</label>
                <input
                  id="flatNo"
                  name="flatNo"
                  onChange={handleAddressChange}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="streetName">Street Name</label>
                <input
                  id="streetName"
                  name="streetName"
                  onChange={handleAddressChange}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="landmark">Landmark</label>
                <input
                  id="landmark"
                  name="landmark"
                  onChange={handleAddressChange}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  onChange={handleAddressChange}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  name="state"
                  onChange={handleAddressChange}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="pincode">Pincode</label>
                <input
                  id="pincode"
                  name="pincode"
                  onChange={handleAddressChange}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button onClick={onRegister} className="btn btn-success mt-2">
                Register
              </button>
            </div>
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default RegisterDeliveryAgent;
