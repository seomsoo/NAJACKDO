package com.najackdo.server.domain.rental.dto;

import java.util.List;

import lombok.Data;

public class ReviewData {
	@Data
	public static class ReviewRequest {
		private Long rentalId;
		private List<Long> reviewItemIds;
	}
}