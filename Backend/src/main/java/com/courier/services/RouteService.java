package com.courier.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.dto.RoutesDto;
import com.courier.exceptions.ResourceNotFoundException;
import com.courier.pojos.OrderStatus;
import com.courier.pojos.Orders;
import com.courier.pojos.Routes;
import com.courier.pojos.RoutesStatus;
import com.courier.pojos.Users;
import com.courier.pojos.Warehouse;
import com.courier.repository.OrdersRepository;
import com.courier.repository.RouteRepository;
import com.courier.repository.UserRepository;
import com.courier.repository.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RouteService {
	@Autowired

	private RouteRepository routeRepository;
	@Autowired

	private WarehouseRepository warehouseRepository;
	@Autowired

	private OrdersRepository ordersRepository;
	
	 @Autowired
	    private UserRepository userRepository;
 

	    public Routes acceptOrder(Long routeId) {
	        Routes route = routeRepository.findById(routeId).orElseThrow(()->new ResourceNotFoundException("Route not found"));
	        Orders order= ordersRepository.findById(route.getOrderId().getId()).orElseThrow();
	        order.setStatus(OrderStatus.IN_TRANSIT);
	        if(order.getToWarehouse().getId()==route.getToId().getId()) {
	        	route.setStatus(RoutesStatus.REACHED);
	        }
	        else {
	        route.setStatus(RoutesStatus.ACCEPTED);
	        }
	        route.setArrivalDate(LocalDateTime.now());
	        return routeRepository.save(route);
	    }
	    
	    public Routes forwardOrder(Long routeId) {
	        Routes route = routeRepository.findById(routeId).orElseThrow(()->new ResourceNotFoundException("Route not found"));
	        
	        if (route.getStatus() != RoutesStatus.ACCEPTED) {
	            throw new RuntimeException("The order cannot be forwarded unless its status is ACCEPTED.");
	        }
	        
	        route.setStatus(RoutesStatus.FORWARDED);
	        route.setDispatchDate(LocalDateTime.now());
	        routeRepository.save(route);
	        Long toId = route.getToId().getId();
	        Warehouse warehouse = warehouseRepository.findById(toId).orElseThrow(()->new ResourceNotFoundException(" Warehouse not found"));
	        Routes routeToID = routeRepository.findRoutesByFromIdAndStatusAndOrderId(warehouse, RoutesStatus.NOT_REACHED,route.getOrderId());
	        routeToID.setStatus(RoutesStatus.PLACED);
	        return routeRepository.save(route);
	    }
	    

	    public Warehouse getWarehouseByUserId(Long userId) {
	        Users manager = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Manager not found"));
	        return warehouseRepository.findByManager(manager);
	    }


	    public List<Routes> getRoutesByWarehouseAndStatus(Long warehouseId, RoutesStatus status) {
	        Warehouse warehouse = warehouseRepository.findById(warehouseId)
	                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with id "+warehouseId ));

	        if (status != RoutesStatus.ACCEPTED) {
	            // Return routes where toId matches warehouse and status is ACCEPTED
	            return routeRepository.findByToIdAndStatus(warehouse, status);
	        } else if (status == RoutesStatus.ACCEPTED) {
	            // Step 1: Find routes where toId is warehouse and status is ACCEPTED
	            List<Routes> acceptedRoutes = routeRepository.findByToIdAndStatus(warehouse, RoutesStatus.ACCEPTED);

	            if (acceptedRoutes.isEmpty()) {
	                return Collections.emptyList();
	            }

	            List<Warehouse> nextFromWarehouses = new ArrayList<>();
	            List<Orders> orderIds = new ArrayList<>();
	            Map<Long, Long> routeIdMapping = new HashMap<>(); // Store accepted route ID per order

	            for (Routes route : acceptedRoutes) {
	                nextFromWarehouses.add(route.getToId()); // Get next warehouse
	                orderIds.add(route.getOrderId()); // Get order
	                routeIdMapping.put(route.getOrderId().getId(), route.getId()); // Store accepted route ID for each order
	            }

	            // Step 2: Find next routes where from_wid matches to_wid of the accepted routes
	            List<Routes> nextRoutes = routeRepository.findByFromIdInAndOrderIdIn(nextFromWarehouses, orderIds);

	            // Step 3: Create a new list to modify the response without modifying the database
	            List<Routes> modifiedRoutes = new ArrayList<>();

	            for (Routes nextRoute : nextRoutes) {
	                // Skip routes where fromId and toId are the same
	                if (nextRoute.getFromId().getId().equals(nextRoute.getToId().getId())) {
	                    continue;
	                }

	                Long originalRouteId = routeIdMapping.get(nextRoute.getOrderId().getId());
	                if (originalRouteId != null) {
	                    // Create a copy of the route to modify the response without affecting the database
	                    Routes newRoute = new Routes(
	                        originalRouteId, // Keep the original accepted route ID
	                        nextRoute.getDispatchDate(),
	                        nextRoute.getArrivalDate(),
	                        nextRoute.getStatus(),
	                        nextRoute.getOrderId(),
	                        nextRoute.getFromId(),
	                        nextRoute.getToId()
	                    );
	                    modifiedRoutes.add(newRoute);
	                } else {
	                    modifiedRoutes.add(nextRoute); // If no mapping found, add as is
	                }
	            }

	            return modifiedRoutes;
	        }

	        return Collections.emptyList();
	    }


		public List<RoutesDto> trackOrder(String trackingId) {
			if(!ordersRepository.existsByTrackingId(trackingId)){
				
				throw new ResourceNotFoundException("Invalid Tracking ID");
			}
			Orders order = ordersRepository.findByTrackingId(trackingId);
			List<Routes> routes=routeRepository.findByOrderId(order);
			List<RoutesDto> routesDto = new ArrayList<>(); 
			for(Routes route: routes) {
				RoutesDto routeDto= new RoutesDto();
				routeDto.setArrivalDate(route.getArrivalDate());
				routeDto.setDispatchDate(route.getDispatchDate());
				routeDto.setFromWarehouse(route.getFromId().getLocation().getCity());
				routeDto.setToWarehouse(route.getToId().getLocation().getCity());
				routeDto.setStatus(route.getStatus().name());
				routesDto.add(routeDto);
			}
			return routesDto;
		}


}



