package com.najackdo.server.domain.cart.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.najackdo.server.domain.cart.dto.CartData;
import com.najackdo.server.domain.cart.repository.CartItemRepository;
import com.najackdo.server.domain.cart.repository.CartRepository;
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

	public List<CartData.CartInfo> getCartList(User customer) {

		List<CartData.CartInfo> cartList = cartRepository.findCartsByUserId(customer.getId());
		
		return cartList;
	}

}