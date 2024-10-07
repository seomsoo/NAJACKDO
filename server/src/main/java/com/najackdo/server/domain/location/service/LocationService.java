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
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.location.dto.LocationData;
import com.najackdo.server.domain.location.entity.ActivityAreaSetting;
import com.najackdo.server.domain.location.entity.Location;
import com.najackdo.server.domain.location.repository.ActivityAreaSettingRepository;
import com.najackdo.server.domain.location.repository.LocationCacheRepository;
import com.najackdo.server.domain.location.repository.LocationRepository;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class LocationService {

	private final LocationCacheRepository locationCacheRepository;

	private final LocationRepository locationRepository;
	private final ActivityAreaSettingRepository activityAreaSettingRepository;
	private final UserRepository userRepository;

	private static final String Location_KEY = "location:";

	/**
	 * 현재 위치를 기준으로 가까운 위치를 조회한다.
	 * 모든 위치 페이지 처리
	 * 지역 목록을 보여주기 위해
	 * @param request
	 * @param pageable
	 * @return
	 */
	public Page<LocationData.Search> getNearLocation(LocationData.Request request, Pageable pageable) {

		Page<Location> locations = locationRepository.findLocationsByDistance(
			getPoint(request.getLatitude(), request.getLongitude()), pageable);
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
					0.028).stream()
				.map(LocationData.SearchWithGeom::fromEntity)
				.collect(Collectors.toList()),

			locationRepository.findLocationsWithPoligonByDistance(
					userLocation.getLocationPoint(),
					0.036).stream()
				.map(LocationData.SearchWithGeom::fromEntity)
				.collect(Collectors.toList()),

			locationRepository.findLocationsWithPoligonByDistance(
					userLocation.getLocationPoint(),
					0.044).stream()
				.map(LocationData.SearchWithGeom::fromEntity)
				.collect(Collectors.toList())
		);


		return result;
	}

	@Transactional
	public void registActivityArea(User user, LocationData.Regist request) {
		Location location = locationRepository.findById(request.getLocationCode())
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_LOCATION));

		ActivityAreaSetting existingSetting = activityAreaSettingRepository.findByUser(user)
			.orElseGet(() -> {
				ActivityAreaSetting newSetting = ActivityAreaSetting.create(user, location,
					request.getDistanceMeters());
				user.setActivityAreaSetting(newSetting);
				userRepository.save(user);
				return newSetting;
			});

		existingSetting.updateLocation(location);
		existingSetting.setDistanceMeters(request.getDistanceMeters());

		user.setActivityAreaSetting(existingSetting);

		activityAreaSettingRepository.save(existingSetting);
		userRepository.save(user);

		locationCacheRepository.deleteUserLocation(user.getId());

		List<Integer> nearLocations = locationRepository.findLocationsWithPoligonByDistance(
				location.getLocationPoint(),
				request.getDistanceMeters()).stream()
			.map(LocationData.SearchWithGeom::onlyLocationCode)
			.toList();

		locationCacheRepository.saveUserLocation(user.getId(), nearLocations);
	}

	private Point getPoint(double latitude, double longitude) {
		GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
		Point point = geometryFactory.createPoint(new Coordinate(longitude, latitude));
		return point;
	}

}
