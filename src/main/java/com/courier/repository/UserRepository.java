package com.courier.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.pojos.Role;
import com.courier.pojos.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
	
	Users findByEmailAndPassword(String email, String password);

	List<Users> findByRole(Role deliveryAgent);

	Users findByEmail(String email);

	boolean existsByEmail(String email);

}
