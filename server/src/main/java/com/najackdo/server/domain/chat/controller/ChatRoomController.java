package com.najackdo.server.domain.chat.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.chat.dto.ChatRoomDTO;
import com.najackdo.server.domain.chat.entity.Chat;
import com.najackdo.server.domain.chat.service.ChatServiceImpl;
import com.najackdo.server.domain.user.entity.User;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/chatroom")
@Tag(name = "채팅 관련 API ")
public class ChatRoomController {
	private final ChatServiceImpl chatService;

	// 채팅방 목록 조회
	@GetMapping("")
	@Operation(summary = "채팅방 목록 조회", description = "채팅방 목록 조회")
	public SuccessResponse<List<ChatRoomDTO>> chatRoomList() {
		List<ChatRoomDTO> chatRoomDTOS = chatService.chatRoomList();
		return SuccessResponse.of(chatRoomDTOS);
	}

	// 채팅방 생성
	@PostMapping("")
	@Operation(summary = "채팅방 생성", description = "채팅방 생성")
	public SuccessResponse<String> createRoom(
		@CurrentUser User customer,
		@RequestParam("owner") Long ownerId,
		@RequestParam("cart") Long cartId
	) {
		ChatRoomDTO room = chatService.createRoom(customer, ownerId, cartId);
		return SuccessResponse.of(room.getRoomId());
	}

	// 채팅방 채팅내용 불러오기 (방 열기)
	@GetMapping("/chat")
	@Operation(summary = "채팅방 채팅내용 불러오기", description = "채팅방 채팅내용 불러오기")
	public SuccessResponse<List<Chat.Message>> getChatList(
		@CurrentUser User user,
		@RequestParam("room") String roomId) {

		List<Chat.Message> chatList = chatService.getChatList(roomId, user);

		return SuccessResponse.of(chatList);
	}
}