package com.najackdo.server.domain.rental.service;

import java.util.Optional;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.domain.cart.entity.Cart;
import com.najackdo.server.domain.cart.repository.CartRepository;
import com.najackdo.server.domain.rental.dto.RentalData;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RentalService {

	private final ApplicationEventPublisher eventPublisher;
	private final CartRepository cartRepository;

	/**
	 * 유저 송금 버튼 누르면 발생하는 이벤트
	 * request data : rentalCost, rentalPeriod, cartId
	 * rentalCost는 할인 적용 X 금액
	 * User
	 * - rentalCost * 할인률 만큼 customer cash - , owner cash +
	 * 	user table에서 cash 업데이트
	 * 	cashLog table 업데이트
	 * Rental
	 * - 버튼 누른 시점부터 대여기간 + 해서 start date 랑 end date 지정
	 * 	rental table에 request data + start date + end date 저장
	 * Chat
	 * - 송금 채팅 전송
	 */
	@Transactional
	public void rental(User customer, RentalData.RentalRequest rentalRequest) {

		Long CartId = rentalRequest.getCartId();
		int totalCost = rentalRequest.getTotalPrice();
		int rentalPeriod = rentalRequest.getRentalPeriod();
		int rentalCost = rentalRequest.getRentalCost();

		Optional<Cart> byId = cartRepository.findById(CartId);

		// eventPublisher.publishEvent(new UserTransferEvent(
		//
		// ));
	}
}
