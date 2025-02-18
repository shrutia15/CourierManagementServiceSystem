package com.courier.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.courier.pojos.Routes;
import com.courier.pojos.RoutesStatus;
import com.courier.pojos.Warehouse;
import com.courier.services.RouteService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins ="http://localhost:3000")

public class RouteController {
	
	@Autowired 
	private RouteService routeService;

	 @PostMapping("/routes/acceptOrder/{routeId}")
	    public ResponseEntity<Routes> acceptOrder(@PathVariable Long routeId) {
	        Routes updatedRoute = routeService.acceptOrder(routeId);
	        return ResponseEntity.ok(updatedRoute);
	    }
	 
	 @PostMapping("/routes/forwardOrder/{routeId}")
	    public ResponseEntity<Routes> forwardOrder(@PathVariable Long routeId) {
	        Routes updatedRoute = routeService.forwardOrder(routeId);
	        return ResponseEntity.ok(updatedRoute);
	    }

	 @GetMapping("/routes/byWarehouse/status")
	    public ResponseEntity<?> getRoutesByStatus(@RequestParam Long userId, @RequestParam RoutesStatus status) {
	        Warehouse warehouse = routeService.getWarehouseByUserId(userId);
	        return ResponseEntity.ok(routeService.getRoutesByWarehouseAndStatus(warehouse.getId(), status));
	    }
	 @GetMapping("/track/{trackingId}")
	 public ResponseEntity<?> trackOrder(@PathVariable String trackingId) {
		 System.out.println(trackingId);
	 	return ResponseEntity.ok(routeService.trackOrder(trackingId));
	 }

	 
	 


}


