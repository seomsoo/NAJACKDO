package com.najackdo.server.domain.cart.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.book.entity.UserBookDetail;
import com.najackdo.server.domain.book.repository.UserBookDetailRepository;
import com.najackdo.server.domain.book.repository.UserBooksRepository;
import com.najackdo.server.domain.cart.entity.Cart;
import com.najackdo.server.domain.cart.entity.CartItem;
import com.najackdo.server.domain.cart.repository.CartItemRepository;
import com.najackdo.server.domain.cart.repository.CartRepository;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CartItemService {

	private final CartRepository cartRepository;
	private final CartItemRepository cartItemRepository;
	private final UserBooksRepository userBooksRepository;
	private final UserBookDetailRepository userBookDetailRepository;

	@Transactional
	public void addCartItem(User customer, Long ownerbookId) {

		UserBook userBook = userBooksRepository.findById(ownerbookId)
			.orElseThrow(() -> new IllegalArgumentException("해당 책을 찾을 수 없습니다."));

		UserBookDetail userBookDetail = userBookDetailRepository.findUserBookDetailByUserBookId(ownerbookId)
			.orElseThrow(() -> new IllegalArgumentException("해당 책의 상세 정보를 찾을 수 없습니다."));

		Optional<Cart> existingCart = cartRepository.findCartByUserIdAndBookId(customer.getId(), ownerbookId);

		Cart cart;
		if (existingCart.isEmpty()) {
			cart = Cart.createCart(customer, userBook.getUser());
			cartRepository.save(cart);
		} else {
			cart = existingCart.get();
		}

		CartItem cartItem = CartItem.createCartItem(cart, userBookDetail);
		cartItemRepository.save(cartItem);
	}

	@Transactional
	public void deleteCartItem(User customer, Long ownerbookId) {

		UserBook userBook = userBooksRepository.findById(ownerbookId)
			.orElseThrow(() -> new IllegalArgumentException("해당 책을 찾을 수 없습니다."));

		UserBookDetail userBookDetail = userBookDetailRepository.findUserBookDetailByUserBookId(ownerbookId)
			.orElseThrow(() -> new IllegalArgumentException("해당 책의 상세 정보를 찾을 수 없습니다."));

		Cart cart = cartRepository.findCartByUserIdAndBookId(customer.getId(), ownerbookId)
			.orElseThrow(() -> new IllegalArgumentException("해당 책을 찾을 수 없습니다."));

	}
}
