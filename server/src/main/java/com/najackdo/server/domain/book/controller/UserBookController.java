package com.najackdo.server.domain.book.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.book.dto.UserBookData;
import com.najackdo.server.domain.book.service.UserBooksService;
import com.najackdo.server.domain.user.entity.User;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/user-book")
@Tag(name = "유저 책 관련 API ")
@Slf4j
public class UserBookController {

	private final UserBooksService userBooksService;

	/**
	 * 유저의 책 상세 정보 조회
	 *
	 * @param userBookId
	 * @return {@link UserBookData.InfoResponse}
	 */
	@GetMapping("/{userBookId}")
	@Operation(summary = "유저 책 상세 정보 조회", description = "유저 책 상세 정보 조회")
	public SuccessResponse<UserBookData.InfoResponse> getUserBookInfo(@CurrentUser User user, @PathVariable Long userBookId) {
		return SuccessResponse.of(userBooksService.getUserBookInfo(user, userBookId));
	}

	/**
	 * 대여료 수정
	 *
	 * @reqest updateRentalCost
	 * @return {@link }
	 */
	@PostMapping("/update/rental-cost")
	@Operation(summary = "대여료 수정", description = "대여료 수정")
	public SuccessResponse<Void> updateRentalCost(
		@RequestBody UserBookData.UpdateRentalCost updateRentalCost
	) {
		userBooksService.updateRentalCost(updateRentalCost.getUserBookId(), updateRentalCost.getUpdateRentalCost());
		return SuccessResponse.empty();
	}

	/**
	 * 책에 대해서 주변에 대여할 수 있는 책이 있는지 확인하는 API
	 * @param user
	 * @param bookId
	 * @return
	 */
	@GetMapping("/near-available/{bookId}")
	@Operation(summary = "특정 책에 대해 주변 책 대여 가능 여부 확인", description = "주변 책 대여 가능 여부 확인")
	public SuccessResponse<List<UserBookData.AvailableNearBook>> isNearRental(@CurrentUser User user, @PathVariable Long bookId) {
		return SuccessResponse.of(userBooksService.isNearAvailableBook(user, bookId));
	}



}
