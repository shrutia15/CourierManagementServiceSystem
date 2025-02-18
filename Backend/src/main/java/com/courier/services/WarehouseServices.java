package com.courier.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.dto.WarehouseDto;
import com.courier.exceptions.ResourceNotFoundException;
import com.courier.pojos.Address;
import com.courier.pojos.Warehouse;
import com.courier.repository.AddressRepository;
import com.courier.repository.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class WarehouseServices {
	@Autowired
	private WarehouseRepository warehouseRepository;
	@Autowired
	private AddressRepository addressRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	
	
	public List<WarehouseDto> getAllWarehouses() {
        List<Warehouse> warehouses = warehouseRepository.findAll();
        if (warehouses==null) {
        	throw new ResourceNotFoundException("Warehouses not found" );
        }
        List<WarehouseDto> warehousesDto=warehouses.stream()
                .map(warehouse -> modelMapper.map(warehouse, WarehouseDto.class)) 
                .collect(Collectors.toList());
        for(int i=0;i<warehouses.size();i++) {
        	warehousesDto.get(i).setManagerId(warehouses.get(i).getId());
        	warehousesDto.get(i).setManagerName(warehouses.get(i).getManager().getFirstName()+" "+warehouses.get(i).getManager().getLastName());
        }
        return warehousesDto;
    }

	public Warehouse getWarehouse(Long id) {
		return warehouseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id "+id ));
	}

	public Warehouse updateWarehouse(Long id, Address address) {
		Warehouse warehouse = warehouseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id "+id ));
		addressRepository.save(address);
		return warehouseRepository.save(warehouse);
	}
	
	

}
