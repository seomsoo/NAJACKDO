package com.najackdo.server.domain.chat.entity;

import com.najackdo.server.domain.cart.entity.Cart;
import com.najackdo.server.domain.user.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "chat_room")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long roomId; // 채팅방 아이디

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "customer_id")
	private User customer;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "owner_id")
	private User owner;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cart")
	private Cart cart;


	public static ChatRoom create( User customer, User owner, Cart cart) {
		ChatRoom chatRoom = new ChatRoom();
		chatRoom.customer = customer;
		chatRoom.owner = owner;
		chatRoom.cart = cart;
		return chatRoom;
	}
}