package com.najackdo.server.domain.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.najackdo.server.domain.chat.entity.ChatRoom;
import com.najackdo.server.domain.user.entity.User;

public interface ChatRoomRepository extends JpaRepository<ChatRoom,String> {

	@Query("select c from ChatRoom c where c.roomId = :roomId")
	List<User> findUsersByRoomId(@Param("roomId") String roomId);

	@Query("""
		select cr from ChatRoom cr
		join fetch cr.customer
		join fetch cr.customer.activityAreaSetting
		join fetch cr.customer.activityAreaSetting.location
		join fetch cr.owner
		join fetch cr.owner.activityAreaSetting
		join fetch cr.owner.activityAreaSetting.location
		join fetch cr.cart
		join fetch cr.cart.cartItems ci
		join fetch ci.userBookDetail
		where cr.customer = :user or cr.owner = :user
		""")
	List<ChatRoom> findChatRoomsByUser(User user);
}