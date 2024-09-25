package com.najackdo.server.domain.rental.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.rental.dto.ReviewData;
import com.najackdo.server.domain.rental.entity.Rental;
import com.najackdo.server.domain.rental.entity.RentalReview;
import com.najackdo.server.domain.rental.entity.ReviewItems;
import com.najackdo.server.domain.rental.repository.RentalRepository;
import com.najackdo.server.domain.rental.repository.RentalReviewRepository;
import com.najackdo.server.domain.rental.repository.ReviewItemsRepository;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

	private final RentalReviewRepository rentalReviewRepository;
	private final RentalRepository rentalRepository;
	private final ReviewItemsRepository reviewItemsRepository;

	@Transactional
	public SuccessResponse<Void> review(User user, ReviewData.ReviewRequest reviewRequest) {

		Long rentalId = reviewRequest.getRentalId();
		List<Long> reviewItemIds = reviewRequest.getReviewItemIds();

		Rental rental = rentalRepository.findById(rentalId).orElseThrow(
			() -> new BaseException(ErrorCode.NOT_FOUND_RENTAL)
		);

		reviewItemIds.stream()
			.map(itemId -> {
				ReviewItems reviewItems = reviewItemsRepository.findById(itemId).orElseThrow(
					() -> new BaseException(ErrorCode.NOT_FOUND_RENTAL_REVIEW)
				);
				return RentalReview.createRentalReview(rental, user, reviewItems);
			})
			.forEach(rentalReviewRepository::save);

		return SuccessResponse.empty();
	}
}
