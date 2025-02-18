package com.courier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlaceOrderRequestDto {
    private Long senderId; 
    private String receiverName;
    private String contactNumber;
    private double weight;
    private String fromWarehouse; 
    private String toWarehouse;   
    private double price;
    private String flatNo;
	private String streetName;
	private String landmark;
	private String city;
	private String state;
	private int pincode;
	
}