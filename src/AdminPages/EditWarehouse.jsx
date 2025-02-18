import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminNavbar from '../components/NavBars/AdminNavbar';
import { createUrl } from '../utils';

function EditWarehouse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addressId, setAddressId] = useState(null);
  const [flatNo, setFlatNo] = useState('');
  const [streetName, setStreetName] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [manager, setManager] = useState({ firstName: '', lastName: '', email: '', contactNumber: '' });
  const [error, setError] = useState(null);

  const onLoadWarehouse = async () => {
    const url = createUrl(`admin/warehouses/${id}`);
    const token = sessionStorage['token']
    try {

      const result = await axios.get(url,{
        headers: {
          'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
        },
      });
      const data = result.data.location;
      const managerData = result.data.manager;
      setAddressId(data.id || '');
      setFlatNo(data.flatNo || '');
      setStreetName(data.streetName || '');
      setLandmark(data.landmark || '');
      setCity(data.city || '');
      setState(data.state || '');
      setPincode(data.pincode || '');
      setManager({
        firstName: managerData.firstName || '',
        lastName: managerData.lastName || '',
        email: managerData.email || '',
        contactNumber: managerData.contactNumber || ''
      });
    } catch (err) {
      console.error('Error loading warehouse:', err);
      setError('Failed to load warehouse.');
    }
  };

  const onSave = async () => {
    if (flatNo.length === 0) {
      toast.warning('Please enter flat number');
    } else if (streetName.length === 0) {
      toast.warning('Please enter street name');
    } else if (city.length === 0) {
      toast.warning('Please enter city');
    } else if (state.length === 0) {
      toast.warning('Please enter state');
    } else if (pincode.length === 0) {
      toast.warning('Please enter pincode');
    } else {
      const url = createUrl(`admin/warehouses/${id}`);
      const warehouse = { id:addressId ,flatNo, streetName, landmark, city, state, pincode };
      const token = sessionStorage['token']

      try {
        await axios.put(url, warehouse,{
          headers: {
            'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
          },
        });
        toast.success('Warehouse updated successfully!');
        navigate(`/admin/editwarehouse/${id}`);
      } catch (err) {
        console.error('Error updating warehouse:', err);
        setError('Failed to update warehouse.');
      }
    }
  };

  useEffect(() => {
    onLoadWarehouse();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <h2>Edit Warehouse</h2>
        {error && <p className="text-danger">{error}</p>}
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="flatNo">Flat No</label>
              <input
                id="flatNo"
                value={flatNo}
                onChange={(e) => setFlatNo(e.target.value)}
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
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
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
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
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
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
                value={state}
                onChange={(e) => setState(e.target.value)}
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
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <h3>Manager Information</h3>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="managerFirstName">First Name</label>
              <input
                id="managerFirstName"
                value={manager.firstName}
                type="text"
                className="form-control"
                readOnly
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="managerLastName">Last Name</label>
              <input
                id="managerLastName"
                value={manager.lastName}
                type="text"
                className="form-control"
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="managerEmail">Email</label>
              <input
                id="managerEmail"
                value={manager.email}
                type="email"
                className="form-control"
                readOnly
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="managerContactNumber">Contact Number</label>
              <input
                id="managerContactNumber"
                value={manager.contactNumber}
                type="text"
                className="form-control"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <button onClick={onSave} className="btn btn-primary">
            Update Warehouse
          </button>
          <button
            type="button"
            className="btn ms-2 btn-secondary ml-2"
            onClick={() => navigate('/admin/warehouses')}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditWarehouse;
