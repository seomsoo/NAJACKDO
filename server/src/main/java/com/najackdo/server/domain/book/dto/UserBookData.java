package com.najackdo.server.domain.book.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

public class UserBookData {

	@Data
	public static class Create {

		@NotNull
		private List<String> titles;

		@NotNull
		private int locationId;

		public static Create of(List<String> titles, int locationId) {
			Create create = new Create();
			create.titles = titles;
			create.locationId = locationId;
			return create;
		}
	}

	@Data
	public static class CreateByISBN {

		@NotNull
		private String ISBN;

		@NotNull
		private int locationId;

		public static CreateByISBN of(String ISBN, int locationId) {
			CreateByISBN create = new CreateByISBN();
			create.ISBN = ISBN;
			create.locationId = locationId;
			return create;
		}
	}

	@Data
	public static class BookCase {
		private long userBookId;
		private String cover;
		private String title;
		private String author;
		private String description;
	}
}
