package com.najackdo.server.domain.chat.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatDTO {

	private Long roomId; // 방 번호
	private Long senderId; // 채팅을 보낸 사람
	private String senderNickname; // 채팅을 보낸 사람 닉네임
	private String message; // 메시지
	private TalkType talkType; // 메시지 타입
	private LocalDateTime time; // 채팅 발송 시간
	private Long receiverId; // 채팅을 받는 사람
}