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
		select c from ChatRoom c
		join fetch c.customer
		join fetch c.customer.activityAreaSetting
		join fetch c.customer.activityAreaSetting.location
		join fetch c.owner
		join fetch c.owner.activityAreaSetting
		join fetch c.owner.activityAreaSetting.location
		where c.customer = :user or c.owner = :user
		""")
	List<ChatRoom> findChatRoomsByUser(User user);
}