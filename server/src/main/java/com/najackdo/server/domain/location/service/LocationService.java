package com.najackdo.server.domain.location.service;

import java.util.List;
import java.util.stream.Collectors;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.najackdo.server.domain.location.dto.LocationData;
import com.najackdo.server.domain.location.entity.Location;
import com.najackdo.server.domain.location.repository.LocationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class LocationService {

	private final LocationRepository locationRepository;

	public Page<LocationData.Search> getNearLocation(LocationData.Request request, Pageable pageable) {

		Page<Location> locations = locationRepository.findLocationsByDistance(getPoint(request.getLatitude(), request.getLongitude()), pageable);
		List<LocationData.Search> searchResults = locations.stream()
			.map(LocationData.Search::fromEntity)
			.collect(Collectors.toList());

		return new PageImpl<>(searchResults, pageable, locations.getTotalElements());
	}


	private Point getPoint(double latitude, double longitude) {
		GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
		Point point = geometryFactory.createPoint(new Coordinate(latitude, longitude));
		return point;
	}
}
