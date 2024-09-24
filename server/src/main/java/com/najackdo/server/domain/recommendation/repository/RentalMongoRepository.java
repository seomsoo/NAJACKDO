package com.najackdo.server.domain.recommendation.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.najackdo.server.domain.recommendation.entity.Rental;

public interface RentalMongoRepository extends MongoRepository<Rental, String> {
}
