package com.najackdo.server.domain.cart.dto;

import java.util.List;

import com.najackdo.server.domain.rental.entity.RentalStatus;

import lombok.Data;

public class CartData {

	@Data
	public static class CartInfo {

		private Long cartId; // cart
		private Long ownerId; // cart
		private String ownerUsername; // cart -> user
		private RentalStatus status; // cart
		private Long rentalId;
		private List<CartItemInfo> cartItems; // cart -> cartItems

		public static CartInfo of(Long cartId, Long ownerId, String ownerUsername, List<CartItemInfo> cartItems, RentalStatus status, Long rentalId) {
			CartInfo cartInfo = new CartInfo();
			cartInfo.cartId = cartId;
			cartInfo.ownerId = ownerId;
			cartInfo.ownerUsername = ownerUsername;
			cartInfo.status = status;
			cartInfo.rentalId = rentalId;
			cartInfo.cartItems = cartItems;
			return cartInfo;
		}
	}

	@Data
	public static class CartItemInfo {

		private Long cartItemId; // cartItem
		private String bookImage; // cartItem -> userBookDetail
		private String bookTitle; // cartItem -> userBookDetail -> userBook-> book
		private String author; // cartItem -> userBookDetail -> userBook-> book
		private int price; // cartItem -> userBookDetail

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
