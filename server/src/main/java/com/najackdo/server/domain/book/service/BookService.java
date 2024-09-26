package com.najackdo.server.domain.book.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.book.repository.BookRepository;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.repository.InterestUserRepository;
import com.najackdo.server.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {

	private final BookRepository bookRepository;
	private final UserRepository userRepository;
	private final InterestUserRepository interestUserRepository;

	public List<BookData.BookCase> getBookCaseInterest(User user) {
		List<UserBook> userBooks = bookRepository.findBookCaseInterestByUser(user);

		List<BookData.BookCase> collect = userBooks.stream()
			.collect(Collectors.groupingBy(userBook -> userBook.getUser().getId())) // 사용자별로 그룹화
			.entrySet().stream()
			.map(entry -> {
				Long userId = entry.getKey();
				User userFromBooks = entry.getValue().get(0).getUser(); // 첫 번째 UserBook에서 사용자 정보 가져오기
				String nickname = userFromBooks.getNickName();
				String profileImage = userFromBooks.getProfileImage();
				List<BookData.DisplayBook> displayBooks = entry.getValue().stream()
					.map(userBook -> BookData.DisplayBook.of(
						userBook.getBook().getId(),
						userBook.getId(),
						userBook.getBook().getCover(), // 커버 이미지 추출
						userBook.getBookStatus() // 책 상태
					))
					.collect(Collectors.toList());

				return BookData.BookCase.of(userId, true, nickname, profileImage, displayBooks);
			})
			.collect(Collectors.toList());

		return collect;
	}

	public BookData.BookCase getBookCaseByuserId(User user, Long findUserId) {

		User findUser = userRepository.findById(findUserId)
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));

		// ? 여기서 user가 나고 findUser가 상대방인가? 그럼 이건 내가 누군가를 팔로우하고 있는지 확인는게 맞겠지?
		boolean isFollow = interestUserRepository.existsByFollowerAndFollowing(user, findUser);

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
			isFollow,
			findUser.getNickName(),
			findUser.getProfileImage(),
			displayBooks
		);
	}

	public BookData.Search getBook(Long bookId) {
		return bookRepository.findById(bookId)
			.map(BookData.Search::of)
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_BOOK));
	}

	public BookData.BookCase getMyBookCaseByuserId(Long id) {
		User user = userRepository.findById(id)
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));

		// DisplayBook 리스트 생성
		List<BookData.DisplayBook> displayBooks = bookRepository.findBookCaseByUserId(user).stream()
			.map(userBook -> BookData.DisplayBook.of(
				userBook.getBook().getId(),
				userBook.getId(),
				userBook.getBook().getCover(), // 커버 이미지 추출
				userBook.getBookStatus() // 책 상태
			))
			.collect(Collectors.toList());

		return BookData.BookCase.ofWithOutIsFollow(
			user.getId(),
			user.getNickName(),
			user.getProfileImage(),
			displayBooks
		);
	}

	public BookData.Search getBookByIsbn(Long isbn) {
		Book book = bookRepository.findByIsbn(isbn).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_BOOK));

		return BookData.Search.of(book);

	}

	public BookData.Search getBookByTitle(String title) {
		Book book = bookRepository.findByTitle(title).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_BOOK));

		return BookData.Search.of(book);
	}
}
