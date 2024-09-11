package com.najackdo.server.domain.book.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.service.BookService;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/api/v1/user")
@RequiredArgsConstructor
public class BookController {

	private final BookService bookService;
	
	/**
	 * 관심 책장 목록 조회 API
	 *
	 * @param user
	 * @return {@link  List<BookData.BookCase>}
	 */
	@GetMapping("/bookcase/interest")
	public SuccessResponse<List<BookData.BookCase>> getUserInterest(@CurrentUser User user) {
		return SuccessResponse.of(bookService.getBookCaseInterest(user));
	}

	/**
	 * 이름으로 책장 목록 조회 API
	 *
	 * @param user
	 * @param nickname
	 * @return {@link BookData.BookCase}
	 */
	@GetMapping("/bookcase/{nickname}")
	public SuccessResponse<BookData.BookCase> getUserBookCaseByNickName(
		@CurrentUser User user,
		@PathVariable String nickname) {
		return SuccessResponse.of(bookService.getBookCaseByNickName(nickname));
	}

}
