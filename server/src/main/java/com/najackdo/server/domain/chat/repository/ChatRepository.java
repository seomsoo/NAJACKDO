package com.najackdo.server.domain.chat.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.najackdo.server.domain.chat.entity.Chat;

public interface ChatRepository extends MongoRepository<Chat,String> {
	List<Chat> findAllByRoomId(String roomId);

	Chat findByRoomId(String roomId);
}