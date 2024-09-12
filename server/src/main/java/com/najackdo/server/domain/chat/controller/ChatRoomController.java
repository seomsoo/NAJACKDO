package com.najackdo.server.domain.chat.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.najackdo.server.core.annotation.CurrentUser;
import com.najackdo.server.core.response.SuccessResponse;
import com.najackdo.server.domain.chat.dto.ChatDTO;
import com.najackdo.server.domain.chat.dto.ChatRoomDTO;
import com.najackdo.server.domain.chat.entity.Chat;
import com.najackdo.server.domain.chat.service.ChatServiceImpl;
import com.najackdo.server.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/chatroom")
public class ChatRoomController {
	private final ChatServiceImpl chatService;

	// 채팅방 목록 조회
	@GetMapping("")
	public SuccessResponse<List<ChatRoomDTO>> chatRoomList(){
		List<ChatRoomDTO> chatRoomDTOS = chatService.chatRoomList();
		return SuccessResponse.of(chatRoomDTOS);
	}

	// 채팅방 생성
	@PostMapping("")
	public SuccessResponse<String> createRoom(@RequestParam("name") String name) {
		ChatRoomDTO room = chatService.createRoom(name);
		return SuccessResponse.of(room.getRoomId());
	}


	// 채팅방 채팅내용 불러오기 (방 열기)
	@GetMapping("/chat")
	public SuccessResponse<List<Chat.Message>> getChatList(
		@CurrentUser User user,
		@RequestParam("roomId") String roomId){

		List<Chat.Message> chatList = chatService.getChatList(roomId, user);

		return SuccessResponse.of(chatList);
	}
}