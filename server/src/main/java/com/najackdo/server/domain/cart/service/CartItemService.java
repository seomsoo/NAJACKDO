package com.najackdo.server.domain.cart.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.core.exception.BaseException;
import com.najackdo.server.core.exception.ErrorCode;
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
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER_BOOK));

		if (customer.getId().equals(userBook.getUser().getId())) {
			throw new BaseException(ErrorCode.NOT_ADD_MY_BOOK_TO_CART);
		}

		UserBookDetail userBookDetail = userBookDetailRepository.findUserBookDetailByUserBookId(ownerbookId)
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_USER_BOOK_DETAIL));

		User owner = userBook.getUser();

		Optional<Cart> existingCart = cartRepository.findCartByUserIdAndOwnerId(customer.getId(), owner.getId());

		Cart cart;
		if (existingCart.isEmpty()) {
			cart = Cart.createCart(customer, userBook.getUser());
			cartRepository.save(cart);
		} else {
			cart = existingCart.get();
		}
		
		List<CartItem> cartItems = cartItemRepository.findCartItemsByCartId(cart.getId());
		boolean exists = cartItems.stream()
			.anyMatch(cartItem -> cartItem.getUserBookDetail().getId().equals(userBookDetail.getId()));

		if (exists) {
			throw new BaseException(ErrorCode.ALREADY_EXIST_CART_ITEM);
		}

		CartItem cartItem = CartItem.createCartItem(cart, userBookDetail);
		cartItemRepository.save(cartItem);
	}

	@Transactional
	public void deleteCartItem(User customer, Long cartItemId) {
		CartItem cartItem = cartItemRepository.findById(cartItemId)
			.orElseThrow(() -> new BaseException(ErrorCode.NOT_FOUND_CART_ITEM));

		if (!cartItem.getCart().getCustomer().getId().equals(customer.getId())) {
			throw new BaseException(ErrorCode.NOT_YOUR_CART_ITEM);
		}

		List<CartItem> cartItems = cartItemRepository.findCartItemsByCartId(cartItem.getCart().getId());

		cartItemRepository.delete(cartItem);

		if (cartItems.isEmpty()) {
			Cart cart = cartItem.getCart();
			cart.deleteCart();
		}

	}
}
