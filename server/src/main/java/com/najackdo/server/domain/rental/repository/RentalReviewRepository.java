package com.najackdo.server.domain.rental.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.rental.entity.RentalReview;

public interface RentalReviewRepository extends JpaRepository<RentalReview, Long> {
}
