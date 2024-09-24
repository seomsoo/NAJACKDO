package com.najackdo.server.domain.cart.dto;

import java.util.List;

import lombok.Data;

public class CartData {

	@Data
	public static class CartInfo {

		private Long cartId;
		private Long ownerId;
		private String ownerUsername;
		private List<CartItemInfo> cartItems;

		public static CartInfo of(Long cartId, Long ownerId, String ownerUsername, List<CartItemInfo> cartItems) {
			CartInfo cartInfo = new CartInfo();
			cartInfo.cartId = cartId;
			cartInfo.ownerId = ownerId;
			cartInfo.ownerUsername = ownerUsername;
			cartInfo.cartItems = cartItems;
			return cartInfo;
		}
	}

	@Data
	public static class CartItemInfo {

		private Long cartItemId;
		private String bookImage;
		private String bookTitle;
		private String author;
		private int price;

		public static CartItemInfo of(Long cartItemId, String bookImage, String bookTitle, String author, int price) {
			CartItemInfo cartItemInfo = new CartItemInfo();
			cartItemInfo.cartItemId = cartItemId;
			cartItemInfo.bookImage = bookImage;
			cartItemInfo.bookTitle = bookTitle;
			cartItemInfo.author = author;
			cartItemInfo.price = price;
			return cartItemInfo;
		}

	}
}
