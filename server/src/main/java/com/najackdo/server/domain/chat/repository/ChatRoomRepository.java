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
}