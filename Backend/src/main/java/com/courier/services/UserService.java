package com.courier.services;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.courier.dto.ApiResponse;
import com.courier.dto.DeliveryAgentsDto;
import com.courier.dto.LoginRequestDto;
import com.courier.dto.LoginResponseDto;
import com.courier.dto.ProfileDto;
import com.courier.dto.RegisterRequestDto;
import com.courier.exceptions.ResourceNotFoundException;
import com.courier.pojos.Address;
import com.courier.pojos.DeliveryAgents;
import com.courier.pojos.Role;
import com.courier.pojos.Users;
import com.courier.pojos.Warehouse;
import com.courier.repository.AddressRepository;
import com.courier.repository.DeliveryAgentRepository;
import com.courier.repository.UserRepository;
import com.courier.repository.WarehouseRepository;
import com.courier.security.JWTService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private AddressRepository addressRepository;
	@Autowired
	private WarehouseRepository warehouseRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private JWTService jwtService;
	@Autowired
	private DeliveryAgentRepository deliveryAgentRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	public LoginResponseDto login(LoginRequestDto dto) {
		Authentication authentication = authManager
				.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
		if (authentication.isAuthenticated()) {
			return new LoginResponseDto("success", jwtService.generateToken(authentication));
		}
		return new LoginResponseDto("failed", "");
	}

	public ProfileDto updateProfile(Users user) {
		Users persistantUser = userRepository.findById(user.getId())
				.orElseThrow(() -> new ResourceNotFoundException("user not found with id "+user.getId() ));
		persistantUser.setAddress(user.getAddress());
		persistantUser.setContactNumber(user.getContactNumber());
		persistantUser.setFirstName(user.getFirstName());
		persistantUser.setLastName(user.getLastName());
		if (user.getAddress().getId() == null) {
			Address address = new Address();
			address.setCity(user.getAddress().getCity());
			address.setFlatNo(user.getAddress().getFlatNo());
			address.setLandmark(user.getAddress().getLandmark());
			address.setPincode(user.getAddress().getPincode());
			address.setStreetName(user.getAddress().getStreetName());
			address.setState(user.getAddress().getState());
		}
		else {
			persistantUser.setAddress(user.getAddress());
			
		}
		userRepository.save(persistantUser);
		return new ProfileDto("success", persistantUser);
	}

	public ProfileDto getProfile(Long id) {
		Users user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id "+id ));
		return new ProfileDto("success", user);
	}

	public List<DeliveryAgentsDto> getAllDeliveryAgents(Long id) {
		Users manager = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id "+id ));
		Warehouse warehouse= warehouseRepository.findByManager(manager);
		List<DeliveryAgents> deliveryAgents = deliveryAgentRepository.findByWarehouse(warehouse);
		if(deliveryAgents==null) {
			throw new ResourceNotFoundException("No Delivery Agents available for warehouse with id "+ warehouse.getId());
		}
		List<DeliveryAgentsDto> agents = new ArrayList<>();
		for (int i = 0; i < deliveryAgents.size(); i++){
			DeliveryAgentsDto dto = new DeliveryAgentsDto(); 
		    dto.setId(deliveryAgents.get(i).getId());
		    dto.setCity(deliveryAgents.get(i).getUser().getAddress().getCity());
		    dto.setPincode(deliveryAgents.get(i).getUser().getAddress().getPincode());
		    dto.setLandmark(deliveryAgents.get(i).getUser().getAddress().getLandmark());
		    dto.setFlatNo(deliveryAgents.get(i).getUser().getAddress().getFlatNo());
		    dto.setStreetName(deliveryAgents.get(i).getUser().getAddress().getStreetName());
		    dto.setState(deliveryAgents.get(i).getUser().getAddress().getState());	    
		    dto.setFirstName(deliveryAgents.get(i).getUser().getFirstName());
		    dto.setLastName(deliveryAgents.get(i).getUser().getLastName());
		    dto.setEmail(deliveryAgents.get(i).getUser().getEmail());
		    dto.setContactNumber(deliveryAgents.get(i).getUser().getContactNumber());
		    agents.add(dto); 
		}
		return agents;
	}

	public Users registerUser(RegisterRequestDto userDto) {
		if(userRepository.existsByEmail(userDto.getEmail())) {
			throw new RuntimeException("Email Already Exists");
			
		}
		Address address=modelMapper.map(userDto, Address.class);
        Users user = modelMapper.map(userDto, Users.class);
        user.setAddress(address);
        user.setRole(Role.ROLE_CUSTOMER);
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        addressRepository.save(address);
        return userRepository.save(user);
    }

	public DeliveryAgents registerDeliveryAgent(RegisterRequestDto userDto) {
		if(userRepository.existsByEmail(userDto.getEmail())) {
			throw new RuntimeException("Email Already Exists");
			
		}
		Address address = new Address();
		address.setFlatNo(userDto.getFlatNo());
		address.setStreetName(userDto.getStreetName());
		address.setCity(userDto.getCity());
		address.setLandmark(userDto.getLandmark());
		address.setState(userDto.getState());
		address.setPincode(userDto.getPincode());
		System.out.println(address);
		addressRepository.save(address);
        Users user = modelMapper.map(userDto, Users.class);
        user.setAddress(address);
        user.setRole(Role.ROLE_DELIVERY_AGENT);
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(user);
        Users manager = userRepository.findById(userDto.getWarehouseManagerId()).orElseThrow(()->new ResourceNotFoundException("Manager Id not found"));
        Warehouse warehouse = warehouseRepository.findByManager(manager);
        DeliveryAgents agent = new DeliveryAgents();
        agent.setUser(user);
        agent.setWarehouse(warehouse);        
        return deliveryAgentRepository.save(agent);
         
		
	}
	

}
