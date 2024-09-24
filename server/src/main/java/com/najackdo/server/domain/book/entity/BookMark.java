package com.najackdo.server.domain.book.entity;

import com.najackdo.server.core.entity.TimeEntity;
import com.najackdo.server.domain.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "book_mark")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BookMark {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "book_mark_id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "book_id", nullable = false)
	private Book book;

	public static BookMark createBookMark(User user, Book book) {
		BookMark bookMark = new BookMark();
		bookMark.user = user;
		bookMark.book = book;
		return bookMark;
	}

}
