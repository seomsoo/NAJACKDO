package com.najackdo.server.domain.rental.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.domain.rental.dto.RentalData;
import com.najackdo.server.domain.rental.service.RentalService;
import com.najackdo.server.domain.user.entity.User;

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
	 * @param customer
	 * @param rentalRequest
	 */
	@PostMapping("")
	public void rental(@CurrentUser User customer, @RequestBody RentalData.RentalRequest rentalRequest) {
		rentalService.rental(customer, rentalRequest);
	}
}
