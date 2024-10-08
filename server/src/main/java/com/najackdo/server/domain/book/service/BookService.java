package com.najackdo.server.domain.book.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.book.repository.BookRepository;
import com.najackdo.server.domain.location.repository.LocationCacheRepository;
import com.najackdo.server.domain.recommendation.entity.Visit;
import com.najackdo.server.domain.recommendation.repository.VisitMongoRepository;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.repository.InterestUserRepository;
import com.najackdo.server.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {

	private final BookRepository bookRepository;
	private final UserRepository userRepository;
	private final InterestUserRepository interestUserRepository;

	private static final String Location_KEY = "location:";
	private final LocationCacheRepository locationCacheRepository;
	private final VisitMongoRepository visitMongoRepository;

	private static String apply(Object value) {
		return ((Map<String, String>)value).get("value");
	}

	public List<BookData.BookCase> getBookCaseInterest(User user) {
		List<UserBook> userBooks = bookRepository.findBookCaseInterestByUser(user);

		return userBooks.stream()
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
						userBook.getBook().getTitle(),
						userBook.getId(),
						userBook.getBook().getCover(), // 커버 이미지 추출
						userBook.getBookStatus() // 책 상태
					))
					.collect(Collectors.toList());

				return BookData.BookCase.of(userId, true, nickname, profileImage, displayBooks);
			})
			.collect(Collectors.toList());
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
				userBook.getBook().getTitle(),
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

	public BookData.Search getBook(User user, Long bookId) {
		List<Book> userInterestingBooks = bookRepository.findInterestingBooks(user.getId()); // 사용자 관심 도서 목록 조회

		BookData.Search search = bookRepository.findById(bookId)
			.map(book -> BookData.Search.of(book, userInterestingBooks)) // 관심 도서 여부를 포함한 결과 반환
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_BOOK));// 도서가 존재하지 않을 경우 예외 발생

		Visit visit = new Visit();
		visit.setUserId(user.getId());
		visit.setBookId(bookId);
		visit.setTimeSpent(1);
		visit.setGenre(search.getGenre());
		visit.setVisitTime(LocalDateTime.now());
		visitMongoRepository.save(visit);

		return search;
	}

	public BookData.BookCase getMyBookCaseByuserId(Long id) {
		User user = userRepository.findById(id)
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));

		// DisplayBook 리스트 생성
		List<BookData.DisplayBook> displayBooks = bookRepository.findBookCaseByUserId(user).stream()
			.map(userBook -> BookData.DisplayBook.of(
				userBook.getBook().getId(),
				userBook.getBook().getTitle(),
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

		return BookData.Search.from(book);

	}

	public BookData.Search getBookByTitle(String title) {
		Book book = bookRepository.findByTitle(title).orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_BOOK));
		return BookData.Search.from(book);
	}

	public Page<BookData.BookCase> getNearBookCase(User user, Pageable pageable) {

		Set<Object> myLocationCodes = locationCacheRepository.getUserNearLocation(user.getId());

		if (myLocationCodes == null || myLocationCodes.isEmpty()) {
			return Page.empty();
		}

		Set<String> allUserKeys = locationCacheRepository.getAllUserLocations();
		Set<String> allUserKeysWithOutMe = Objects.requireNonNull(allUserKeys).stream()
			.filter(key -> !key.equals(Location_KEY + user.getId()))
			.collect(Collectors.toSet());

		Set<Long> nearUserIds = new HashSet<>();

		for (String otherKey : allUserKeysWithOutMe) {
			Set<Object> otherUserLocations = locationCacheRepository.getOtherUserLocations(otherKey);

			if (otherUserLocations != null) {
				for (Object location : myLocationCodes) {
					if (otherUserLocations.contains(location)) {
						nearUserIds.add(Long.valueOf(otherKey.replace(Location_KEY, "")));
					}
				}
			}
		}

		if (nearUserIds.isEmpty()) {
			return Page.empty();
		}

		// 페이징 처리
		List<Long> nearUserIdsList = new ArrayList<>(nearUserIds);
		int totalElements = nearUserIdsList.size();
		int start = Math.toIntExact(pageable.getOffset());
		int end = Math.min(start + pageable.getPageSize(), totalElements);

		List<Long> paginatedUserIds = nearUserIdsList.subList(start, end);

		List<BookData.BookCase> bookCases = new ArrayList<>();
		for (Long userid : paginatedUserIds) {
			User findUser = userRepository.findById(userid)
				.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));

			boolean isFollow = interestUserRepository.existsByFollowerAndFollowing(user, findUser);

			List<BookData.DisplayBook> displayBooks = bookRepository.findBookCaseByUserId(findUser).stream()
				.map(userBook -> BookData.DisplayBook.of(
					userBook.getBook().getId(),
					userBook.getBook().getTitle(),
					userBook.getId(),
					userBook.getBook().getCover(),
					userBook.getBookStatus()
				))
				.collect(Collectors.toList());

			bookCases.add(BookData.BookCase.of(
				findUser.getId(),
				isFollow,
				findUser.getNickName(),
				findUser.getProfileImage(),
				displayBooks
			));
		}

		return new PageImpl<>(bookCases, pageable, totalElements);
	}

}
