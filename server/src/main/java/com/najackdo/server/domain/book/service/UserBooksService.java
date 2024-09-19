package com.najackdo.server.domain.book.service;

import com.najackdo.server.domain.book.dto.UserBookData;
import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.book.repository.BookRepository;
import com.najackdo.server.domain.book.repository.UserBooksCustomRepositroy;
import com.najackdo.server.domain.book.repository.UserBooksRepository;
import com.najackdo.server.domain.location.repository.LocationRepository;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class UserBooksService {

    private final UserBooksRepository userBooksRepository;
    private final UserBooksCustomRepositroy userBooksCustomRepositroy;
    private final BookRepository bookRepository;
    private final LocationRepository locationRepository;
    private final UserRepository userRepository;


    @Transactional
    public void addBookList(User user, UserBookData.Create create) {
        for(String title : create.getTitles()) {
            userBooksRepository.save(UserBook.UserBookCreate(user, bookRepository.findFirstByTitle(title),locationRepository.findById(create.getLocationId())));
        }
    }

    @Transactional
    public void addBook(User user, UserBookData.CreateByISBN create) {
            userBooksRepository.save(UserBook.UserBookCreate(user, bookRepository.findFirstByISBN(create.getISBN()),locationRepository.findById(create.getLocationId())));
    }


    public List<UserBookData.BookCase> getBookCasesByUserName(String userName) {
        User user = userRepository.findByUsername(userName).orElseThrow();
        log.info("유저탐색 완료");
        log.info(String.valueOf(user));
        return userBooksCustomRepositroy.getBookCasesByUser(user);
    }

    public List<UserBookData.BookCase> getBookCasesByUserId(User user) {
        return userBooksCustomRepositroy.getBookCasesByUser(user);
    }


}
