package com.najackdo.server.domain.rental.dto;

import java.time.LocalDateTime;

import com.najackdo.server.domain.rental.entity.RentalStatus;

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
		private Long cartId;
		private Long customerId;
	}

	@Data
	public static class RentalResponse {

		// * UserBookDetail
		private String img;
		// * Book
		private String title;
		private String author;
		private String publisher;
		// * Rental
		private RentalStatus status;
		private LocalDateTime rentalStartDate;
		private LocalDateTime rentalEndDate;
	}

}
