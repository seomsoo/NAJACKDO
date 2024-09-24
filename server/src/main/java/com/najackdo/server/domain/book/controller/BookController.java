package com.najackdo.server.domain.book.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.messaging.Notification;
import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.book.dto.UserBookData;
import com.najackdo.server.domain.book.service.UserBooksService;
import com.najackdo.server.domain.notification.dto.NotificationDto;
import com.najackdo.server.domain.notification.service.NotificationService;
import com.najackdo.server.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/book")
@Slf4j
public class BookController {
    private final UserBooksService userBooksService;

    private final NotificationService notificationService;
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

    @GetMapping("/bookcase/interest")
    public SuccessResponse<List<UserBookData.BookCase>> getBookCase(@CurrentUser User user) {
        return SuccessResponse.of(userBooksService.getBookCasesByUserId(user));
    }

    @GetMapping("/bookcase/{username}")
    public SuccessResponse<List<UserBookData.BookCase>> getBookCase(@PathVariable String username) {
        log.info(username);
        return SuccessResponse.of(userBooksService.getBookCasesByUserName(username));
    }

    @GetMapping("/go")
    public SuccessResponse<Void> borrowBooks(@CurrentUser User user) {

        return SuccessResponse.empty();
    }
}
