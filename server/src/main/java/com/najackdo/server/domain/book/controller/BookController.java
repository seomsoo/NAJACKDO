package com.najackdo.server.domain.book.controller;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.dto.UserBookData;
import com.najackdo.server.domain.book.repository.BookRepository;
import com.najackdo.server.domain.book.service.BookService;
import com.najackdo.server.domain.book.service.UserBooksService;
import com.najackdo.server.domain.notification.service.NotificationService;
import com.najackdo.server.domain.user.entity.User;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/book")
@Tag(name = "책 관련 API ")
@Slf4j
public class BookController {

	private final UserBooksService userBooksService;
	private final BookService bookService;

	/**
	 * 책 제목으로 다중 등록
	 *
	 * @param create
	 * @return
	 */
	@PostMapping("/regist-books")
	@Operation(summary = "도서 등록", description = "책 제목 리스트로 여러권 등록")
	public SuccessResponse<Map<String, List<String>>> registBooks(@CurrentUser User user,
											 @ModelAttribute UserBookData.Create create) {
		Map<String, List<String>> result = userBooksService.addBookList(user, create);
		return SuccessResponse.of(result);
	}

	@PostMapping("/regist-book")
	public SuccessResponse<Void> registBook(@CurrentUser User user, @RequestBody UserBookData.CreateByISBN create) {
		userBooksService.addBook(user, create);
		return SuccessResponse.empty();
	}

	@GetMapping("")
	@Operation(summary = "도서 검색", description = "isbn 또는 제목으로 도서 검색")
	public SuccessResponse<BookData.Search> getBooks(
		@CurrentUser User user,
		@RequestParam(value = "isbn", required = false) Long isbn,
		@RequestParam(value = "title", required = false) String title) {

		if (isbn != null) {
			return SuccessResponse.of(bookService.getBookByIsbn(isbn));
		} else if (title != null) {
			return SuccessResponse.of(bookService.getBookByTitle(title));
		} else {
			throw new BaseException(ErrorCode.INVALID_INPUT_VALUE);
		}
	}

	/**
	 * 유저의 관심 도서들 반환
	 *
	 * @param user
	 * @return
	 */
	@GetMapping("/interest")
	@Operation(summary = "관심 도서 목록 조회", description = "유저의 관심 도서 목록 조회")
	public SuccessResponse<List<BookData.Search>> getBookCase(@CurrentUser User user) {
		return SuccessResponse.of(userBooksService.getInterestBooks(user));
	}

	/**
	 * 유저의 관심 도서 추가
	 *
	 * @param user
	 * @param interest
	 * @return
	 */
	@PostMapping("/interest/{bookId}")
	@Operation(summary = "관심 도서 추가", description = "유저의 관심 도서 추가")
	public SuccessResponse<Void> addInterestBook(@CurrentUser User user,
		@PathVariable("bookId") Long interest) {
		userBooksService.addInterestBook(user, interest);

		return SuccessResponse.empty();
	}

	@DeleteMapping("/interest/{bookId}")
	@Operation(summary = "관심 도서 삭제", description = "유저의 관심 도서 삭제")
	public SuccessResponse<Void> deleteInterestBook(@CurrentUser User user,
		@PathVariable("bookId") Long interest) {
		userBooksService.deleteInterestBook(user, interest);
		return SuccessResponse.empty();
	}

	/**
	 * 관심 책장 목록 조회 API
	 *
	 * @param user
	 * @return {@link  List<BookData.BookCase>}
	 */
	@GetMapping("/bookcase/interest")
	@Operation(summary = "관심 책장 목록 조회", description = "유저의 관심 책장 목록 조회")
	public SuccessResponse<List<BookData.BookCase>> getUserInterest(@CurrentUser User user) {
		return SuccessResponse.of(bookService.getBookCaseInterest(user));
	}

	/**
	 * 유저 아이디로 책장 목록 조회 API
	 *
	 * @param user
	 * @param findUserId
	 * @return {@link BookData.BookCase}
	 */
	@GetMapping("/bookcase/{findUserId}")
	@Operation(summary = "책장 목록 조회", description = "유저 아이디로 책장 목록 조회")
	public SuccessResponse<BookData.BookCase> getUserBookCaseByNickName(
		@CurrentUser User user,
		@PathVariable Long findUserId) {
		return SuccessResponse.of(bookService.getBookCaseByuserId(user, findUserId));
	}

	@GetMapping("/bookcase/me")
	@Operation(summary = "나의 책장 목록 조회", description = "나의 책장 목록 조회")
	public SuccessResponse<BookData.BookCase> getMyBookCaseByNickName(
		@CurrentUser User user) {

		return SuccessResponse.of(bookService.getMyBookCaseByuserId(user.getId()));
	}

	/**
	 * 유저의 위치 기반으로 주변 책장 목록 조회
	 *
	 * @param user
	 * @return {@link List<BookData.BookCase>}
	 */
	@GetMapping("/bookcase/near")
	@Operation(summary = "주변 책장 목록 조회", description = "유저의 위치 기반으로 주변 책장 목록 조회")
	public SuccessResponse<Page<BookData.BookCase>> getNearBookCase(@CurrentUser User user, Pageable pageable) {
		return SuccessResponse.of(bookService.getNearBookCase(user, pageable));
	}

	/**
	 * 도서 상세 조회 API
	 *
	 * @param bookId
	 * @return {@link BookData.Search}
	 */
	@GetMapping("/{bookId}")
	@Operation(summary = "도서 상세 조회", description = "도서 상세 조회")
	public SuccessResponse<BookData.Search> getBookDetail(@PathVariable Long bookId) {
		return SuccessResponse.of(bookService.getBook(bookId));
	}

}