package com.courier.dto;

import com.courier.pojos.Address;
import com.courier.pojos.Users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WarehouseDto {
	private Long id;
	private Address location;
	private Long managerId;
	private String managerName;

}
