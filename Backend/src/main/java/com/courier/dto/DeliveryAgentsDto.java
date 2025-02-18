package com.courier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DeliveryAgentsDto {
	private String firstName;
	private String lastName;
	private String email;
	private String contactNumber;
	private Long id;
	private String flatNo;
	private String streetName;
	private String landmark;
	private String city;
	private String state;
	private int pincode;
	

}
