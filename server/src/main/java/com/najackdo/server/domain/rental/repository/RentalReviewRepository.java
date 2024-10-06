package com.najackdo.server.domain.rental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.najackdo.server.domain.rental.entity.Rental;
import com.najackdo.server.domain.rental.entity.RentalReview;

public interface RentalReviewRepository extends JpaRepository<RentalReview, Long> {

	@Query("""
		SELECT r 
		FROM RentalReview r
		JOIN FETCH r.user
		WHERE r.rental.id = :rentalId
		ORDER BY r.id DESC	
		
""")
	List<RentalReview> findByRentalId(Long rentalId);

	@Query("""
		SELECT r 
		FROM RentalReview r
		JOIN FETCH r.reviewItems
		 WHERE r.user.id = :id
		ORDER BY r.id DESC
	""")
	List<RentalReview> findByUserId(Long id);
}
