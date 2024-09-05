package com.najackdo.server.domain.rental.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "book_schedules")
@Getter
@NoArgsConstructor
public class RentalSchedule {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "scedule_id", nullable = false)
	private Long id;

	@Column(name = "pickup_date")
	private Date pickupDate;

	@Column(name = "pickup_location")
	private String pickupLocation;

	@Column(name = "return_date")
	private Date returnDate;

	@Column(name = "return_location")
	private String returnLocation;
}
