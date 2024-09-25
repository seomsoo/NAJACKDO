package com.najackdo.server.domain.rental.dto;

import lombok.Data;

public class RentalData {

	@Data
	public static class RentalRequest {
		private Long cartId;
		private int rentalCost;
		private int rentalPeriod;
		private int totalPrice;

	}

	@Data
	public static class ReturnRequest {
		private Long rentalId;
		private Long customerId;
	}
}
