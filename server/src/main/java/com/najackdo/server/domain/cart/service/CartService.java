package com.najackdo.server.domain.cart.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.domain.cart.dto.CartData;
import com.najackdo.server.domain.cart.repository.CartItemRepository;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CartService {

	private final CartItemRepository cartItemRepository;
	private final UserRepository userRepository;

	public List<CartData.CartInfo> getCartList(User customer) {

		User user = userRepository.findUserWithCartsById(customer.getId())
			.orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

		log.info("user.getBookCarts().size() : {}", user.getBookCarts().size());

		return user.getBookCarts().stream()
			.map(cart -> CartData.CartInfo.of(cart.getOwner(), cartItemRepository.findByCartId(cart.getId())))
			.collect(Collectors.toList());
	}
}
