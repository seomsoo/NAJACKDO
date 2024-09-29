package com.najackdo.server.domain.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.najackdo.server.domain.chat.entity.ChatRoom;
import com.najackdo.server.domain.user.entity.User;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

	@Query("select c from ChatRoom c where c.roomId = :roomId")
	List<User> findUsersByRoomId(@Param("roomId") Long roomId);

	@Query("""
		select cr from ChatRoom cr
		left join fetch cr.customer
		left join fetch cr.customer.activityAreaSetting
		left join fetch cr.customer.activityAreaSetting.location
		left join fetch cr.owner
		left join fetch cr.owner.activityAreaSetting
		left join fetch cr.owner.activityAreaSetting.location
		left join fetch cr.cart
		left join fetch cr.cart.cartItems ci
		left join fetch ci.userBookDetail
		where cr.customer = :user or cr.owner = :user
	""")
	List<ChatRoom> findChatRoomsByUser(User user);
}