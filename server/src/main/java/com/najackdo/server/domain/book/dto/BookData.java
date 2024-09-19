package com.najackdo.server.domain.book.dto;

import com.najackdo.server.domain.book.entity.Book;

import lombok.Data;

public class BookData {

	@Data
	public static class Search{
		private final String title;
		private final String author;
		private final String cover;
		private final String genre;
		private final String description;
		private final String publisher;
		private final int priceStandard;
		private final int itemPage;
		private final int starPoint;
		private final String pubDate;
		private final Long isbn;

		public Search(Book book) {
			this.title = book.getTitle();
			this.author = book.getAuthor();
			this.cover = book.getCover();
			this.genre = book.getGenre();
			this.description = book.getDescription();
			this.publisher = book.getPublisher();
			this.priceStandard = book.getPriceStandard();
			this.itemPage = book.getItemPage();
			this.starPoint = book.getStarPoint();
			this.pubDate = book.getPubDate().toString();
			this.isbn = book.getIsbn();
		}
	}

	@Data
	public static class Interest{
		Long bookId;
	}
}
