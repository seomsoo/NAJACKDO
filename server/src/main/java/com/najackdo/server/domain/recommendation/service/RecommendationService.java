package com.najackdo.server.domain.recommendation.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.repository.BookRepository;
import com.najackdo.server.domain.recommendation.dto.BookMarkDto;
import com.najackdo.server.domain.recommendation.dto.RecommendationResponse;
import com.najackdo.server.domain.recommendation.dto.RentalDto;
import com.najackdo.server.domain.recommendation.dto.VisitDto;
import com.najackdo.server.domain.recommendation.entity.BookMark;
import com.najackdo.server.domain.recommendation.entity.Rental;
import com.najackdo.server.domain.recommendation.entity.Visit;
import com.najackdo.server.domain.recommendation.repository.BookMarkMongoRepository;
import com.najackdo.server.domain.recommendation.repository.RentalMongoRepository;
import com.najackdo.server.domain.recommendation.repository.VisitMongoRepository;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecommendationService {

	private final String BASE_URL = "http://localhost:8000/item/recomm/";

	private final  RestTemplate restTemplate;

	private final BookRepository bookRepository;
	private final VisitMongoRepository visitMongoRepository;
	private final BookMarkMongoRepository bookMarkMongoRepository;
	private final RentalMongoRepository rentalMongoRepository;

	public List<BookData.Search> getBookBasedReccom(Long bookId) {

		List<Integer> bookIds = restTemplate.getForObject(BASE_URL + bookId, RecommendationResponse.class).getBookIds();

		return  bookRepository.findByIds(bookIds).stream().map(BookData.Search::from).filter(book -> book.getBookId() != bookId).toList();
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

	// /**
	//  * 몽고에 저장하는 책 좋아요 기록
	//  * @param user
	//  * @param bookMarkDto
	//  */
	// public void createMongoBookMark(User user, BookMarkDto bookMarkDto) {
	// 	BookMark bookMark = new BookMark();
	// 	bookMark.setUserId(user.getId());
	// 	bookMark.setBookId(bookMarkDto.getBookId());
	// 	bookMark.setGenre(bookMarkDto.getGenre());
	//
	// 	bookMarkMongoRepository.save(bookMark);
	//
	// }
	//
	//
	// /**
	//  * 몽고에 저장하는 대여 기록
	//  * @param user
	//  * @param rentalDto
	//  */
	// public void createMongoRental(User user, RentalDto rentalDto) {
	// 	Rental rental = new Rental();
	// 	rental.setUserId(user.getId());
	// 	rental.setBookId(rentalDto.getBookId());
	// 	rental.setGenre(rentalDto.getGenre());
	// 	rentalMongoRepository.save(rental);
	// }
}
