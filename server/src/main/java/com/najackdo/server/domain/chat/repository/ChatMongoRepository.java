package com.najackdo.server.domain.chat.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.najackdo.server.domain.chat.entity.Chat;

public interface ChatMongoRepository extends MongoRepository<Chat,String> {

	Chat findByRoomId(Long roomId);
}