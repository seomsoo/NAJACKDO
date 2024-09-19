package com.najackdo.server.domain.book.controller;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.dto.UserBookData;
import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.service.UserBooksService;
import com.najackdo.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/book")
@Slf4j
public class BookController {
    private final UserBooksService userBooksService;

//    @GetMapping("")
//    @ResponseStatus(HttpStatus.CREATED)
//    public SuccessResponse<List<UserBookData.Search>> index() {
//        return SuccessResponse.of(userBooksService.getBooksByUserId("123"));
//    }

    /**
     * 책 제목으로 다중 등록
     * @param user
     * @param create
     * @return
     */
    @PostMapping("/regist-books")
    public SuccessResponse<Map<String, List<String>>> registBooks(@CurrentUser User user, @RequestBody UserBookData.Create create) {
        Map<String, List<String>> result = userBooksService.addBookList(user, create);
        return SuccessResponse.of(result);
    }

    /**
     * 책 ISBN으로 단일 등록
     * @param user
     * @param create
     * @return
     */
    @PostMapping("/regist-book")
    public SuccessResponse<Void> registBooks(@CurrentUser User user, @RequestBody UserBookData.CreateByISBN create) {
        userBooksService.addBook(user,create);
        return SuccessResponse.empty();
    }

    /**
     * 유저의 관심 도서들 반환
     * @param user
     * @return
     */
    @GetMapping("/interest")
    public SuccessResponse<List<Book>> getBookCase(@CurrentUser User user) {
        return SuccessResponse.of(userBooksService.getInterestBooks(user));
    }

    /**
     * 유저의 관심 도서 추가
     * @param user
     * @param interest
     * @return
     */
    @PostMapping("/interest/{bookId}")
    public SuccessResponse<Void> addInterestBook(@CurrentUser User user,
        @PathVariable("bookId") Long interest) {
        userBooksService.addInterestBook(user, interest);
        return SuccessResponse.empty();
    }


    @DeleteMapping("/interest/{bookId}")
    public SuccessResponse<Void> deleteInterestBook(@CurrentUser User user,
        @PathVariable("bookId") Long interest) {
        userBooksService.deleteInterestBook(user, interest);
        return SuccessResponse.empty();
    }


}
