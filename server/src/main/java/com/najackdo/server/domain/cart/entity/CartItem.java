package com.najackdo.server.domain.cart.entity;

import com.najackdo.server.domain.book.entity.UserBookDetail;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart_item")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CartItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cart_item_id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cart_id", nullable = false)
	private Cart cart;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_book_details_id")
	private UserBookDetail userBookDetail;


	public static CartItem createCartItem(Cart cart, UserBookDetail userBookDetail) {
		CartItem cartItem = new CartItem();
		cartItem.cart = cart;
		cartItem.userBookDetail = userBookDetail;
		return cartItem;
	}
}
