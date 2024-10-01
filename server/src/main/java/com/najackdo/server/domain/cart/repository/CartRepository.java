package com.najackdo.server.domain.cart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.najackdo.server.domain.cart.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>, CartQueryRepository {

	@Query("""
			SELECT c
			FROM Cart c
			LEFT JOIN FETCH c.owner
			LEFT JOIN FETCH c.cartItems
			LEFT JOIN FETCH c.rental
			WHERE c.id = :cartId
			""")
	Optional<Cart> findCartInfoById(@Param("cartId") Long cartId);
}
