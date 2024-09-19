package com.najackdo.server.domain.book.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.dto.UserBookData;
import com.najackdo.server.domain.book.service.BookService;
import com.najackdo.server.domain.book.service.UserBooksService;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/book")
public class BookController {
    private final UserBooksService userBooksService;

//    @GetMapping("")
//    @ResponseStatus(HttpStatus.CREATED)
//    public SuccessResponse<List<UserBookData.Search>> index() {
//        return SuccessResponse.of(userBooksService.getBooksByUserId("123"));
//    }

    @PostMapping("/registBooks")
    public SuccessResponse<Void> registBooks(@CurrentUser User user, @RequestBody UserBookData.Create create) {
        userBooksService.addBookList(user,create);
        return SuccessResponse.empty();
    }

    @PostMapping("/registBook")
    public SuccessResponse<Void> registBooks(@CurrentUser User user, @RequestBody UserBookData.CreateByISBN create) {
        userBooksService.addBook(user,create);
        return SuccessResponse.empty();
    }

	private final BookService bookService;

	/**
	 * 관심 책장 목록 조회 API
	 *
	 * @param user
	 * @return {@link  List< BookData.BookCase>}
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


    @GetMapping("/bookcase/interest")
    public SuccessResponse<List<UserBookData.BookCase>> getBookCase(@CurrentUser User user) {
        return SuccessResponse.of(userBooksService.getBookCasesByUserId(user));
    }

    @GetMapping("/bookcase/{username}")
    public SuccessResponse<List<UserBookData.BookCase>> getBookCase(@PathVariable String username) {
        log.info(username);
        return SuccessResponse.of(userBooksService.getBookCasesByUserName(username));
    }
}
