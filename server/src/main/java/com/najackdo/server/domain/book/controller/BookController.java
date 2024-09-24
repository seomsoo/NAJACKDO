package com.najackdo.server.domain.book.controller;

import java.util.List;
import java.util.Map;

import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.service.BookService;
import com.najackdo.server.domain.notification.entity.NotificationType;
import com.najackdo.server.domain.notification.event.NotificationEvent;
import com.najackdo.server.domain.notification.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/book")
@Slf4j
public class BookController {
    private final UserBooksService userBooksService;

    private final NotificationService notificationService;

    private final BookService bookService;
	/**
	 * 책 제목으로 다중 등록
	 *
	 * @param user
	 * @param create
	 * @return
	 */
	@PostMapping("/regist-books")
	@Operation(summary = "도서 등록", description = "책 제목 리스트로 여러권 등록")
	public SuccessResponse<Map<String, List<String>>> registBooks(@CurrentUser User user,
		@RequestBody UserBookData.Create create) {
		Map<String, List<String>> result = userBooksService.addBookList(user, create);
		return SuccessResponse.of(result);
	}

    @PostMapping("/registBook")
    public SuccessResponse<Void> registBooks(@CurrentUser User user, @RequestBody UserBookData.CreateByISBN create) {
        userBooksService.addBook(user,create);
        return SuccessResponse.empty();
    }


    @GetMapping("/go")
    public SuccessResponse<Void> borrowBooks(@CurrentUser User user) {
		notificationService.sendNotificationEvent(new NotificationEvent(user.getId(),"hello","test", NotificationType.BOOK_RENTAL_REQUEST));
        return SuccessResponse.empty();
    }

	@GetMapping("/bookcase/me")
	@Operation(summary = "나의 책장 목록 조회", description = "나의 책장 목록 조회")
	public SuccessResponse<BookData.BookCase> getMyBookCaseByNickName(
		@CurrentUser User user) {
		return SuccessResponse.of(bookService.getBookCaseByuserId(user.getId()));
	}
}
