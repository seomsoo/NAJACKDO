package com.najackdo.server.domain.book.dto;

import java.util.List;

import com.najackdo.server.domain.book.entity.UserBook;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

public class UserBookData {

	@Data
	public static class Search {
		private String title;

		public static Search of(UserBook book) {
			Search search = new Search();
			search.setTitle(book.getBook().getTitle());
			return search;
		}
	}

	@Data
	public static class Create {

		@NotNull
		private List<String> titles;

		public static Create of(List<String> titles) {
			Create create = new Create();
			create.titles = titles;
			return create;
		}

	}

	@Data
	public static class CreateByISBN {
		@NotNull
		private Long ISBN;
	}

	@Data
	public static class BookCase {
		private long userBookId;
		private String cover;
		private String title;
		private String author;
		private String description;
	}

	@Data
	public static class InfoResponse {
		private BookOwnerInfo BookOwnerInfo;
	}

	@Data
	public static class BookOwnerInfo {
		private Long userId;
		private String nickname;
		private String profileImage;
		private Integer mannerScore;
		private String location;
	}

	@Data
	public static class UserBookInfo {
		private Long userBookId;
		private Long bookId;

	}

	@Data
	public static class UserBookDetailInfo {
		private Long userBookDetailId;
		private Integer oneDayPrice;
		private Integer notch;
		private Integer ripped;
		private Integer spot;
	}

}
