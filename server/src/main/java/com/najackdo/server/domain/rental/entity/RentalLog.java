package com.najackdo.server.domain.rental.entity;

import com.najackdo.server.core.entity.TimeEntity;
import com.najackdo.server.domain.book.entity.UserBook;

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
@Table(name = "rental_log")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RentalLog extends TimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "book_rental_detail_id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_books_id", nullable = false)
	private UserBook userBook;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "book_rental_id", nullable = false)
	private Rental bookRental;
}
