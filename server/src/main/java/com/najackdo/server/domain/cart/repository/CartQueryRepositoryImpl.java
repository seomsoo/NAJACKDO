package com.najackdo.server.domain.cart.repository;

import static com.najackdo.server.domain.book.entity.QUserBook.*;
import static com.najackdo.server.domain.cart.entity.QCart.*;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.najackdo.server.domain.cart.entity.Cart;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CartQueryRepositoryImpl implements CartQueryRepository {

	private final JPAQueryFactory queryFactory;

	@Override
	public Optional<Cart> findCartByUserIdAndBookId(Long userId, Long bookId) {

		return Optional.ofNullable(
			queryFactory.selectFrom(cart)
				.join(userBook).on(userBook.book.id.eq(bookId))
				.where(
					cart.customer.id.eq(userId),
					cart.owner.id.eq(userBook.user.id),
					cart.isDelete.isFalse()
				)
				.fetchOne()
		);
	}

}
