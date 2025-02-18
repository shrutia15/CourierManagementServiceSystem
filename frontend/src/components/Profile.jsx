import { useEffect, useState } from 'react';
import { getMyProfile, updateMyProfile } from '../services/user';
import { toast } from 'react-toastify';

function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState({
    flatNo: '',
    streetName: '',
    landmark: '',
    city: '',
    state: '',
    pincode: ''
  });

  const { flatNo, streetName, landmark, city, state, pincode } = address;

  const onLoadProfile = async () => {
    const result = await getMyProfile();
    if (result.status === 'success') {
      const data = result.user;
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setContactNumber(data.contactNumber);
      setAddress({
        id:data.address.id||'',
        flatNo: data.address.flatNo || '',
        streetName: data.address.streetName || '',
        landmark: data.address.landmark || '',
        city: data.address.city || '',
        state: data.address.state || '',
        pincode: data.address.pincode || ''
      });
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSave = async () => {
    if (firstName.length === 0) {
      toast.warning('Please enter first name');
    } else if (lastName.length === 0) {
      toast.warning('Please enter last name');
    } else if (contactNumber.length === 0) {
      toast.warning('Please enter phone number');
    } else {
      const result = await updateMyProfile(firstName, lastName, contactNumber, address );
      if (result.status === 'success') {
        toast.success('Successfully updated your profile');
      } else {
        toast.error(result.error);
      }
    }
  };

  useEffect(() => {
    onLoadProfile();
  }, []);

  return (
    <div>
      <div className="container">
        <h2 className="heading">Profile</h2>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                value={firstName}
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
                value={lastName}
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
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                type="tel"
                className="form-control"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                readOnly
                value={email}
                type="email"
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
                value={flatNo}
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
                value={streetName}
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
                value={landmark}
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
                value={city}
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
                value={state}
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
                value={pincode}
                onChange={handleAddressChange}
                type="text"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <button onClick={onSave} className="btn btn-success">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
