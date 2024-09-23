package com.najackdo.server.domain.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.cart.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
