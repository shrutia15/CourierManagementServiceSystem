import Login from './components/Login'
import Register from './components/Register'
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes } from 'react-router-dom'
import ContactUs from './components/FooterContent/ContactUs'
import Profile from './WarehousePages/Profile'
import ManageDeliveries from './WarehousePages/ManageDelivery'
import ParcelOrderForm from './CustomerPages/PlaceOrder'
import CustomerCalPrice from './CustomerPages/price'
import CustomerTrackParcle from './CustomerPages/tracking'
import CustomerProfile from './CustomerPages/profile'
import AllOrders from './AdminPages/AllOrders'
import AdminTrackParcle from './AdminPages/tracking'
import AdminCalPrice from './AdminPages/price'
import AllWareHouses from './AdminPages/AllWareHouses'
import AdminProfile from './AdminPages/profile'
import DeliveryDashboard from './DeliveryAgent/deliveries'
import DeliveryHistory from './DeliveryAgent/history'
import DeliveryProfile from './DeliveryAgent/profile'
import Footer from './components/Footer'
import AboutUs from './components/FooterContent/Aboutus'
import PricingPage from './Pricing/pricing'
import TrackingPage from './CustomerPages/tracking'
import CustomerDashboard from './CustomerPages/CustomerDashboard'

import EditWarehouse from './AdminPages/EditWarehouse';
import RegisterDeliveryAgent from './WarehousePages/Register';
import Home from './components/Home';
import DeliveryAgents from './WarehousePages/DeliveryAgents';
import CustomerOrders from './CustomerPages/orders';

function App() {
  

  return (
    <div className='container-fluid'>
      <Routes>
       
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login/>} />
        <Route path='ContactUs' element={<ContactUs />} />
        <Route path='pricing' element={<PricingPage />} />
        <Route path='register' element={<Register/>} />
        <Route path="/track" element={<TrackingPage />} />

        {/* Warehouse Routes */}
        <Route path='warehouse/register' element={<RegisterDeliveryAgent />} />
        <Route path='warehouse/profile' element={<Profile />} />
        <Route path='warehouse/delivery-agent' element={<DeliveryAgents/>} />
        <Route path='warehouse/manage-delivery' element={<ManageDeliveries />} />

        {/* Customer routes  */}
        <Route path='customer/place-order' element={<ParcelOrderForm />} />
        <Route path='customer/track-order' element={<CustomerTrackParcle />} />
        <Route path='customer/price-cal' element={<CustomerCalPrice />} />
        <Route path='customer/profile' element={<CustomerProfile />} />
        <Route path='customer/home' element={<CustomerDashboard />} />
        <Route path='customer/order-history' element={<CustomerOrders />} />


        {/* Admin Routes */}
        <Route path='admin/orders' element={<AllOrders />} />
        <Route path='admin/warehouses' element={<AllWareHouses />} />
        <Route path='admin/track-order' element={<AdminTrackParcle />} />
        <Route path='admin/price-cal' element={<AdminCalPrice />} />
        <Route path='admin/profile' element={<AdminProfile />} />
        <Route path='admin/editwarehouse/:id' element={<EditWarehouse />} />



        {/* Delivery Agent */}
        <Route path='delivery/deliveries' element={<DeliveryDashboard/>} />
        <Route path='delivery/history' element={<DeliveryHistory />} />
        <Route path='delivery/profile' element={<DeliveryProfile />} />
        <Route path='AboutUs' element={<AboutUs />} />

       


        
    
      </Routes>
      <ToastContainer />
      <div>
      <Footer/>

    </div>
    </div>
    
    
  )
}

export default App
