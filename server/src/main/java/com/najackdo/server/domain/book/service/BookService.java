package com.najackdo.server.domain.book.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.repository.BookQueryRepository;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {

	private final BookQueryRepository bookQueryRepository;

	public List<BookData.BookCase> getBookCaseInterest(User user) {
		return bookQueryRepository.findBookCaseInterestByUser(user);
	}

	public BookData.BookCase getBookCaseByNickName(String nickname) {
		return bookQueryRepository.findBookCaseByNickName(nickname);
	}
}
