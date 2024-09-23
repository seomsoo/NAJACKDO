package com.najackdo.server.domain.cart.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.domain.cart.dto.CartData;
import com.najackdo.server.domain.cart.entity.Cart;
import com.najackdo.server.domain.cart.repository.CartItemRepository;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CartService {

	private final CartItemRepository cartItemRepository;

	public List<CartData.CartInfo> getCartList(User customer) {

		List<Cart> bookCarts = customer.getBookCarts();

		return bookCarts.stream()
			.map(cart -> CartData.CartInfo.of(cart.getOwner(), cartItemRepository.findByCartId(cart.getId())))
			.collect(Collectors.toList());
	}
}
