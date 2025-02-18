package com.courier.dto;

import com.courier.pojos.Address;
import com.courier.pojos.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToOne;

public class UserDto {
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String contactNumber;

}
