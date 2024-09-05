package com.najackdo.server.domain.book.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_book_details")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserBookDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "book_damage_id", nullable = false)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_books_id", nullable = false)
	private UserBook userBook;

	@Column(name = "barcode", nullable = false)
	private Integer barcode;

	@Column(name = "notch", nullable = false)
	private Integer notch;

	@Column(name = "ripped", nullable = false)
	private Integer ripped;

	@Column(name = "spot", nullable = false)
	private Integer spot;

	@Column(name = "tag", nullable = false)
	private Integer tag;

	@Column(name = "wornout", nullable = false)
	private Integer wornout;

	@Column(name = "front_image_path", nullable = false)
	private String frontImagePath;

	@Column(name = "back_image_path", nullable = false)
	private String backImagePath;

	@Column(name = "used_price")
	private Integer usedPrice;

	@Column(name = "oneday_price")
	private Integer onedayPrice;
}
