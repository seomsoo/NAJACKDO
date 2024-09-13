package com.najackdo.server.domain.book.controller;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.book.dto.UserBookData;
import com.najackdo.server.domain.book.service.UserBooksService;
import com.najackdo.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
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


}
