package com.najackdo.server.domain.cart.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.cart.service.CartItemService;
import com.najackdo.server.domain.user.entity.User;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/cart-item")
@RequiredArgsConstructor
@Tag(name = "장바구니 아이템 API ")
public class CartItemController {

	private final CartItemService cartItemService;

	/**
	 * 장바구니 담기
	 *
	 * @param customer
	 * @param ownerbookId
	 * @return {@link SuccessResponse<Void>}
	 */
	@PostMapping("add/{ownerbookId}")
	@Operation(summary = "장바구니 담기", description = "장바구니 담기")
	public SuccessResponse<Void> addCartItem(@CurrentUser User customer, @PathVariable Long ownerbookId) {

		cartItemService.addCartItem(customer, ownerbookId);

		return SuccessResponse.empty();
	}

	/**
	 * 장바구니 삭제
	 *
	 * @param customer
	 * @param cartItemId
	 * @return {@link SuccessResponse<Void>}
	 */
	@PostMapping("delete/{cartItemId}")
	@Operation(summary = "장바구니 삭제", description = "장바구니 삭제")
	public SuccessResponse<Void> deleteCartItem(@CurrentUser User customer, @PathVariable Long cartItemId) {

		cartItemService.deleteCartItem(customer, cartItemId);

		return SuccessResponse.empty();
	}
}
