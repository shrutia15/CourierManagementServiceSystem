// import axios from 'axios'
// import { createUrl } from '../utils'

export const fetchDeliveries = async () => {
    return { status: 'success', data: [{ orderId: 1, from: 'Warehouse A', to: 'Customer B' }] };
  };
  
  export const acceptOrder = async (orderId) => {
    console.log('Order accepted:', orderId);
    return { status: 'success' };
  };
  
  export const forwardOrder = async (orderId) => {
    console.log('Order forwarded:', orderId);
    return { status: 'success' };
  };
  