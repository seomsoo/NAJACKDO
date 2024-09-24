package com.najackdo.server.domain.recommendation.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.najackdo.server.domain.recommendation.entity.BookMark;

public interface BookMarkMongoRepository extends MongoRepository<BookMark, String> {

}
