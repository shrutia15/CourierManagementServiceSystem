package com.courier.dto;

import java.time.LocalDateTime;

import com.courier.pojos.Orders;
import com.courier.pojos.RoutesStatus;
import com.courier.pojos.Warehouse;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoutesDto {
	
	private LocalDateTime dispatchDate;
	
	private LocalDateTime arrivalDate;
	
	private String status;

	private String fromWarehouse;
	
	
	private String toWarehouse;
	
}
