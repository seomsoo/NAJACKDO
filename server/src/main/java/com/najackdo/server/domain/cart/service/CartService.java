package com.najackdo.server.domain.cart.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.book.entity.UserBookDetail;
import com.najackdo.server.domain.book.repository.BookRepository;
import com.najackdo.server.domain.book.repository.UserBookDetailRepository;
import com.najackdo.server.domain.book.repository.UserBooksRepository;
import com.najackdo.server.domain.cart.dto.CartData;
import com.najackdo.server.domain.cart.entity.Cart;
import com.najackdo.server.domain.cart.repository.CartItemRepository;
import com.najackdo.server.domain.cart.repository.CartRepository;
import com.najackdo.server.domain.rental.entity.RentalStatus;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CartService {

	private final CartRepository cartRepository;
	private final CartItemRepository cartItemRepository;
	private final UserRepository userRepository;
	private final UserBookDetailRepository userBookDetailRepository;
	private final UserBooksRepository userBooksRepository;
	private final BookRepository bookRepository;

	public List<CartData.CartInfo> getCartList(User customer) {

		List<CartData.CartInfo> cartList = cartRepository.findCartsByUserId(customer.getId());

		return cartList;
	}

	public CartData.CartInfo getCart(Long cartId) {

		Cart cart = cartRepository.findCartInfoById(cartId)
			.orElseThrow(() -> new IllegalArgumentException("해당 장바구니가 존재하지 않습니다."));

		List<CartData.CartItemInfo> cartItemInfoList = cart.getCartItems().stream().map(cartItem -> {

			UserBookDetail userBookDetail = userBookDetailRepository.findById(cartItem.getUserBookDetail().getId())
				.orElseThrow(() -> new IllegalArgumentException("해당 도서 정보가 존재하지 않습니다."));

			UserBook userBook = userBooksRepository.findById(userBookDetail.getUserBook().getId())
				.orElseThrow(() -> new IllegalArgumentException("해당 도서가 존재하지 않습니다."));

			Book book = bookRepository.findById(userBook.getBook().getId())
				.orElseThrow(() -> new IllegalArgumentException("해당 책이 존재하지 않습니다."));


			return CartData.CartItemInfo.of(
				cartItem.getId(),
				userBookDetail.getFrontImagePath(),
				book.getTitle(),
				book.getAuthor(),
				userBookDetail.getOnedayPrice()
			);
		}).toList();

		RentalStatus rentalStatus = (cart.getRental() != null ? cart.getRental().getStatus() : RentalStatus.READY);

		return CartData.CartInfo.of(cart.getId(), cart.getOwner().getId(), cart.getOwner().getUsername(),
			cartItemInfoList, rentalStatus,
			cart.getRental() != null ? cart.getRental().getId() : null);
	}

}
