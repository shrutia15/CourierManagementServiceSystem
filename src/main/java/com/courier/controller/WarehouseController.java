package com.courier.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courier.pojos.Address;
import com.courier.services.WarehouseServices;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class WarehouseController {
	@Autowired
	private WarehouseServices warehouseServices;
	
	@GetMapping("/admin/warehouses")
	public ResponseEntity<?> getAllWarehouse(){
		return ResponseEntity.ok(warehouseServices.getAllWarehouses());
	}
	@GetMapping("/admin/warehouses/{id}")
	public ResponseEntity<?> getWarehouse(@PathVariable Long id){
		return ResponseEntity.ok(warehouseServices.getWarehouse(id));
	}
	@PutMapping("/admin/warehouses/{id}")
	public ResponseEntity<?> updateWarehouse(@PathVariable Long id,@RequestBody Address address){
		return ResponseEntity.ok(warehouseServices.updateWarehouse(id,address));
	}
	

}