package com.najackdo.server.domain.chat.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.najackdo.server.domain.chat.entity.ChatRoom;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ChatRoomData {

	@Data
	public static class ChatRoomWithUserDTO{
		private Long userId;
		private List<ChatRoomDTO> chatRoomList;

		public static ChatRoomWithUserDTO create(Long userId, List<ChatRoomDTO> chatRoomList){
			ChatRoomWithUserDTO chatRoomWithUserDTO = new ChatRoomWithUserDTO();
			chatRoomWithUserDTO.setUserId(userId);
			chatRoomWithUserDTO.setChatRoomList(chatRoomList);
			return chatRoomWithUserDTO;
		}
	}

	@Data
	public static class ChatRoomDTO {

		private Long roomId; // 채팅방 아이디

		private Long customerId;
		private String customerNickname;
		private String customerProfile;
		private String customerLocation;

		private Long ownerId;
		private String ownerNickname;
		private String ownerProfile;
		private String ownerLocation;

		private LocalDateTime lastChatTime;
		private String lastChatMessage;


		public static ChatRoomDTO create(ChatRoom chatRoom) {
			ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
			chatRoomDTO.setRoomId(chatRoom.getRoomId());

			chatRoomDTO.setCustomerId(chatRoom.getCustomer().getId());
			chatRoomDTO.setCustomerNickname(chatRoom.getCustomer().getNickName());
			chatRoomDTO.setCustomerProfile(chatRoom.getCustomer().getProfileImage());
			chatRoomDTO.setCustomerLocation(chatRoom.getCustomer().getActivityAreaSetting().getLocation().getLocationName());

			chatRoomDTO.setOwnerId(chatRoom.getOwner().getId());
			chatRoomDTO.setOwnerNickname(chatRoom.getOwner().getNickName());
			chatRoomDTO.setOwnerProfile(chatRoom.getOwner().getProfileImage());
			chatRoomDTO.setOwnerLocation(chatRoom.getOwner().getActivityAreaSetting().getLocation().getLocationName());

			return chatRoomDTO;
		}


		public static ChatRoomDTO search(ChatRoom chatRoom, LocalDateTime lastChatTime, String lastChatMessage) {
			ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
			chatRoomDTO.setRoomId(chatRoom.getRoomId());

			chatRoomDTO.setCustomerId(chatRoom.getCustomer().getId());
			chatRoomDTO.setCustomerNickname(chatRoom.getCustomer().getNickName());
			chatRoomDTO.setCustomerProfile(chatRoom.getCustomer().getProfileImage());
			chatRoomDTO.setCustomerLocation(chatRoom.getCustomer().getActivityAreaSetting().getLocation().getLocationName());

			chatRoomDTO.setOwnerId(chatRoom.getOwner().getId());
			chatRoomDTO.setOwnerNickname(chatRoom.getOwner().getNickName());
			chatRoomDTO.setOwnerProfile(chatRoom.getOwner().getProfileImage());
			chatRoomDTO.setOwnerLocation(chatRoom.getOwner().getActivityAreaSetting().getLocation().getLocationName());

			chatRoomDTO.setLastChatTime(lastChatTime);
			chatRoomDTO.setLastChatMessage(lastChatMessage);
			return chatRoomDTO;
		}
	}



}