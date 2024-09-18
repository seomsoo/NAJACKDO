package com.najackdo.server.domain.location.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.location.dto.LocationData;
import com.najackdo.server.domain.location.service.LocationService;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/api/v1/location")
@RequiredArgsConstructor
public class LocationController {

	private final LocationService locationService;

	@GetMapping("/near-location")
	public SuccessResponse<Page<LocationData.Search>> getNearLocation(
		@RequestParam double longitude,
		@RequestParam double latitude,
		@PageableDefault(size = 10) Pageable pageable) {

		LocationData.Request request = new LocationData.Request();
		request.setLongitude(longitude);
		request.setLatitude(latitude);

		Page<LocationData.Search> nearLocation = locationService.getNearLocation(request, pageable);
		return SuccessResponse.of(nearLocation);
	}

	@GetMapping("/near-neighborhood")
	public SuccessResponse<List<List<LocationData.SearchWithGeom>>> getNearLocation(
		@RequestParam double longitude,
		@RequestParam double latitude
	) {

		LocationData.Request request = new LocationData.Request();
		request.setLatitude(latitude);
		request.setLongitude(longitude);

		return SuccessResponse.of(locationService.getNeighborhood(request));

	}

	@PostMapping("")
	public SuccessResponse<Void> registActivityArea(
		@CurrentUser User user,
		@RequestBody LocationData.Regist request) {

		locationService.registActivityArea(user, request);

		return SuccessResponse.empty();
	}

}
