// import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/image/logo.png';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function WarehouseNavbar() {
  const user = sessionStorage["userId"];

  const navigate = useNavigate()

   const onLogout = () => {
    // remove the token
    sessionStorage.removeItem('token')

    // redirect to login page
    navigate('/login')
  }
  useEffect(()=>{
    if(user==null){
      toast.error("Please login")
      navigate("/login")
    }
  },[])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar  " data-bs-theme='dark'>
      <div className="container-fluid">
          
          <div className="navbar-brand d-flex align-items-center" >
            <img src={logo} alt="Logo" style={{ height: '70px', marginRight: '10px' }} />
            <span className="fw-bold brand-text" style={{ fontSize: '30px' }}>ParcelPilot</span>
          </div>

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
         
              <li className='nav-item'>
                <Link to='/warehouse/Delivery-Agent' className='nav-link nav-dark-blue'>
                 Delivery Agent
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/warehouse/manage-delivery' className='nav-link nav-dark-blue'>
                  Manage Deliveries
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/warehouse/profile' className='nav-link nav-dark-blue'>
                  Profile
                </Link>
              </li>

              {/* <li className='nav-item'>
                <Link to='/change-password' className='nav-link'>
                  Change Password
                </Link>
              </li> */}

              </ul>
              <div className="d-flex ms-auto">
              <button onClick={onLogout} className='btn btn-danger px-4 py-2'>
                  Logout
                </button>

              </div>
          </div>
        </div>
      </nav>

      <style>
        {`
          .custom-navbar {
            background-color: rgb(175, 196, 249) !important;
            height: 100px;
          }

          .brand-text {
            font-size: 30px;
            color: #003366;
          }

          .navbar-nav {
            display: flex;
            justify-content: flex-end;
          }

          .nav-dark-blue {
            color: #003366 !important; /* Dark Blue */
            font-weight: bold;
          }

          .nav-dark-blue:hover {
            color: #002244 !important; /* Slightly darker shade on hover */
          }
        `}
      </style>
      
    </div>
  )
}

export default WarehouseNavbar
