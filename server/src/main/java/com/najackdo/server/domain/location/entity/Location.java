package com.najackdo.server.domain.location.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "location")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Location {

	@Id
	@Column(name = "location_code", nullable = false)
	private Integer id;

	@Column(name = "location_name", nullable = false)
	private String locationName;

	@Column(name = "location_polygon", nullable = false)
	private String locationPolygon;  // Multipolygon

	@Column(name = "location_point", nullable = false)
	private String locationPoint;    // Point
}
