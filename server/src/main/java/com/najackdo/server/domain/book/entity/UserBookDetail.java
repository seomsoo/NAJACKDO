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
	@Column(name = "book_detail_id", nullable = false)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_books_id", nullable = false)
	private UserBook userBook;

	@Column(name = "ripped", nullable = false)
	private Integer ripped = 0;

	@Column(name = "wornout", nullable = false)
	private Integer wornout = 0;

	@Column(name = "front_image_path", nullable = false)
	private String frontImagePath;

	@Column(name = "back_image_path", nullable = false)
	private String backImagePath;

	@Column(name = "inspect_front_image_path", nullable = false)
	private String inspectFrontImagePath;

	@Column(name = "inspect_back_image_path", nullable = false)
	private String inspectBackImagePath;

	@Column(name = "used_price")
	private Integer usedPrice;

	@Column(name = "oneday_price")
	private Integer onedayPrice;

	public void updateRentalCost(Integer updateRentalCost) {
		this.onedayPrice = updateRentalCost;
	}
}
