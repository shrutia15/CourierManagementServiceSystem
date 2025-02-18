package com.courier.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.courier.pojos.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
