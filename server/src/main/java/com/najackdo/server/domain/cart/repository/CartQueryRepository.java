package com.najackdo.server.domain.cart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.query.Param;

import com.najackdo.server.domain.cart.dto.CartData;
import com.najackdo.server.domain.cart.entity.Cart;

public interface CartQueryRepository {

	/**
	 * 사용자 id와 책주인 id로 장바구니 조회
	 *
	 * @param customerId 소비자 id
	 * @param customerId 책주인
	 * @return {@link Optional<Cart>} 장바구니
	 */
	Optional<Cart> findCartByUserIdAndOwnerId(Long customerId, Long ownerId);

	/**
	 * 사용자 ID로 사용자의 카트 조회
	 *
	 * @param id 사용자 ID
	 */
	List<CartData.CartInfo> findCartsByUserId(Long id);

	Optional<Cart> findByIdWithCashLogs(@Param("cartId") Long cartId);
}
