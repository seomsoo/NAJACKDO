package com.najackdo.server.domain.chat.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.najackdo.server.domain.cart.entity.CartItem;
import com.najackdo.server.domain.chat.entity.ChatRoom;

import lombok.Data;

public class ChatRoomData {
	@Data
	public static class Create {
		private Long roomId;
		private Long ownerId;
		private Long cartId;

		public static Create of(Long roomId, Long ownerId, Long cartId) {
			Create create = new Create();
			create.setRoomId(roomId);
			create.setOwnerId(ownerId);
			create.setCartId(cartId);
			return create;
		}
	}

	@Data
	public static class Search {
		private Long userId;
		private List<SearchElement> chatRoomList;

		public static Search create(Long userId, List<SearchElement> chatRoomList) {
			Search chatRoomWithUserDTO = new Search();
			chatRoomWithUserDTO.setUserId(userId);
			chatRoomWithUserDTO.setChatRoomList(chatRoomList);
			return chatRoomWithUserDTO;
		}

		@Data
		public static class SearchElement {

			private Long roomId; // 채팅방 아이디
			private Long cartId;

			private Long customerId;
			private String customerNickname;
			private String customerProfile;
			private String customerLocation;

			private Long ownerId;
			private String ownerNickname;
			private String ownerProfile;
			private String ownerLocation;

			private TalkType lastChatType;
			private LocalDateTime lastChatTime;
			private String lastChatMessage;
			private String displayImagePath;

			public static SearchElement search(ChatRoom chatRoom, LocalDateTime lastChatTime, String lastChatMessage,
				TalkType talkType) {
				SearchElement chatRoomDTO = new SearchElement();
				chatRoomDTO.setRoomId(chatRoom.getRoomId());
				chatRoomDTO.setCartId(chatRoom.getCart().getId());

				chatRoomDTO.setCustomerId(chatRoom.getCustomer().getId());
				chatRoomDTO.setCustomerNickname(chatRoom.getCustomer().getNickName());
				chatRoomDTO.setCustomerProfile(chatRoom.getCustomer().getProfileImage());
				chatRoomDTO.setCustomerLocation(
					chatRoom.getCustomer().getActivityAreaSetting().getLocation().getLocationName());

				chatRoomDTO.setOwnerId(chatRoom.getOwner().getId());
				chatRoomDTO.setOwnerNickname(chatRoom.getOwner().getNickName());
				chatRoomDTO.setOwnerProfile(chatRoom.getOwner().getProfileImage());
				chatRoomDTO.setOwnerLocation(
					chatRoom.getOwner().getActivityAreaSetting().getLocation().getLocationName());

				chatRoomDTO.setLastChatType(talkType);
				chatRoomDTO.setLastChatTime(lastChatTime);
				chatRoomDTO.setLastChatMessage(lastChatMessage);


				List<CartItem> cartItems = chatRoom.getCart().getCartItems();

				if (!cartItems.isEmpty()) {
					chatRoomDTO.setDisplayImagePath(cartItems.get(0).getUserBookDetail().getFrontImagePath());
				}

				return chatRoomDTO;
			}
		}
	}
}
