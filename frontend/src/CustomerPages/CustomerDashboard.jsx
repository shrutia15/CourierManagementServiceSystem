import CustomerNavbar from "../components/NavBars/customerNavbar";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom'

const CustomerDashboard = () => {
 
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <CustomerNavbar />

      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={5} className="mb-4">
            <Card className="shadow p-4 border-0">
              <div className="text-center">
              <i class="bi bi-plus-square-fill fs-1">
                
              </i>
                <h4 className="mt-3">Add New Order</h4>
               <Button>
                  <Link to='/customer/place-order' className="text-white">Place Order</Link>
                </Button>
                
                {/* <a href="#" className="text-dark text-decoration-none">View all global numbers</a> */}
              </div>
            </Card>
          </Col>

          
          <Col md={5} className="mb-4">
            <Card className="shadow p-4 border-0">
              <div className="text-center">
              <i className="bi bi-clock-history fs-1"></i> 


                <h4 className="mt-3">Order History</h4>
                {/* <p>Need assistance with tracking or deliveries? Our team is ready to help.</p> */}
                <Button variant="primary">
                  <Link to='/customer/order-history' className="text-white">View Order History</Link>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

          
    </div>
  );

};
export default CustomerDashboard;
