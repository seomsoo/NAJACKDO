package com.najackdo.server.domain.location.repository;

import java.util.List;

import org.locationtech.jts.geom.Point;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import com.najackdo.server.domain.location.entity.Location;

public interface LocationQueryRepository {
	Page<Location> findLocationsByDistance(@Param("point") Point point, Pageable pageable);

	Location findClosestLocation(@Param("point") Point point);

	List<Location> findLocationsWithPoligonByDistance(@Param("point") Point point, Double distance);
}

