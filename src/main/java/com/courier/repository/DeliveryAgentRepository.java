package com.courier.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.pojos.DeliveryAgents;
import com.courier.pojos.Users;
import com.courier.pojos.Warehouse;

public interface DeliveryAgentRepository extends JpaRepository<DeliveryAgents, Long>{

	List<DeliveryAgents> findByWarehouse(Warehouse warehouse);

	DeliveryAgents findByUser(Users user);

}
