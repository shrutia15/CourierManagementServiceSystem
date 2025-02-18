package com.courier.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courier.dto.PlaceOrderRequestDto;
import com.courier.dto.PlaceOrderResponseDto;
import com.courier.services.OrderService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
	@Autowired
	private OrderService orderService;
	
	@GetMapping("/admin/orders")
	public ResponseEntity<?> getAllOrders(){
		return ResponseEntity.ok(orderService.getAllOrders());
	}
	
	@GetMapping("/delivery/history/{id}")
	public ResponseEntity<?> getByStatusAndAgentId(@PathVariable Long id){
		return ResponseEntity.ok(orderService.deliveryAgentHistory(id));
		
	}
	
	@GetMapping("/delivery/deliveries/{id}")
	public ResponseEntity<?> getByStatusNotAndAgentId(@PathVariable Long id){
		return ResponseEntity.ok(orderService.deliveryAgentDeliveries(id));
		
	}
	@PostMapping("/customer/place-order")
    public ResponseEntity<?> placeOrder(@RequestBody PlaceOrderRequestDto requestDto) {
 
            PlaceOrderResponseDto response = orderService.placeOrder(requestDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
       
    }
	@GetMapping("/customer/orders/{id}")
	public ResponseEntity<?> getAllOrdersByCustomer(@PathVariable Long id){
		return ResponseEntity.ok(orderService.getAllOrdersByCustomer(id));
	}
	
	@GetMapping("/warehouse/deliverOrder/{routeId}/{managerId}")
	public ResponseEntity<?> assignDelivery(@PathVariable Long routeId,@PathVariable Long managerId){
		return ResponseEntity.ok(orderService.assignDelivery(routeId,managerId));
		
	}
	@GetMapping("/delivery/update-status/{orderId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId) {
        orderService.deliverOrder(orderId);
        return ResponseEntity.ok(orderService.deliverOrder(orderId));
    }
	

}
