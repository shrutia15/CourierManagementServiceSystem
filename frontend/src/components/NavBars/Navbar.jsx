import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/image/logo.png';
function Navbar() {
  const navigate = useNavigate();

  const onLogin = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const onRegister = () => {
    sessionStorage.removeItem('token');
    navigate('/register');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar" data-bs-theme='dark'>
        <div className="container-fluid">
          <div className="navbar-brand d-flex align-items-center" >
            <img src={logo} alt="Logo" style={{ height: '70px', marginRight: '10px' }} />
            <span className="fw-bold brand-text">ParcelPilot</span>
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
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0' style={{ fontSize: '21px' }}>
              <li className='nav-item'>
                <Link to='/' className='nav-link nav-dark-blue'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/aboutUs' className='nav-link nav-dark-blue'>
                  About Us
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/contactUs' className='nav-link nav-dark-blue'>
                  Contact Us
                </Link>
              </li>
              <li className='nav-item'>
                <button onClick={onLogin} className='btn btn-success me-3 px-4 py-2' style={{ width: '120px', height: '45px' }}>
                  Login
                </button>
              
                <button onClick={onRegister} className='btn btn-primary px-4 py-2' style={{ width: '120px', height: '45px' }}>
                  Register
                </button>
              </li>
            </ul>
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
  );
}

export default Navbar;
