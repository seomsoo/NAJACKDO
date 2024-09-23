package com.najackdo.server.domain.cart.dto;

import java.util.List;

import com.najackdo.server.domain.cart.entity.CartItem;
import com.najackdo.server.domain.user.entity.User;

import lombok.Data;

public class CartData {

	@Data
	public static class CartInfo {

		User onwer;
		List<CartItem> cartItems;

		public static CartInfo of(User owner, List<CartItem> cartItems) {
			CartInfo cartList = new CartInfo();
			cartList.onwer = owner;
			cartList.cartItems = cartItems;
			return cartList;
		}
	}
}
