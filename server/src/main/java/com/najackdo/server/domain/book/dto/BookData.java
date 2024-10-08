package com.najackdo.server.domain.book.dto;

import java.util.List;

import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.entity.BookStatus;

import lombok.Data;

public class BookData {

	@Data
	public static class Search {
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
		private boolean isInterest;

		public static Search from(Book book) {
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

		public static Search of(Book book, List<Book> userInterestingBooks) {
			Search search = from(book);
			search.isInterest = userInterestingBooks.contains(book);
			return search;
		}

	}

	@Data
	public static class DisplayBook {
		private Long bookId;
		private String bookTitle;
		private Long userBookId;
		private String cover;
		private BookStatus bookStatus;

		public static DisplayBook of(Long bookId, String bookTitle, Long userBookId, String cover, BookStatus bookStatus) {
			DisplayBook displayBook = new DisplayBook();
			displayBook.bookId = bookId;
			displayBook.bookTitle = bookTitle;
			displayBook.userBookId = userBookId;
			displayBook.cover = cover;
			displayBook.bookStatus = bookStatus;
			return displayBook;
		}
	}

	@Data
	public static class BookCase {

		private Long userId;
		private String nickname;
		private String profileImage;
		private boolean isFollow;
		private List<DisplayBook> displayBooks;

		public static BookCase of(
			Long userId,
			boolean isFollow,
			String nickname,
			String profileImage,
			List<DisplayBook> displayBooks) {
			BookCase response = new BookCase();
			response.userId = userId;
			response.isFollow = isFollow;
			response.nickname = nickname;
			response.profileImage = profileImage;
			response.displayBooks = displayBooks;
			return response;
		}

		public static BookCase ofWithOutIsFollow(
			Long userId,
			String nickname,
			String profileImage,
			List<DisplayBook> displayBooks) {
			BookCase response = new BookCase();
			response.userId = userId;
			response.nickname = nickname;
			response.profileImage = profileImage;
			response.displayBooks = displayBooks;
			return response;
		}
	}

}
