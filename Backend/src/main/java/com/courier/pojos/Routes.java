package com.courier.pojos;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Routes")
public class Routes {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private LocalDateTime dispatchDate;
	
	private LocalDateTime arrivalDate;
	
//	private String Status;
	@Enumerated(EnumType.STRING)
	private RoutesStatus status;
	
	
	@ManyToOne
	@JoinColumn(name="order_id",nullable = false)
	private Orders orderId;
	
	@ManyToOne
	@JoinColumn(name="From_Wid",nullable = false)
	private Warehouse fromId;
	
	@ManyToOne
	@JoinColumn(name="To_Wid",nullable = false)
	private Warehouse toId;
	
	
	
	

}
