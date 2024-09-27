package com.najackdo.server.domain.user.repository;

import static com.najackdo.server.domain.book.entity.QBook.*;
import static com.najackdo.server.domain.book.entity.QUserBook.*;
import static com.najackdo.server.domain.book.entity.QUserBookDetail.*;
import static com.najackdo.server.domain.cart.entity.QCart.*;
import static com.najackdo.server.domain.cart.entity.QCartItem.*;
import static com.najackdo.server.domain.location.entity.QActivityAreaSetting.*;
import static com.najackdo.server.domain.location.entity.QLocation.*;
import static com.najackdo.server.domain.rental.entity.QRentalReview.*;
import static com.najackdo.server.domain.rental.entity.QReviewItems.*;
import static com.najackdo.server.domain.user.entity.QCashLog.*;
import static com.najackdo.server.domain.user.entity.QUser.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.najackdo.server.domain.user.dto.UserData;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserQueryRepositoryImpl implements UserQueryRepository {

	private final JPAQueryFactory queryFactory;

	@Override
	public Integer findUserSavingCash(Long userId) {
		NumberExpression<Double> rentalPeriodDiscountRate =
			Expressions.numberTemplate(Double.class,
				"case when {0} = 14 then 0.0 " +
					"when {0} >= 30 then 0.1 " +
					"when {0} >= 45 then 0.15 " +
					"when {0} = 60 then 0.2 " +
					"else 0.0 end",
				cart.rentalPeriod);

		Integer totalSaving = queryFactory
			.select(
				book.priceStandard.subtract(
					userBookDetail.onedayPrice
						.multiply(cart.rentalPeriod)
						.multiply(rentalPeriodDiscountRate)
				).sum().intValue()
			)
			.from(cartItem)
			.join(cartItem.cart, cart)
			.join(cartItem.userBookDetail, userBookDetail)
			.join(userBookDetail.userBook, userBook)
			.join(userBook.book, book)
			.where(cart.customer.id.eq(userId)
				.and(cart.isDelete.isTrue())
			)
			.fetchOne();

		return totalSaving != null ? totalSaving : 0;
	}

	@Override
	public Integer findUserEarningCash(Long userId) {
		Integer totalEarning = queryFactory
			.select(cartItem.userBookDetail.onedayPrice.multiply(cart.rentalPeriod).sum())
			.from(cartItem)
			.join(cartItem.cart, cart)
			.where(cart.owner.id.eq(userId))
			.fetchOne();

		return totalEarning != null ? totalEarning : 0;
	}

	@Override
	public String findUserLocationName(Long userId) {
		return queryFactory
			.select(location.locationName)
			.from(activityAreaSetting)
			.join(activityAreaSetting.location, location)
			.join(activityAreaSetting.user, user)
			.where(user.id.eq(userId))
			.fetchOne();
	}

	@Override
	public List<UserData.CashLogResponse> findUserCashLog(Long userId) {

		return queryFactory
			.selectFrom(cashLog)
			.where(cashLog.user.id.eq(userId))
			.orderBy(cashLog.createdAt.desc()) // 최신 순 정렬
			.fetch()
			.stream()
			.map(UserData.CashLogResponse::of)
			.collect(Collectors.toList());
	}

	@Override
	public List<UserData.reviewInfo> countUserReviewsByPositive(Long id, boolean positive) {
		return queryFactory
			.select(Projections.fields(
				UserData.reviewInfo.class,   // 반환할 클래스
				reviewItems.Id.as("reviewId"),     // reviewId
				reviewItems.content, // content
				reviewItems.count().as("count")  // count
			))
			.from(rentalReview)
			.join(rentalReview.reviewItems, reviewItems)
			.where(rentalReview.user.id.eq(id)
				.and(reviewItems.positive.eq(positive))
			)
			.groupBy(reviewItems.Id)
			.fetch().stream()
			.map(tuple -> UserData.reviewInfo.of(
				tuple.getReviewId(),
				tuple.getContent(),
				tuple.getCount()
			))
			.collect(Collectors.toList());
	}

}
