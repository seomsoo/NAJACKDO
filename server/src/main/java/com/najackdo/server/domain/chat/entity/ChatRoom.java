package com.najackdo.server.domain.chat.entity;

import com.najackdo.server.domain.user.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {

	@Id
	private String roomId; // 채팅방 아이디
	private String roomName; // 채팅방 이름

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user1")
	private User user1;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user2")
	private User user2;
}