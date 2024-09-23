package com.najackdo.server.domain.book.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.entity.UserBook;
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
		List<UserBook> userBooks = bookRepository.findBookCaseInterestByUser(user);

		return userBooks.stream()
			.collect(Collectors.groupingBy(userBook -> userBook.getUser().getId())) // 사용자별로 그룹화
			.entrySet().stream()
			.map(entry -> {
				Long userId = entry.getKey();
				User userFromBooks = entry.getValue().get(0).getUser(); // 첫 번째 UserBook에서 사용자 정보 가져오기
				String nickname = userFromBooks.getNickName();
				List<BookData.DisplayBook> displayBooks = entry.getValue().stream()
					.map(userBook -> BookData.DisplayBook.of(
						userBook.getBook().getId(),
						userBook.getId(),
						userBook.getBook().getCover(), // 커버 이미지 추출
						userBook.getBookStatus() // 책 상태
					))
					.collect(Collectors.toList());

				return BookData.BookCase.of(userId, nickname, displayBooks);
			})
			.collect(Collectors.toList());
	}

	public BookData.BookCase getBookCaseByuserId(Long findUserId) {
		User findUser = userRepository.findById(findUserId)
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));

		// DisplayBook 리스트 생성
		List<BookData.DisplayBook> displayBooks = bookRepository.findBookCaseByUserId(findUser).stream()
			.map(userBook -> BookData.DisplayBook.of(
				userBook.getBook().getId(),
				userBook.getId(),
				userBook.getBook().getCover(), // 커버 이미지 추출
				userBook.getBookStatus() // 책 상태
			))
			.collect(Collectors.toList());

		return BookData.BookCase.of(
			findUser.getId(),
			findUser.getNickName(),
			displayBooks
		);
	}
}
