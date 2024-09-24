package com.najackdo.server.domain.recommendation.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.najackdo.server.domain.recommendation.entity.Visit;

public interface VisitMongoRepository extends MongoRepository<Visit, String> {
}
