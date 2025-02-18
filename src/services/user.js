import axios from 'axios'
import { createUrl } from '../utils'

export async function login(email, password) {
  try {
    // create the url
    const url = createUrl('login')

    // create the request body
    const body = {
      email,
      password,
    }

    // call the API
    const response = await axios.post(url, body);

    // get the response body
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function register(firstName, lastName, email, contactNumber, password,address) {
  try {
    const url = createUrl('register')
    const body = {
      firstName,
      lastName,
      email,
      contactNumber,
      password,
      flatNo: address.flatNo,
      streetName:address.streetName,
      landmark:address.landmark,
      city:address.city,
      state:address.state,
      pincode:address.pincode
    }
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function registerDelivery(firstName, lastName, email, contactNumber, password,address) {
  try {
    const url = createUrl('warehouse/register')
    const token=sessionStorage['token']
    const id = sessionStorage["userId"]
    const body = {
      warehouseManagerId:id,
      firstName,
      lastName,
      email,
      contactNumber,
      password,
      flatNo: address.flatNo,
      streetName:address.streetName,
      landmark:address.landmark,
      city:address.city,
      state:address.state,
      pincode:address.pincode

    }
    const response = await axios.post(url, body,{
      headers: {
        'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
      },
    })
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
export async function updatePassword(password) {
  try {
    const url = createUrl('user/update-password')
    const body = {
      password,
    }
    const token = sessionStorage['token']
    const response = await axios.put(url, body, {
      headers: { token },
    })
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function getMyProfile() {
  try {
    const id = sessionStorage['userId']
    const url = createUrl('profile/'+id)
    const token = sessionStorage['token']
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
      },
    })
  
    
   

    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function updateMyProfile(firstName, lastName, contactNumber, address) {
  try {
    const url = createUrl('updateprofile');
    const id = sessionStorage["userId"]; // Ensure id is retrieved
    const token = sessionStorage["token"]
    if (!id) {
      console.error("User ID is missing from session storage");
      return { status: 'error', error: "User ID missing" };
    }

    const body={
      id,
      firstName,
      lastName,
      contactNumber,
      address
    }

    const response = await axios.post(url, body,{
      headers: {
        'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (ex) {
    return { status: 'error', error: ex };
  }
}
export async function placeOrder(orderData) {
  try {
    const url = createUrl('customer/place-order');
    console.log("Sending order data:", orderData);
    const token = sessionStorage['token']

    if (!orderData.senderId || !orderData.fromWarehouse || !orderData.toWarehouse) {
      return { status: 'error', error: "Missing required order fields" };
    }

    const response = await axios.post(url, orderData, {
      headers: {
        'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
      },
    });

    console.log("Order placed response:", response.data);
    return response;
  } catch (ex) {
    console.error("Place order error:", ex.response?.data?.message || ex.message);
    return { status: 'error', error: ex.response?.data?.message || ex.message };
  }
}



