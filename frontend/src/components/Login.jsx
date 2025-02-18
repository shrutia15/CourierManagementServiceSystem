import { useState } from 'react';
import { login } from '../services/user';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Navbar from './NavBars/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onLogin = async () => {
    if (email.length === 0) {
      toast.warning('Please enter email');
    } else if (password.length === 0) {
      toast.warning('Please enter password');
    } else {
      const result = await login(email, password);
      console.log(result);
      if (result.data && result.data.status === 'success') {
        const token = result.data.token;
        sessionStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        sessionStorage.setItem('userId',decodedToken.user_id)
        const userRole = decodedToken.authorities; 
        toast.success('Welcome to the application');
        if (userRole=== 'ROLE_ADMIN') {
          navigate('/admin/orders');
        } else if (userRole === 'ROLE_CUSTOMER') {
          navigate('/customer/home');
        } else if (userRole === 'ROLE_DELIVERY_AGENT') {
          navigate('/delivery/deliveries');
        } else if (userRole === 'ROLE_WAREHOUSE_MANAGER') {
          navigate('/warehouse/manage-delivery');
        } else {
          toast.error('Unknown user role');
        }
      } else if(result.error.status==401){
        toast.error("Invalid Email or Password");
      }else{
        toast.error("Login Failed")
      }
    }
  };
  
  

  return (
    <div>
      <Navbar />
      <h2 className='heading'>Login</h2>
      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='mb-3'>
            <label htmlFor=''>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor=''>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <div>
              Don't have an account? <Link to='/register'>Register here</Link>
            </div>
            <button onClick={onLogin} className='btn btn-success mt-3'>
              Login
            </button>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  );
}

export default Login;
