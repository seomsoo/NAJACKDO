package com.najackdo.server.domain.rental.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.rental.entity.ReviewItems;

public interface ReviewItemsRepository extends JpaRepository<ReviewItems, Long> {
}
