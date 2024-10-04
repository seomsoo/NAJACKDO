package com.najackdo.server.domain.rental.dto;

import java.time.LocalDateTime;
import java.util.List;

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

	@Data
	public static class RentalHistory{

		private Long rentalId;
		private String otherUseNickName;
		private String otherUseProfileImg;

		private LocalDateTime rentalStartDate;
		private LocalDateTime rentalEndDate;
		private RentalStatus status;
		private Integer rentalCost;
		private Integer rentalPeriod;

		private List<RentalBook> rentalBooks;

		public static RentalHistory create(Long rentalId, String otherUseNickName, String otherUseProfileImg, LocalDateTime rentalStartDate, LocalDateTime rentalEndDate, RentalStatus status, Integer rentalCost, Integer rentalPeriod, List<RentalBook> rentalBooks){
			RentalHistory rentalHistory = new RentalHistory();
			rentalHistory.setRentalId(rentalId);
			rentalHistory.setOtherUseNickName(otherUseNickName);
			rentalHistory.setOtherUseProfileImg(otherUseProfileImg);
			rentalHistory.setRentalStartDate(rentalStartDate);
			rentalHistory.setRentalEndDate(rentalEndDate);
			rentalHistory.setStatus(status);
			rentalHistory.setRentalCost(rentalCost);
			rentalHistory.setRentalPeriod(rentalPeriod);
			rentalHistory.setRentalBooks(rentalBooks);
			return rentalHistory;
		}
	}

	@Data
	public static class RentalBook{
		private String coverImg;
		private String title;
		private String author;
		private String publisher;
		private Integer oneDayPrice;

		public static RentalBook create(String coverImg, String title, String author, String publisher, Integer oneDayPrice){
			RentalBook rentalBook = new RentalBook();
			rentalBook.setCoverImg(coverImg);
			rentalBook.setTitle(title);
			rentalBook.setAuthor(author);
			rentalBook.setPublisher(publisher);
			rentalBook.setOneDayPrice(oneDayPrice);
			return rentalBook;
		}

	}



}
