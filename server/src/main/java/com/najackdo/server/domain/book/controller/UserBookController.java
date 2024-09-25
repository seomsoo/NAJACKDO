package com.najackdo.server.domain.book.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.book.dto.UserBookData;
import com.najackdo.server.domain.book.service.UserBooksService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/user-book")
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
	public SuccessResponse<UserBookData.InfoResponse> getUserBookInfo(@PathVariable Long userBookId) {
		return SuccessResponse.of(userBooksService.getUserBookInfo(userBookId));
	}
}
