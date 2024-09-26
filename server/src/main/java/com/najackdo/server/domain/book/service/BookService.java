package com.najackdo.server.domain.book.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.book.repository.BookRepository;
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

	private final RedisTemplate<String, Object> redisTemplate;

	private final BookRepository bookRepository;
	private final UserRepository userRepository;
	private final InterestUserRepository interestUserRepository;

	private static final String Location_KEY = "location:";

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

	public List<BookData.BookCase> getNearBookCase(User user) {
		log.info("user : {}", user);

		String userLocationKey = Location_KEY + user.getId();

		Set<Object> myLocationCodes = redisTemplate.opsForSet().members(userLocationKey);

		if (myLocationCodes == null || myLocationCodes.isEmpty()) {
			return Collections.emptyList();
		}
		log.info("My location codes: {}", myLocationCodes);

		Set<String> allUserKeys = redisTemplate.keys(Location_KEY + "*");
		log.info("All user keys: {}", allUserKeys);

		Set<String> allUserKeysWithOutMe = Objects.requireNonNull(allUserKeys).stream()
			.filter(key -> !key.equals(userLocationKey))
			.collect(Collectors.toSet());
		log.info("All user keys without me: {}", allUserKeysWithOutMe);

		Set<Long> nearUserIds = new HashSet<>();

		for (String otherKey : allUserKeysWithOutMe) {
			Set<Object> otherUserLocations = redisTemplate.opsForSet().members(otherKey);

			if (otherUserLocations != null) {
				for (Object location : myLocationCodes) {
					if (otherUserLocations.contains(location)) {
						nearUserIds.add(Long.valueOf(otherKey.replace(Location_KEY, "")));
					}
				}
			}
		}
		log.info("Intersected locations: {}", nearUserIds);

		if (nearUserIds.isEmpty()) {
			return Collections.emptyList();
		}

		return getBookCasesForIntersectedUsers(user, nearUserIds);

	}

	public List<BookData.BookCase> getBookCasesForIntersectedUsers(User user, Set<Long> nearUserIds) {
		List<BookData.BookCase> bookCases = new ArrayList<>();

		for (Long userid : nearUserIds) {

			User findUser = userRepository.findById(userid)
				.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER));

			boolean isFollow = interestUserRepository.existsByFollowerAndFollowing(user, findUser);

			List<BookData.DisplayBook> displayBooks = bookRepository.findBookCaseByUserId(findUser).stream()
				.map(userBook -> BookData.DisplayBook.of(
					userBook.getBook().getId(),
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

		return bookCases;
	}

}

