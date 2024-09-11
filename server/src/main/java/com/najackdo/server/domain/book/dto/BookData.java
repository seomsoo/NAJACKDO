package com.najackdo.server.domain.book.dto;

import java.util.List;

import com.najackdo.server.domain.book.entity.BookStatus;

import lombok.Data;

public class BookData {

	@Data
	public static class DisplayBook {

		private Long bookId;
		private String cover;
		private BookStatus bookStatus;

	}

	@Data
	public static class BookCase {

		private String userName;
		private List<DisplayBook> displayBooks;

		public static BookCase of(String userName, List<DisplayBook> displayBooks) {
			BookCase response = new BookCase();
			response.userName = userName;
			response.displayBooks = displayBooks;
			return response;
		}
	}

}
