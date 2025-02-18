package com.courier.dto;

import lombok.Data;

@Data
public class ReviewDto{

	private Long id;
	
	private String reviewText;

	private int rating;
}