package com.najackdo.server.domain.recommendation.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.repository.BookMarkRepository;
import com.najackdo.server.domain.book.repository.BookRepository;
import com.najackdo.server.domain.recommendation.dto.RecommendationResponse;
import com.najackdo.server.domain.recommendation.dto.VisitDto;
import com.najackdo.server.domain.recommendation.entity.Visit;
import com.najackdo.server.domain.recommendation.repository.VisitMongoRepository;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecommendationService {

	private final String BASE_URL = "http://localhost:8000/item/recomm";

	private final  RestTemplate restTemplate;

	private final BookRepository bookRepository;
	private final VisitMongoRepository visitMongoRepository;
	private final BookMarkRepository bookMarkRepository;

	public List<BookData.Search> getBookBasedReccom(Long bookId, String genre) {

		List<Integer> bookIds = restTemplate.getForObject(BASE_URL + "?bookId={bookId}&genre={genre}",
			RecommendationResponse.class, bookId, genre).getBookIds();

		return bookRepository.findByIdsWithGenre(bookIds, genre)
			.stream()
			.map(BookData.Search::from)
			.filter(book -> !book.getBookId().equals(bookId))
			.toList();
	}


	public List<BookData.Search> getMainRecommendation(User user, String genre) {
		Book userBookMarkBook = bookMarkRepository.findFirstByUserId(user.getId()).orElseThrow(
			() -> new BaseException(ErrorCode.NESSARY_BOOKMARK)
		).getBook();

		List<Integer> bookIds = restTemplate.getForObject(BASE_URL + "?bookId={bookId}&genre={genre}",
			RecommendationResponse.class, userBookMarkBook.getId(), genre).getBookIds();


		if (genre != null){
			return bookRepository.findByIdsWithGenre(bookIds, genre)
				.stream()
				.map(BookData.Search::from)
				.filter(book -> !book.getBookId().equals(userBookMarkBook.getId()))
				.toList();
		}

		userBookMarkBook.getId();

		return bookRepository.findByIds(bookIds)
			.stream()
			.map(BookData.Search::from)
			.filter(book -> !book.getBookId().equals(userBookMarkBook.getId()))
			.toList();

	}


	/**
	 * 방문 체류 시간 기록
	 * @param user
	 * @param visitDto
	 */
	public void createMongoVisit(User user, VisitDto visitDto) {
		Visit visit = new Visit();
		visit.setUserId(user.getId());
		visit.setBookId(visitDto.getBookId());
		visit.setGenre(visitDto.getGenre());
		visit.setTimeSpent(visitDto.getTimeSpent());

		visitMongoRepository.save(visit);
	}


}
