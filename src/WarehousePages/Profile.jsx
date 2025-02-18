// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../components/AdminNavbar';
// import { getMyProfile, updateMyProfile } from '../services/user';
// import { toast } from 'react-toastify';
import WarehouseNavbar from '../components/NavBars/WarehouseNavbar';
import Profile from '../components/Profile';

function WarehouseProfile() {


  return (
    <div>
      <WarehouseNavbar/>
      <Profile/>
    </div>
  );
}

export default WarehouseProfile;
