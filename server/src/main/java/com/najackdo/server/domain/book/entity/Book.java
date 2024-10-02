package com.najackdo.server.domain.book.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "books")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "book_id", nullable = false)
	private Long id;

	@Column(name = "isbn", nullable = false)
	private Long isbn;

	@Column(name = "description", columnDefinition = "TEXT")
	private String description;

	@Column(name = "genre")
	private String genre;

	@Column(name = "title", columnDefinition = "TEXT")
	private String title;

	@Column(name = "author", columnDefinition = "TEXT")
	private String author;

	@Column(name = "cover")
	private String cover;

	@Column(name = "pub_date")
	private Date pubDate;

	@Column(name = "price_standard")
	private int priceStandard;

	@Column(name = "itempage")
	private int itemPage;

	@Column(name = "star_point")
	private int starPoint;

	@Column(name = "publisher")
	private String publisher;

	public static Book createBook(Long isbn, String description, String genre, String title, String author,
		String cover, Date pubDate, int priceStandard, int itemPage, int starPoint, String publisher) {
		Book book = new Book();
		book.isbn = isbn;
		book.description = description;
		book.genre = genre;
		book.title = title;
		book.author = author;
		book.cover = cover;
		book.pubDate = pubDate;
		book.priceStandard = priceStandard;
		book.itemPage = itemPage;
		book.starPoint = starPoint;
		book.publisher = publisher;
		return book;
	}

}
