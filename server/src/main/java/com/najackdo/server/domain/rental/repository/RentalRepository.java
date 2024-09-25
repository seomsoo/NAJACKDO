package com.najackdo.server.domain.rental.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.najackdo.server.domain.rental.entity.Rental;

public interface RentalRepository extends JpaRepository<Rental, Long> {

	@Query("SELECT r FROM Rental r WHERE r.cart.id = :cartId")
	Optional<Rental> findByCartId(@Param("cartId") Long cartId);

}
