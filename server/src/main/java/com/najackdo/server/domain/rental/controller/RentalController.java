package com.najackdo.server.domain.rental.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.rental.dto.RentalData;
import com.najackdo.server.domain.rental.service.RentalService;
import com.najackdo.server.domain.user.entity.User;

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
	 * @return {@link SuccessResponse<Void>}
	 */
	@PostMapping("")
	@Operation(summary = "렌탈 신청", description = "렌탈 신청")
	public SuccessResponse<Void> rental(@RequestBody RentalData.RentalRequest rentalRequest) {

		return rentalService.rentalCart(rentalRequest);
	}

	/**
	 * 반납 api
	 *
	 * @param user
	 */
	@PostMapping("/return")
	@Operation(summary = "반납", description = "반납")
	public SuccessResponse<Void> returnRental(@CurrentUser User user,
		@RequestBody RentalData.ReturnRequest returnRequest) {
		return rentalService.returnRental(user, returnRequest);
	}

	/**
	 * 빌려준 내역 조회 api
	 */
	@GetMapping("/lend")
	@Operation(summary = "빌려준 내역 조회", description = "빌려준 내역 조회")
	public SuccessResponse<List<RentalData.RentalHistory>> lendList(@CurrentUser User user) {

		return SuccessResponse.of(rentalService.lendList(user));
	}

	/**
	 * 빌린 내역 조회 api
	 */
	@GetMapping("/borrow")
	@Operation(summary = "빌린 내역 조회", description = "빌린 내역 조회")
	public SuccessResponse<List<RentalData.RentalHistory>> borrowList(@CurrentUser User user) {
		return SuccessResponse.of(rentalService.borrowList(user));
	}

	/**
	 * 오늘의 베스트셀러 조회
	 *
	 * @return
	 */
	@GetMapping("/best-seller")
	@Operation(summary = "오늘의 베스트셀러 조회", description = "오늘의 베스트셀러 조회")
	public SuccessResponse<List<BookData.Search>> getBestSeller() {
		return SuccessResponse.of(rentalService.getBestSeller());
	}

	@GetMapping("/local-best-seller")
	@Operation(summary = "지역 베스트셀러 조회", description = "지역 베스트셀러 조회")
	public SuccessResponse<List<BookData.Search>> getLocalBestSeller(@CurrentUser User user) {
		return SuccessResponse.of(rentalService.getLocalBestSeller(user));
	}
}


