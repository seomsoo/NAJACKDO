package com.najackdo.server.domain.cart.entity;

import java.util.ArrayList;
import java.util.List;

import com.najackdo.server.domain.chat.entity.ChatRoom;
import com.najackdo.server.domain.rental.entity.Rental;
import com.najackdo.server.domain.user.entity.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cart_id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "customer_id", nullable = false)
	private User customer;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "owner_id", nullable = false)
	private User owner;

	// FIXME : 삭제 예정
	@Column(name = "rental_period", nullable = false)
	private int rentalPeriod = 14;

	@Column(name = "is_delete", nullable = false)
	private boolean isDelete = false;

	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<CartItem> cartItems = new ArrayList<>();

	@OneToOne(mappedBy = "cart", fetch = FetchType.LAZY)
	private Rental rental;

	@OneToOne(mappedBy = "cart", fetch = FetchType.LAZY)
	ChatRoom chatRoom;

	public static Cart createCart(User customer, User owner) {
		Cart cart = new Cart();
		cart.customer = customer;
		cart.owner = owner;
		return cart;
	}

	public void deleteCart() {
		this.isDelete = true;
	}
}
