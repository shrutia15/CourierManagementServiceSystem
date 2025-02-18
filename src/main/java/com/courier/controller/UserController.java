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

import com.courier.dto.LoginRequestDto;
import com.courier.dto.RegisterRequestDto;
import com.courier.dto.RegisterResponseDto;
import com.courier.pojos.DeliveryAgents;
import com.courier.pojos.Users;
import com.courier.services.UserService;


@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequestDto dto) {
		
		return ResponseEntity.ok(userService.login(dto));
		
	}
	@PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequestDto userDto) {
		System.out.println(userDto);
        userService.registerUser(userDto);
        
      
        return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterResponseDto("success"));
    }
	@PostMapping("/warehouse/register")
    public ResponseEntity<?> registerDelivery(@RequestBody RegisterRequestDto userDto) {
		System.out.println(userDto);
		
		 userService.registerDeliveryAgent(userDto);
		 
	      
	        return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterResponseDto("success"));
	    }
	
	@PostMapping("/updateprofile")
	public ResponseEntity<?> updateProfile(@RequestBody Users user) {
		
		System.out.println(user);
		
		return ResponseEntity.ok(userService.updateProfile(user));
		
	}
	
	@GetMapping("/profile/{id}")
	public  ResponseEntity<?> getProfile(@PathVariable Long id) {
		
		return  ResponseEntity.ok(userService.getProfile(id));
		
	}
	@GetMapping("/warehouse/deliveryagents/{id}")
	public  ResponseEntity<?> getMethodName(@PathVariable Long id) {
		
		return ResponseEntity.ok(userService.getAllDeliveryAgents(id));
	}
	
	

}
