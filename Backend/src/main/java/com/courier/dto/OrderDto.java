package com.courier.dto;

import java.util.Date;

import com.courier.pojos.OrderStatus;
import com.courier.pojos.Warehouse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
	private Long Id;
	private Date orderDate;
	private Date deliveryDate;
	private String trackingId;
	private double price;
	private String receiverName;
	private String contactNumber;
	private double Weight;
	private String source;
	private String destination;
	private OrderStatus status;
}
