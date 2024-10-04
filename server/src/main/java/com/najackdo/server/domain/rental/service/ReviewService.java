package com.najackdo.server.domain.rental.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.chat.repository.ChatRoomRepository;
import com.najackdo.server.domain.rental.dto.ReviewData;
import com.najackdo.server.domain.rental.entity.Rental;
import com.najackdo.server.domain.rental.entity.RentalReview;
import com.najackdo.server.domain.rental.entity.ReviewItems;
import com.najackdo.server.domain.rental.repository.RentalRepository;
import com.najackdo.server.domain.rental.repository.RentalReviewRepository;
import com.najackdo.server.domain.rental.repository.ReviewItemsRepository;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

	private final RentalReviewRepository rentalReviewRepository;
	private final RentalRepository rentalRepository;
	private final ReviewItemsRepository reviewItemsRepository;
	private final ChatRoomRepository chatRoomRepository;

	// FIXME : 리뷰 종류에 따라서 사용자 매너 점수 업데이트 로직 필요
	@Transactional
	public SuccessResponse<Void> review(User user, ReviewData.ReviewRequest reviewRequest) {

		Long rentalId = reviewRequest.getRentalId();
		List<Long> reviewItemIds = reviewRequest.getReviewItemIds();

		Rental rental = rentalRepository.findRentalById(rentalId).orElseThrow(
			() -> new BaseException(ErrorCode.NOT_FOUND_RENTAL)
		);



		User reviewee = rental.getCart().getCustomer().getId() == user.getId()
				? rental.getCart().getOwner()
				: rental.getCart().getCustomer();


		reviewItemIds.stream()
			.map(itemId -> {
				ReviewItems reviewItems = reviewItemsRepository.findById(itemId).orElseThrow(
					() -> new BaseException(ErrorCode.NOT_FOUND_RENTAL_REVIEW)
				);
				return RentalReview.createRentalReview(rental, reviewee, reviewItems);
			})
			.forEach(rentalReviewRepository::save);


		List<RentalReview> byRentalId = rentalReviewRepository.findByRentalId(rental.getId());

		boolean isSend = false;
		boolean isReceive = false;

		for (RentalReview rentalReview : byRentalId) {
			if (rentalReview.getUser().getId() == user.getId()) {
				isReceive = true;
			}
			if (rentalReview.getUser().getId() == reviewee.getId()) {
				isSend = true;
			}
		}

		if (isSend && isReceive) {
			chatRoomRepository.deleteById(rental.getCart().getChatRoom().getRoomId());
		}

		return SuccessResponse.empty();
	}
}
