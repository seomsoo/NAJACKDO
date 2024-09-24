package com.najackdo.server.domain.rental.entity;

import java.time.LocalDateTime;

import com.najackdo.server.domain.cart.entity.Cart;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "rental")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Rental {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "book_rental_id", nullable = false)
	private Long id;
	
	@OneToOne
	@JoinColumn(name = "cart_id")
	private Cart cartId;

	@Column(name = "rental_start_date")
	private LocalDateTime rentalStartDate;

	@Column(name = "rental_end_date")
	private LocalDateTime rentalEndDate;

	@Column(name = "rental_period")
	private Integer rentalPeriod;

	@Column(name = "rental_cost")
	private Integer rentalCost;

	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private RentalStatus status;

}
