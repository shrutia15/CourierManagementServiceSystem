package com.courier.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.pojos.DeliveryAgents;
import com.courier.pojos.OrderStatus;
import com.courier.pojos.Orders;
import com.courier.pojos.Users;


public interface OrdersRepository extends JpaRepository<Orders, Long> {
	
	

	List<Orders> findAllBySenderId(Users customer);

	Orders findByTrackingId(String trackingId);

	List<Orders> findByDeliveryAgentIdAndStatus(DeliveryAgents agent, OrderStatus outForDelivery);

	List<Orders> findByStatusAndDeliveryAgentId(OrderStatus delivered, DeliveryAgents agent);

	boolean existsByTrackingId(String trackingId);



}
