package com.najackdo.server.domain.book.controller;

import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.book.dto.UserBookData;
import com.najackdo.server.domain.book.service.UserBooksService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BookController {
    private final UserBooksService userBooksService;

//    @GetMapping("")
//    @ResponseStatus(HttpStatus.CREATED)
//    public SuccessResponse<List<UserBookData.Search>> index() {
//        return SuccessResponse.of(userBooksService.getBooksByUserId("123"));
//    }

    @PostMapping("/registBooks")
    public SuccessResponse<Void> registBooks(@RequestBody UserBookData.Create create) {
        
        return SuccessResponse.empty();
    }

    @GetMapping("/registBook/{ISBN}")
    public SuccessResponse<Void> registBooks(@PathVariable String ISBN) {

        return SuccessResponse.empty();
    }


}
