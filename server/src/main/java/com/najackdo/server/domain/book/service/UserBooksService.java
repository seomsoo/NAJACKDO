package com.najackdo.server.domain.book.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.dto.UserBookData;
import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.entity.BookMark;
import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.book.entity.UserBookDetail;
import com.najackdo.server.domain.book.repository.BookMarkRepository;
import com.najackdo.server.domain.book.repository.BookRepository;
import com.najackdo.server.domain.book.repository.UserBookDetailRepository;
import com.najackdo.server.domain.book.repository.UserBooksRepository;
import com.najackdo.server.domain.location.entity.ActivityAreaSetting;
import com.najackdo.server.domain.location.repository.ActivityAreaSettingRepository;
import com.najackdo.server.domain.location.repository.LocationCacheRepository;
import com.najackdo.server.domain.recommendation.dto.BookSpineDetectionResponse;
import com.najackdo.server.domain.recommendation.entity.Visit;
import com.najackdo.server.domain.recommendation.repository.BookMarkMongoRepository;
import com.najackdo.server.domain.recommendation.repository.RentalMongoRepository;
import com.najackdo.server.domain.recommendation.repository.VisitMongoRepository;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class UserBooksService {

	private final String BookSpineURL = "http://localhost:8000/item/bookSpineDetection";

	private final RestTemplate restTemplate;
	private final RentalMongoRepository rentalMongoRepository;
	private final UserBooksRepository userBooksRepository;
	private final UserBookDetailRepository userBookDetailRepository;
	private final BookRepository bookRepository;
	private final ActivityAreaSettingRepository activityAreaSettingRepository;
	private final BookMarkRepository bookMarkRepository;
	private final UserRepository userRepository;
	private final LocationCacheRepository locationCacheRepository;
	private final BookMarkMongoRepository bookMarkMongoRepository;
	private final VisitMongoRepository visitMongoRepository;

	public List<String> postBookSpineDetection(MultipartFile file) {
		ResponseEntity<BookSpineDetectionResponse> responseEntity;
		try {
			// HttpHeaders 설정
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(org.springframework.http.MediaType.MULTIPART_FORM_DATA);

			// MultiValueMap을 사용하여 요청 본문 생성
			MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
			body.add("imageFile", new org.springframework.core.io.ByteArrayResource(file.getBytes()) {
				@Override
				public String getFilename() {
					return file.getOriginalFilename(); // 파일 이름 설정
				}
			});

			// 요청 본문 생성
			HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
			responseEntity = restTemplate.exchange(BookSpineURL, HttpMethod.POST, requestEntity,
				BookSpineDetectionResponse.class);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BaseException(ErrorCode.BOOK_NOT_FOUND);
		}

		return responseEntity.getBody().getTitles();
	}

	@Transactional
	public Map<String, List<BookData.Search>> addBookList(User user, UserBookData.Create create) {


		List<BookData.Search> alreadyExistBooks = new ArrayList<>();
		List<String> titles = postBookSpineDetection(create.getFile());
		List<BookData.Search> bookDataList = new ArrayList<>();
		for (String title : titles){
			Book book = bookRepository.findFirstByTitle(title).orElse(null);
			if(book==null){
				continue;
			}
			if (userBooksRepository.findByUserAndIsbn(user.getId(), book.getIsbn()).isPresent()) {
				alreadyExistBooks.add(BookData.Search.from(book));
				continue;
			}
			bookDataList.add(BookData.Search.from(book));
		}

		HashMap<String, List<BookData.Search>> map = new HashMap<>();
		map.put("alreadyExistBooks", alreadyExistBooks);
		map.put("bookDataList", bookDataList);

		return map;
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
		return bookRepository.findInterestingBooks(user.getId()).stream().map(BookData.Search::from).toList();
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

		com.najackdo.server.domain.recommendation.entity.BookMark bookMark = new com.najackdo.server.domain.recommendation.entity.BookMark();
		bookMark.setBookId(book.getId());
		bookMark.setUserId(user.getId());
		bookMarkMongoRepository.save(bookMark);

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

	public UserBookData.InfoResponse getUserBookInfo(User user, Long userBookId) {

		UserBook userBook = userBooksRepository.findById(userBookId).orElseThrow(
			() -> new BaseException(ErrorCode.BOOK_NOT_FOUND)
		);

		User owner = userBook.getUser();

		String locationName = userRepository.findUserLocationName(owner.getId());

		Book book = userBook.getBook();

		UserBookDetail userBookDetail = userBookDetailRepository.findByUserBookId(userBookId).orElseThrow(
			() -> new BaseException(ErrorCode.BOOK_DETAIL_NOT_FOUND)
		);

		Visit visit = new Visit();
		visit.setUserId(user.getId());
		visit.setBookId(book.getId());
		visit.setTimeSpent(1);
		visit.setGenre(book.getGenre());
		visit.setVisitTime(LocalDateTime.now());
		visitMongoRepository.save(visit);

		return UserBookData.InfoResponse.of(owner, locationName, book, userBook, userBookDetail);

	}

	@Transactional
	public void updateRentalCost(Long userBookId, Integer updateRentalCost) {

		UserBookDetail userBookDetail = userBookDetailRepository.findByUserBookId(userBookId).orElseThrow(
			() -> new BaseException(ErrorCode.BOOK_DETAIL_NOT_FOUND)
		);

		userBookDetail.updateRentalCost(updateRentalCost);

	}

	public List<UserBookData.AvailableNearBook> isNearAvailableBook(User user, Long bookId) {
		// Set<Integer>로 수집
		Set<Integer> locations = locationCacheRepository.getUserNearLocation(user.getId()).stream()
			.filter(obj -> obj instanceof Integer) // Integer인 경우만 필터링
			.map(obj -> (Integer)obj) // 안전하게 캐스팅
			.collect(Collectors.toSet());

		return userBooksRepository.findUserBooksByLocations(bookId, locations).stream().map(
			userBook ->
				UserBookData.AvailableNearBook.create(
					userBook.getId(),
					userBook.getUserBookDetail().getFrontImagePath(),
					userBook.getUserBookDetail().getOnedayPrice(),
					userBook.getBookStatus().name()
				)
		).toList();
	}

	@Transactional
	public void addBookListByIds(User user, UserBookData.CreateByIds create) {

		ActivityAreaSetting activityAreaSetting = activityAreaSettingRepository.findUserActivityArea(user.getId())
			.orElseThrow(() -> new BaseException(ErrorCode.ACTIVITY_AREA_NOT_FOUND));

		create.getBookIds().stream()
			.map(bookId -> bookRepository.findById(bookId)
				.orElseThrow(() -> new BaseException(ErrorCode.BOOK_NOT_FOUND)))
			.map(book -> UserBook.createUserBook(user, book, activityAreaSetting.getLocation()))
			.forEach(userBooksRepository::save);
	}
}
