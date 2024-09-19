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

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.location.dto.LocationData;
import com.najackdo.server.domain.location.entity.ActivityAreaSetting;
import com.najackdo.server.domain.location.entity.Location;
import com.najackdo.server.domain.location.repository.ActivityAreaSettingRepository;
import com.najackdo.server.domain.location.repository.LocationRepository;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class LocationService {

	private final LocationRepository locationRepository;
	private final ActivityAreaSettingRepository activityAreaSettingRepository;

	/**
	 * 현재 위치를 기준으로 가까운 위치를 조회한다.
	 * 모든 위치 페이지 처리
	 * 지역 목록을 보여주기 위해
	 * @param request
	 * @param pageable
	 * @return
	 */
	public Page<LocationData.Search> getNearLocation(LocationData.Request request, Pageable pageable) {

		Page<Location> locations = locationRepository.findLocationsByDistance(getPoint(request.getLatitude(), request.getLongitude()), pageable);
		List<LocationData.Search> searchResults = locations.stream()
			.map(LocationData.Search::fromEntity)
			.collect(Collectors.toList());

		return new PageImpl<>(searchResults, pageable, locations.getTotalElements());
	}

	/**
	 * 현재 위치를 기준으로 거리별 주변 지역 조회
	 * 지도를 그려주기 위해 폴리곤 데이터도 포함
	 *
	 * @param request
	 */
	public List<List<LocationData.SearchWithGeom>> getNeighborhood(LocationData.Request request) {
		Location userLocation = locationRepository.findClosestLocation(
			getPoint(
				request.getLatitude(),
				request.getLongitude()));

		List<List<LocationData.SearchWithGeom>> result = List.of(
			locationRepository.findLocationsWithPoligonByDistance(
					userLocation.getLocationPoint(),
					0.02).stream()
				.map(LocationData.SearchWithGeom::fromEntity)
				.collect(Collectors.toList()),

			locationRepository.findLocationsWithPoligonByDistance(
					userLocation.getLocationPoint(),
					0.025).stream()
				.map(LocationData.SearchWithGeom::fromEntity)
				.collect(Collectors.toList()),

			locationRepository.findLocationsWithPoligonByDistance(
					userLocation.getLocationPoint(),
					0.03).stream()
				.map(LocationData.SearchWithGeom::fromEntity)
				.collect(Collectors.toList()),

			locationRepository.findLocationsWithPoligonByDistance(
					userLocation.getLocationPoint(),
					0.035).stream()
				.map(LocationData.SearchWithGeom::fromEntity)
				.collect(Collectors.toList())
		);

		log.info("result1: {}", result.get(0).size());
		log.info("result2: {}", result.get(1).size());
		log.info("result3: {}", result.get(2).size());
		log.info("result4: {}", result.get(3).size());


		return result;
	}


	public void registActivityArea(User user, LocationData.Regist request) {
		Location closestLocation = locationRepository.findById(request.getLocationCode())
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_LOCATION));

		log.info(closestLocation.getLocationName());
		log.info("closestLocation: {}", closestLocation);

		activityAreaSettingRepository.findByUser(user).ifPresent(activityAreaSettingRepository::delete);

		activityAreaSettingRepository.save(
			ActivityAreaSetting.create(user, closestLocation, request.getDistanceMeters()));
	}


	private Point getPoint(double latitude, double longitude) {
		GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
		Point point = geometryFactory.createPoint(new Coordinate(longitude, latitude));
		return point;
	}


}
