package com.najackdo.server.domain.cart.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.cart.dto.CartData;
import com.najackdo.server.domain.cart.service.CartService;
import com.najackdo.server.domain.user.entity.User;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
@Tag(name = "장바구니 API ")
public class CartController {

	private final CartService cartService;

	/**
	 * 유저의 모든 장바구니 조회
	 *
	 * @param user
	 * @return {@link SuccessResponse<List<CartData.CartInfo>>}
	 */
	@GetMapping("/list")
	@Operation(summary = "장바구니 조회", description = "장바구니 조회")
	public SuccessResponse<List<CartData.CartInfo>> getCartList(@CurrentUser User user) {
		List<CartData.CartInfo> cartList = cartService.getCartList(user);
		return SuccessResponse.of(cartList);
	}

	/**
	 * 특정 장바구니 조회
	 *
	 * @param cartId
	 * @return {@link SuccessResponse<CartData.CartInfo>}
	 */
	@GetMapping("/{cartId}")
	@Operation(summary = "특정 장바구니 조회", description = "특정 장바구니 조회")
	public SuccessResponse<CartData.CartInfo> getCart(@PathVariable Long cartId) {
		CartData.CartInfo cart = cartService.getCart(cartId);
		return SuccessResponse.of(cart);
	}
}
