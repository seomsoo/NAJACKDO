package com.najackdo.server.domain.book.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.repository.BookRepository;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {

	private final BookRepository bookRepository;
	private final UserRepository userRepository;

	public List<BookData.BookCase> getBookCaseInterest(User user) {
		return bookRepository.findBookCaseInterestByUser(user);
	}

	public BookData.BookCase getBookCaseByuserId(Long findUserId) {
		User findUser = userRepository.findById(findUserId).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));

		return bookRepository.findBookCaseByUserId(findUser);
	}
}
