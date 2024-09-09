package com.najackdo.server.domain.location.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.location.dto.LocationData;
import com.najackdo.server.domain.location.service.LocationService;

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
		@RequestBody LocationData.Request request,
		@PageableDefault(size = 10) Pageable pageable) {

		Page<LocationData.Search> nearLocation = locationService.getNearLocation(request, pageable);

		return SuccessResponse.of(nearLocation);
	}
}
