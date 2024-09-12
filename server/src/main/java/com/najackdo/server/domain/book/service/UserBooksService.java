package com.najackdo.server.domain.book.service;

import com.najackdo.server.domain.book.dto.UserBookData;
import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.book.repository.BookRepository;
import com.najackdo.server.domain.book.repository.UserBooksRepository;
import com.najackdo.server.domain.location.repository.LocationRepository;
import com.najackdo.server.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserBooksService {

    private UserBooksRepository userBooksRepository;
    private BookRepository bookRepository;
    private LocationRepository locationRepository;

    @Transactional
    public void addBookList(User user, UserBookData.Create create) {
        for(String title : create.getTitles()) {
            userBooksRepository.save(UserBook.UserBookCreate(user, bookRepository.findFirstByTitle(title),locationRepository.findById(create.getLocationId())));
        }
    }

    @Transactional
    public List<UserBookData.Search> getBooksByUserId(String userId) {
        return userBooksRepository.findByUserId(userId).stream()
                .map(UserBookData.Search::of)
                .toList();
    }
}
