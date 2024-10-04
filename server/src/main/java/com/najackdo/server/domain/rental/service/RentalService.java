package com.najackdo.server.domain.rental.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.cart.entity.Cart;
import com.najackdo.server.domain.cart.repository.CartRepository;
import com.najackdo.server.domain.chat.repository.ChatRoomRepository;
import com.najackdo.server.domain.rental.dto.RentalData;
import com.najackdo.server.domain.rental.entity.Rental;
import com.najackdo.server.domain.rental.entity.RentalStatus;
import com.najackdo.server.domain.rental.repository.RentalRepository;
import com.najackdo.server.domain.user.entity.CashLog;
import com.najackdo.server.domain.user.entity.CashLogType;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RentalService {

	private final CartRepository cartRepository;
	private final RentalRepository rentalRepository;
	private final ChatRoomRepository chatRoomRepository;

	@Transactional
	public SuccessResponse<Void> rentalCart(RentalData.RentalRequest rentalRequest) {

		Long cartId = rentalRequest.getCartId();
		int totalCost = rentalRequest.getTotalPrice();
		int rentalPeriod = rentalRequest.getRentalPeriod();
		int rentalCost = rentalRequest.getRentalCost();

		Cart cart = cartRepository.findByIdWithCashLogs(cartId).orElseThrow(
			() -> new BaseException(ErrorCode.NOT_FOUND_CART)
		);

		Optional<Rental> byCartId = rentalRepository.findByCartId(cartId);

		if (byCartId.isPresent()) {
			throw new BaseException(ErrorCode.RENTAL_CART_ALREADY_RENTED);
		}

		User customer = cart.getCustomer();
		User owner = cart.getOwner();

		if (customer.getCash() < rentalCost) {
			throw new BaseException(ErrorCode.NOT_ENOUGH_CASH);
		}

		customer.minusCash(rentalCost);
		owner.plusCash(rentalCost);

		List<CashLog> customerCashLogs = customer.getCashLogs();
		customerCashLogs.add(CashLog.create(customer, -rentalCost, customer.getCash(), CashLogType.PAYMENT));
		customer.updateCashLog(customerCashLogs);

		List<CashLog> ownerCashLogs = owner.getCashLogs();
		ownerCashLogs.add(CashLog.create(owner, rentalCost, owner.getCash(), CashLogType.PAYMENT));
		owner.updateCashLog(ownerCashLogs);

		LocalDateTime startDate = LocalDateTime.now();
		LocalDateTime endDate = startDate.plusDays(rentalPeriod);
		Rental rental = Rental.create(cart, startDate, endDate, rentalPeriod, totalCost, RentalStatus.RENTED);
		rentalRepository.save(rental);

		// ! 채팅 전송 로직 추가

		// chatRoomRepository.save()

		return SuccessResponse.empty();
	}

	@Transactional
	public SuccessResponse<Void> returnRental(User user, RentalData.ReturnRequest returnRequest) {

		Long ownerId = user.getId();
		Long customerId = returnRequest.getCustomerId();

		Rental rental = rentalRepository.findByCartId(returnRequest.getCartId()).orElseThrow(
			() -> new BaseException(ErrorCode.NOT_FOUND_RENTAL)
		);

		if (!rental.getCart().getOwner().getId().equals(ownerId)) {
			throw new BaseException(ErrorCode.ACCESS_DENIED);
		}

		rental.updateRentalEndDate(LocalDateTime.now());
		rental.updateStatus(RentalStatus.RETURNED);

		Cart cart = rental.getCart();
		cart.deleteCart();

		// ! 채팅 전송 로직 추가

		return SuccessResponse.empty();
	}

	public List<RentalData.RentalHistory> lendList(User user) {
		List<Rental> lendList = rentalRepository.findLendListByUserId(user.getId());


		return lendList.stream().map(rental ->
			RentalData.RentalHistory.create(
				rental.getId(),
				rental.getCart().getCustomer().getNickName(),
				rental.getCart().getCustomer().getProfileImage(),
				rental.getRentalStartDate(),
				rental.getRentalEndDate(),
				rental.getStatus(),
				rental.getRentalCost(),
				rental.getRentalPeriod(),
				rental.getCart().getCartItems().stream().map(cartItem ->
					RentalData.RentalBook.create(
						cartItem.getUserBookDetail().getUserBook().getBook().getCover(),
						cartItem.getUserBookDetail().getUserBook().getBook().getTitle(),
						cartItem.getUserBookDetail().getUserBook().getBook().getAuthor(),
						cartItem.getUserBookDetail().getUserBook().getBook().getPublisher(),
						cartItem.getUserBookDetail().getUsedPrice() / 100
					)
				).toList()
			)
		).toList();

	}



	public List<RentalData.RentalHistory> borrowList(User user) {
		List<Rental> borrowList = rentalRepository.findBorrowListByUserId(user.getId());

		return borrowList.stream().map(rental ->
			RentalData.RentalHistory.create(
				rental.getId(),
				rental.getCart().getOwner().getNickName(),
				rental.getCart().getOwner().getProfileImage(),
				rental.getRentalStartDate(),
				rental.getRentalEndDate(),
				rental.getStatus(),
				rental.getRentalCost(),
				rental.getRentalPeriod(),
				rental.getCart().getCartItems().stream().map(cartItem ->
					RentalData.RentalBook.create(
						cartItem.getUserBookDetail().getUserBook().getBook().getCover(),
						cartItem.getUserBookDetail().getUserBook().getBook().getTitle(),
						cartItem.getUserBookDetail().getUserBook().getBook().getAuthor(),
						cartItem.getUserBookDetail().getUserBook().getBook().getPublisher(),
						cartItem.getUserBookDetail().getUsedPrice() / 100
					)
				).toList()
			)
		).toList();
	}

	public List<BookData.Search> getBestSeller() {
		return rentalRepository.findBestSeller().stream().map(BookData.Search::from).toList();
	}
}
