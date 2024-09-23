package com.najackdo.server.domain.book.dto;

import java.util.List;

import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.entity.BookStatus;

import lombok.Data;

public class BookData {

	@Data
	public static class Search{
		private Long bookId;
		private String title;
		private String author;
		private String cover;
		private String genre;
		private String description;
		private String publisher;
		private int priceStandard;
		private int itemPage;
		private int starPoint;
		private String pubDate;
		private Long isbn;

		public static Search of(Book book) {
			Search search = new Search();
			search.bookId = book.getId();
			search.title = book.getTitle();
			search.author = book.getAuthor();
			search.cover = book.getCover();
			search.genre = book.getGenre();
			search.description = book.getDescription();
			search.publisher = book.getPublisher();
			search.priceStandard = book.getPriceStandard();
			search.itemPage = book.getItemPage();
			search.starPoint = book.getStarPoint();
			search.pubDate = book.getPubDate().toString();
			search.isbn = book.getIsbn();
			return search;
		}
	}

	@Data
	public static class Interest{
		Long bookId;
	}

	@Data
	public static class DisplayBook {

		private Long bookId;
		private String cover;
		private BookStatus bookStatus;

	}

	@Data
	public static class BookCase {

		private Long userId;
		private String nickname;;
		private String userName;
		private List<DisplayBook> displayBooks;

		public static BookCase of(Long userId, String nickname, String userName, List<DisplayBook> displayBooks) {
			BookCase response = new BookCase();
			response.userId = userId;
			response.nickname = nickname;
			response.userName = userName;
			response.displayBooks = displayBooks;
			return response;
		}
	}

}
