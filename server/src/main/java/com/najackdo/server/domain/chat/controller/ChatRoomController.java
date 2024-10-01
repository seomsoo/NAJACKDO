package com.najackdo.server.domain.chat.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.chat.dto.ChatRoomData;
import com.najackdo.server.domain.chat.dto.CreateChatRoomDto;
import com.najackdo.server.domain.chat.entity.Chat;
import com.najackdo.server.domain.chat.repository.ChatMongoRepository;
import com.najackdo.server.domain.chat.service.ChatService;
import com.najackdo.server.domain.user.entity.User;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/chatroom")
@Tag(name = "채팅 관련 API ")
public class ChatRoomController {
	private final ChatService chatService;
	private final ChatMongoRepository chatMongoRepository;

	// 채팅방 목록 조회
	@GetMapping("")
	@Operation(summary = "채팅방 목록 조회", description = "채팅방 목록 조회")
	public SuccessResponse<ChatRoomData.Search> chatRoomList(@CurrentUser User user) {

		return SuccessResponse.of(chatService.chatRoomList(user));
	}

	// 채팅방 생성
	@PostMapping("")
	@Operation(summary = "채팅방 생성", description = "채팅방 생성")
	public SuccessResponse<Long> createRoom(
		@CurrentUser User customer,
		@RequestBody CreateChatRoomDto createChatRoomDto) {

		Long roomId = chatService.createRoom(customer, createChatRoomDto.getOwnerId(), createChatRoomDto.getCartId());
		return SuccessResponse.of(roomId);
	}

	// 채팅방 채팅내용 불러오기 (방 열기)
	@GetMapping("/chat")
	@Operation(summary = "채팅방 채팅내용 불러오기", description = "채팅방 채팅내용 불러오기")
	public SuccessResponse<Chat> getChatList(
		@CurrentUser User user,
		@RequestParam("roomId") Long roomId) {

		return SuccessResponse.of(chatService.getChatList(roomId, user));
	}
}