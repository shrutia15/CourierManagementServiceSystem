package com.courier.exceptionHandler;


import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.courier.dto.ApiResponse;
import com.courier.exceptions.ResourceNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public ApiResponse handleResourceNotFoundException(
			ResourceNotFoundException e) {
		System.out.println("in res not found " + e);
		return new ApiResponse(e.getMessage());
	}

		@ExceptionHandler(AuthenticationException.class)
		@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
		public ApiResponse handleAuthenticationException(
				AuthenticationException e) {
			System.out.println("in auth exc " + e);
			return new ApiResponse(e.getMessage());
		}

	

	@ExceptionHandler(RuntimeException.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public ApiResponse handleAnyException(RuntimeException e) {
		System.out.println("in catch-all " + e);
		return new ApiResponse(e.getMessage());
	}
}

