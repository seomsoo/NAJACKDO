package com.najackdo.server.domain.location.entity;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.MultiPolygon;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;

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

	@Column(columnDefinition = "geometry(Multipolygon, 4326)")
	private MultiPolygon locationPolygon;  // Multipolygon

	@Column(columnDefinition = "geometry(Point, 4326)")
	private Point locationPoint;    // Point

}
