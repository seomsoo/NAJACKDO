package com.najackdo.server.domain.cart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.najackdo.server.domain.cart.entity.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

	@Query("SELECT ci FROM CartItem ci WHERE ci.cart.id = :id")
	List<CartItem> findCartItemsByCartId(Long id);
}
