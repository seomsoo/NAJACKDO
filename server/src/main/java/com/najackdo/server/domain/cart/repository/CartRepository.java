package com.najackdo.server.domain.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.najackdo.server.domain.cart.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>, CartQueryRepository {

}
