package com.najackdo.server.domain.rental.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.rental.dto.RentalData;
import com.najackdo.server.domain.rental.service.RentalService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/api/v1/rental")
@RequiredArgsConstructor
@Tag(name = "렌탈 관련 API ")
public class RentalController {

	private final RentalService rentalService;

	/**
	 * 렌탈 신청 api
	 *
	 * @param rentalRequest
	 */
	@PostMapping("")
	@Operation(summary = "렌탈 신청", description = "렌탈 신청")
	public SuccessResponse<Void> rental(@RequestBody RentalData.RentalRequest rentalRequest) {
		return rentalService.rentalCart(rentalRequest);
	}
}
