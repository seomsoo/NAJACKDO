package com.najackdo.server.domain.rental.entity;

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
@Getter
@Table(name = "rental_review")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RentalReview extends TimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "rental_review_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "rental_id", nullable = false)
	private Rental rental;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "reviewee_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "review_item_id", nullable = false)
	private ReviewItems reviewItems;

	public static RentalReview createRentalReview(Rental rental, User user, ReviewItems reviewItems) {
		RentalReview rentalReview = new RentalReview();
		rentalReview.rental = rental;
		rentalReview.user = user;
		rentalReview.reviewItems = reviewItems;
		return rentalReview;
	}
}
