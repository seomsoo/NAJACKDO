package com.najackdo.server.core;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.book.repository.BookMarkRepository;
import com.najackdo.server.domain.recommendation.dto.BookMarkDto;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/mongo")
public class MongoTestContainer {

	final private BookMarkMongoRepository bookMarkMongoRepository;
	final private RentalMongoRepository rentalMongoRepository;
	final private VisitMongoRepository visitMongoRepository;

	@PostMapping("/bookmarks")
	public SuccessResponse<Void> createBookMark(
		@CurrentUser User user,
		@RequestBody BookMarkDto bookMarkDto) {

		BookMark bookMark = new BookMark();
		bookMark.setUserId(user.getId());
		bookMark.setBookId(bookMarkDto.getBookId());
		bookMark.setGenre(bookMarkDto.getGenre());

		System.out.println(bookMark);

		bookMarkMongoRepository.save(bookMark);

		return SuccessResponse.empty();
	}

	@PostMapping("/rentals")
	public SuccessResponse<Void> createRental(@CurrentUser User user, @RequestBody RentalDto rentalDto) {
		Rental rental = new Rental();
		rental.setUserId(user.getId());
		rental.setBookId(rentalDto.getBookId());
		rental.setGenre(rentalDto.getGenre());
		System.out.println(rental);
		rentalMongoRepository.save(rental);
		return SuccessResponse.empty();
	}



}
