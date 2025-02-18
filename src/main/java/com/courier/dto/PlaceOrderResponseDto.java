

package com.courier.dto;

import java.util.Date;

import com.courier.pojos.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PlaceOrderResponseDto {
	private Long orderId;
    private String trackingId;
    private Date orderDate;
    private String receiverName;
    private String contactNumber;
    private double weight;
    private String fromWarehouse;
    private String toWarehouse;
    private double price;
    private OrderStatus status;
	
}