package com.najackdo.server.domain.chat.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.najackdo.server.domain.chat.dto.TalkType;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Document(collection = "chat")  // MongoDB collection
public class Chat {

	@Id
	private String id;
	private Long userId;
	private Long roomId; // 방 번호
	private List<Message> messages = new ArrayList<>(); // 채팅 메시지

	@Getter
	@Setter
	@ToString
	public static class Message {
		private Long senderId;  // 채팅을 보낸 사람
		private String senderNickname; // 채팅을 보낸 사람 닉네임
		private String message; // 메시지
		private TalkType talkType; // 메시지 타입
		private LocalDateTime time; // 채팅 발송 시간
	}
}