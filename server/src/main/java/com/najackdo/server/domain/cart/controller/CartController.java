package com.najackdo.server.domain.cart.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
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
	 * @param customer
	 * @return {@link SuccessResponse<List<CartData.CartInfo>>}
	 */
	@GetMapping("list")
	@Operation(summary = "장바구니 조회", description = "장바구니 조회")
	public SuccessResponse<List<CartData.CartInfo>> getCartList(@CurrentUser User user) {
		log.info("장바구니 조회 요청 : {}", user.getId());
		List<CartData.CartInfo> cartList = cartService.getCartList(user);
		log.info("장바구니 조회 완료 : {}", user.getId());
		return SuccessResponse.of(cartList);
	}

}
