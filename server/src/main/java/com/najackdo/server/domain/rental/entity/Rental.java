package com.najackdo.server.domain.rental.entity;

import java.sql.Date;

import com.najackdo.server.domain.user.entity.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "book_rental")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Rental {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "book_rental_id", nullable = false)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "scedule_id", nullable = false)
	private RentalSchedule schedule;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "loner_id", nullable = false)
	private User loner;

	@Column(name = "rental_start_date")
	private Date rentalStartDate;

	@Column(name = "rental_end_date")
	private Date rentalEndDate;

	@Column(name = "rental_period")
	private Integer rentalPeriod;

	@Column(name = "rental_cost")
	private Integer rentalCost;

	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private RentalStatus status;

}
