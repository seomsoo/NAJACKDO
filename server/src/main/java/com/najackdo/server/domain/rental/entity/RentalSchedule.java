package com.najackdo.server.domain.rental.entity;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;

import com.najackdo.server.core.entity.TimeEntity;

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
@Table(name = "rental_schedule")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RentalSchedule extends TimeEntity {

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
