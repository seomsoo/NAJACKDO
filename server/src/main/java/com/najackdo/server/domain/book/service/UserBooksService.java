package com.najackdo.server.domain.book.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.dto.UserBookData;
import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.entity.BookMark;
import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.book.repository.BookMarkRepository;
import com.najackdo.server.domain.book.repository.BookRepository;
import com.najackdo.server.domain.book.repository.UserBooksRepository;
import com.najackdo.server.domain.location.entity.ActivityAreaSetting;
import com.najackdo.server.domain.location.repository.ActivityAreaSettingRepository;
import com.najackdo.server.domain.recommendation.entity.Rental;
import com.najackdo.server.domain.recommendation.repository.RentalMongoRepository;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class UserBooksService {
	private final RentalMongoRepository rentalMongoRepository;

	private final UserBooksRepository userBooksRepository;
	private final BookRepository bookRepository;
	private final ActivityAreaSettingRepository activityAreaSettingRepository;
	private final BookMarkRepository bookMarkRepository;

	@Transactional
	public Map<String, List<String>> addBookList(User user, UserBookData.Create create) {

		ActivityAreaSetting activityAreaSetting = activityAreaSettingRepository.findUserActivityArea(user.getId())
			.orElseThrow(
				() -> new BaseException(ErrorCode.ACTIVITY_AREA_NOT_FOUND)
			);

		List<String> notFoundBooks = new ArrayList<>();
		List<String> alreadyExistBooks = new ArrayList<>();

		for (String title : create.getTitles()) {

			Book book = bookRepository.findFirstByTitle(title).orElseGet(() -> {
				notFoundBooks.add(title);
				return null;
			});

			if (book == null) {
				continue;
			}

			if (userBooksRepository.findByUserAndIsbn(user.getId(), book.getIsbn()).isPresent()) {
				alreadyExistBooks.add(book.getTitle());
				continue;
			}

			userBooksRepository.save(UserBook.createUserBook(user, book, activityAreaSetting.getLocation()));
		}

		Map<String, List<String>> result = new HashMap<>();
		result.put("notFoundBooks", notFoundBooks);
		result.put("alreadyExistBooks", alreadyExistBooks);

		return result;
	}

	@Transactional
	public void addBook(User user, UserBookData.CreateByISBN create) {
		userBooksRepository.findByUserAndIsbn(user.getId(), create.getISBN()).ifPresent(
			userBook -> {
				throw new BaseException(ErrorCode.BOOK_ALREADY_EXIST);
			}
		);
		ActivityAreaSetting activityAreaSetting = activityAreaSettingRepository.findUserActivityArea(user.getId())
			.orElseThrow(
				() -> new BaseException(ErrorCode.ACTIVITY_AREA_NOT_FOUND)
			);

		Book book = bookRepository.findFirstByISBN(create.getISBN()).orElseThrow(
			() -> new BaseException(ErrorCode.BOOK_NOT_FOUND)
		);
		userBooksRepository.save(UserBook.createUserBook(user, book, activityAreaSetting.getLocation()));
	}

	public List<BookData.Search> getInterestBooks(User user) {
		return bookRepository.findInterestingBooks(user.getId()).stream().map(BookData.Search::of).toList();
	}

	@Transactional
	public void addInterestBook(User user, Long interest) {
		Book book = bookRepository.findById(interest).orElseThrow(
			() -> new BaseException(ErrorCode.BOOK_NOT_FOUND)
		);
		bookMarkRepository.findByUserIdAndBookId(user.getId(), book.getId()).ifPresent(
			bookMark -> {
				throw new BaseException(ErrorCode.BOOKMARK_ALREADY_EXIST);
			}
		);

		Rental rental = new Rental();
		rental.setUserId(user.getId());
		rental.setBookId(book.getId());
		rental.setGenre(book.getGenre());
		rentalMongoRepository.save(rental);

		bookMarkRepository.save(BookMark.createBookMark(user, book));
	}

	@Transactional
	public void deleteInterestBook(User user, Long interest) {

		Book book = bookRepository.findById(interest).orElseThrow(
			() -> new BaseException(ErrorCode.BOOK_NOT_FOUND)
		);

		BookMark byUserIdAndBookId = bookMarkRepository.findByUserIdAndBookId(user.getId(), book.getId()).orElseThrow(
			() -> new BaseException(ErrorCode.BOOKMARK_NOT_FOUND)
		);

		bookMarkRepository.delete(byUserIdAndBookId);

	}

	// public UserBookData.InfoResponse getUserBookInfo(Long userBookId) {
	//
	// }
}
