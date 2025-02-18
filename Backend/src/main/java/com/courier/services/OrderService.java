package com.courier.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.courier.dto.OrderDto;
import com.courier.dto.PlaceOrderRequestDto;
import com.courier.dto.PlaceOrderResponseDto;
import com.courier.exceptions.ResourceNotFoundException;
import com.courier.pojos.Address;
import com.courier.pojos.DeliveryAgents;
import com.courier.pojos.Graph;
import com.courier.pojos.OrderStatus;
import com.courier.pojos.Orders;
import com.courier.pojos.Routes;
import com.courier.pojos.RoutesStatus;
import com.courier.pojos.TrackingIdGenerator;
import com.courier.pojos.Users;
import com.courier.pojos.Warehouse;
import com.courier.repository.AddressRepository;
import com.courier.repository.DeliveryAgentRepository;
import com.courier.repository.OrdersRepository;
import com.courier.repository.RouteRepository;
import com.courier.repository.UserRepository;
import com.courier.repository.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrderService {
	
	private static int deliveryagentNumber=0;

	@Autowired
	private OrdersRepository ordersRepository;

	@Autowired
	private UserRepository usersRepository;
	
	@Autowired
	private RouteRepository routesRepository;
	
	@Autowired
	private WarehouseRepository warehouseRepository;
	
	@Autowired
	private DeliveryAgentRepository deliveryAgentRepository;
	
	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private Graph graph;

	public List<OrderDto> getAllOrders() {
		List<Orders> orders = ordersRepository.findAll();
		List<OrderDto> ordersDto = orders.stream().map(order -> modelMapper.map(order, OrderDto.class))
				.collect(Collectors.toList());
		for (int i = 0; i < orders.size(); i++) {
			ordersDto.get(i).setSource(orders.get(i).getFromWarehouse().getLocation().getCity());
			ordersDto.get(i).setDestination(orders.get(i).getToWarehouse().getLocation().getCity());
		}
		return ordersDto;
	}

	public List<Orders> deliveryAgentHistory(Long id) {
		Users user = usersRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Delivery Agent not found with id "+id));
		DeliveryAgents agent = deliveryAgentRepository.findByUser(user);
		return ordersRepository.findByStatusAndDeliveryAgentId(OrderStatus.DELIVERED, agent);
	}

	public List<Orders> deliveryAgentDeliveries(Long id) {
		Users user = usersRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Delivery Agent not found with id "+id));
		DeliveryAgents agent = deliveryAgentRepository.findByUser(user);
		return ordersRepository.findByDeliveryAgentIdAndStatus(agent, OrderStatus.OUT_FOR_DELIVERY);
	}

	public PlaceOrderResponseDto placeOrder(PlaceOrderRequestDto requestDTO) {

		Users senderId = usersRepository.findById(requestDTO.getSenderId())
				.orElseThrow(() -> new ResourceNotFoundException("Sender not found"));

		Long fromWarehouseId = graph.getWarehouseNameToId().get(requestDTO.getFromWarehouse());
		Long toWarehouseId = graph.getWarehouseNameToId().get(requestDTO.getToWarehouse());
		
		Warehouse fromWarehouse = warehouseRepository.findById(fromWarehouseId)
				.orElseThrow(() -> new ResourceNotFoundException("Source warehouse not found with id "+fromWarehouseId));

		Warehouse toWarehouse = warehouseRepository.findById(toWarehouseId)
				.orElseThrow(() -> new ResourceNotFoundException("Destination warehouse not found with id "+toWarehouseId));
		
		Orders order = new Orders();
		order.setOrderDate(new Date());
		order.setDeliveryDate(null);
		order.setTrackingId(TrackingIdGenerator.generateTrackingId());
		order.setReceiverName(requestDTO.getReceiverName());
		order.setContactNumber(requestDTO.getContactNumber());
		order.setWeight(requestDTO.getWeight());
		order.setFromWarehouse(fromWarehouse);
		order.setToWarehouse(toWarehouse);
		order.setSenderId(senderId);
		order.setPrice(requestDTO.getPrice());
		order.setStatus(OrderStatus.PLACED);
		Address address=modelMapper.map(requestDTO, Address.class);
		order.setReceiverAddress(address);
		addressRepository.save(address);
		Orders savedOrder = ordersRepository.save(order);
		System.out.println("savedOrder"+savedOrder);
		
		
		PlaceOrderResponseDto responseDTO = new PlaceOrderResponseDto();
		responseDTO.setOrderId(savedOrder.getId());
		responseDTO.setTrackingId(savedOrder.getTrackingId());
		responseDTO.setOrderDate(savedOrder.getOrderDate());
		responseDTO.setReceiverName(savedOrder.getReceiverName());
		responseDTO.setContactNumber(savedOrder.getContactNumber());
		responseDTO.setWeight(savedOrder.getWeight());
		responseDTO.setPrice(savedOrder.getPrice());
		responseDTO.setStatus(savedOrder.getStatus());
		responseDTO.setFromWarehouse(savedOrder.getFromWarehouse().getLocation().getCity());
		responseDTO.setToWarehouse(savedOrder.getToWarehouse().getLocation().getCity());

		createRoutesForOrder(savedOrder,requestDTO.getFromWarehouse(),requestDTO.getToWarehouse());
		return responseDTO;

	}
	private void createRoutesForOrder(Orders order, String source, String destination) {
	    // Find the shortest path
	    Map<String, Object> pathResult = graph.dijkstra(source, destination);
	    
	    List<String> shortestPath = (List<String>) pathResult.get("path");

	    if (shortestPath.isEmpty()) {
	        throw new RuntimeException("No valid route found from " + source + " to " + destination);
	    }

	    List<Routes> routesList = new ArrayList<>();

	    // Get warehouse IDs
	    Long fromWarehouseId = graph.getWarehouseNameToId().get(source);
	    Long toWarehouseId = graph.getWarehouseNameToId().get(destination);

	    // Get the Warehouse object for the source warehouse
	    Warehouse sourceWarehouse = warehouseRepository.findById(fromWarehouseId)
	            .orElseThrow(() -> new ResourceNotFoundException("Source Warehouse not found"));

	    // 1. Add "PLACED" status for (A → A)
	    Routes firstRoute = new Routes();
	    firstRoute.setOrderId(order);
	    firstRoute.setFromId(sourceWarehouse);
	    firstRoute.setToId(sourceWarehouse); // A → A
	    firstRoute.setArrivalDate(LocalDateTime.now());
	    firstRoute.setStatus(RoutesStatus.PLACED);
	    routesList.add(firstRoute);

	    // 2. Add "NOT_REACHED" status for each segment in the shortest path
	    for (int i = 0; i < shortestPath.size() - 1; i++) {
	        String fromWarehouseName = shortestPath.get(i);
	        String toWarehouseName = shortestPath.get(i + 1);

	        Long intermediateFromId = graph.getWarehouseNameToId().get(fromWarehouseName);
	        Long intermediateToId = graph.getWarehouseNameToId().get(toWarehouseName);

	        Warehouse fromWarehouse = warehouseRepository.findById(intermediateFromId)
	                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with ID " + intermediateFromId));

	        Warehouse toWarehouse = warehouseRepository.findById(intermediateToId)
	                .orElseThrow(() -> new ResourceNotFoundException("Warehouse not found with ID " + intermediateToId));

	        Routes route = new Routes();
	        route.setOrderId(order);
	        route.setFromId(fromWarehouse);
	        route.setToId(toWarehouse);
	        route.setArrivalDate(null);
	        route.setStatus(RoutesStatus.NOT_REACHED);
	        routesList.add(route);
	    }

	    // Save all routes to the repository
	    routesRepository.saveAll(routesList);
	}


	public List<OrderDto> getAllOrdersByCustomer(Long customerId) {
		Users customer = usersRepository.findById(customerId).orElseThrow(()->new ResourceNotFoundException("Customer not found with id "+ customerId));
		List<Orders> orders = ordersRepository.findAllBySenderId(customer);
		List<OrderDto> ordersDto = orders.stream().map(order -> modelMapper.map(order, OrderDto.class))
				.collect(Collectors.toList());
		for (int i = 0; i < orders.size(); i++) {
			ordersDto.get(i).setSource(orders.get(i).getFromWarehouse().getLocation().getCity());
			ordersDto.get(i).setDestination(orders.get(i).getToWarehouse().getLocation().getCity());
		}
		return ordersDto;
	
	}

	public DeliveryAgents assignDelivery(Long routeId, Long managerId) {
		Routes route=routesRepository.findById(routeId).orElseThrow(()->new ResourceNotFoundException("Route not found with id "+ routeId));
		Users manager=usersRepository.findById(managerId).orElseThrow(()->new ResourceNotFoundException("Manager not found with id "+managerId));
		Warehouse warehouse=warehouseRepository.findByManager(manager);
		List<DeliveryAgents> agents= deliveryAgentRepository.findByWarehouse(warehouse);
		Orders order = route.getOrderId();
		order.setDeliveryAgentId(agents.get(deliveryagentNumber));
		order.setStatus(OrderStatus.OUT_FOR_DELIVERY);
		route.setDispatchDate(LocalDateTime.now());
		deliveryagentNumber=(deliveryagentNumber+1)%(agents.size());
		
		return order.getDeliveryAgentId();
	}

	public String deliverOrder(Long orderId) {
        Orders order = ordersRepository.findById(orderId).orElseThrow(()->new ResourceNotFoundException("Order not found with id "+ orderId));
        
        List<Routes> routes = routesRepository.findByOrderId(order);
        for(Routes route: routes) {
        	route.setStatus(RoutesStatus.DELIVERED);
        	routesRepository.save(route);
        }
        
        order.setDeliveryDate(new Date());
        order.setStatus(OrderStatus.DELIVERED);
        ordersRepository.save(order);
        return "success";
    }

}
