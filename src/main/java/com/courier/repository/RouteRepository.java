package com.courier.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.pojos.Orders;
import com.courier.pojos.Routes;
import com.courier.pojos.RoutesStatus;
import com.courier.pojos.Warehouse;

public interface RouteRepository extends JpaRepository<Routes, Long> {

	List<Routes> findByToIdAndStatus(Warehouse warehouse, RoutesStatus placed);


	List<Routes> findByOrderId(Orders order);

	List<Routes> findByFromIdInAndOrderIdIn(List<Warehouse> nextFromWarehouses, List<Orders> orderIds);


	Routes findRoutesByFromIdAndStatusAndOrderId(Warehouse warehouse, RoutesStatus notReached, Orders orderId);



}
