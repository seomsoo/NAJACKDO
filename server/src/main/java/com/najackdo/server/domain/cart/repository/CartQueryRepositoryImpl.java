package com.najackdo.server.domain.cart.repository;

import static com.najackdo.server.domain.book.entity.QUserBook.*;
import static com.najackdo.server.domain.book.entity.QUserBookDetail.*;
import static com.najackdo.server.domain.cart.entity.QCart.*;
import static com.najackdo.server.domain.cart.entity.QCartItem.*;
import static com.najackdo.server.domain.user.entity.QUser.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.book.entity.UserBookDetail;
import com.najackdo.server.domain.cart.dto.CartData;
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

	@Override
	public List<CartData.CartInfo> findCartsByUserId(Long userId) {

		return queryFactory
			.select(cart)
			.from(cart)
			.leftJoin(cart.customer, user).fetchJoin()
			.leftJoin(cart.cartItems, cartItem).fetchJoin()
			.leftJoin(cartItem.userBookDetail, userBookDetail).fetchJoin()
			.leftJoin(userBookDetail.userBook, userBook).fetchJoin()
			.where(cart.customer.id.eq(userId)
				.and(cart.isDelete.isFalse())
			)

			.fetch()
			.stream()
			.map(c -> CartData.CartInfo.of(
				c.getId(),
				c.getOwner().getId(),
				c.getOwner().getNickName(),
				c.getCartItems().stream()
					.map(ci -> {
						UserBookDetail detail = ci.getUserBookDetail();
						UserBook book = detail.getUserBook();
						return CartData.CartItemInfo.of(
							ci.getId(),
							detail.getFrontImagePath(),
							book.getBook().getTitle(),
							book.getBook().getAuthor(),
							detail.getOnedayPrice()

						);
					})
					.collect(Collectors.toList())
			))
			.collect(Collectors.toList());
	}

}