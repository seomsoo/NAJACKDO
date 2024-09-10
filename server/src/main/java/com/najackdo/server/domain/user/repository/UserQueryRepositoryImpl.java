package com.najackdo.server.domain.user.repository;

import static com.najackdo.server.domain.book.entity.QBook.*;
import static com.najackdo.server.domain.book.entity.QUserBook.*;
import static com.najackdo.server.domain.book.entity.QUserBookDetail.*;
import static com.najackdo.server.domain.location.entity.QActivityAreaSetting.*;
import static com.najackdo.server.domain.location.entity.QLocation.*;
import static com.najackdo.server.domain.rental.entity.QRental.*;
import static com.najackdo.server.domain.rental.entity.QRentalLog.*;
import static com.najackdo.server.domain.rental.entity.QRentalReview.*;
import static com.najackdo.server.domain.user.entity.QCashLog.*;
import static com.najackdo.server.domain.user.entity.QUser.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.najackdo.server.domain.rental.entity.ReviewItems;
import com.najackdo.server.domain.user.dto.UserData;
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
					"when {0} = 30 then 0.1 " +
					"when {0} = 45 then 0.15 " +
					"when {0} = 60 then 0.2 " +
					"else 0.0 end",
				rental.rentalPeriod);

		return queryFactory
			.select(
				book.priceStandard.subtract(
					userBookDetail.onedayPrice
						.multiply(rental.rentalPeriod)
						.multiply(rentalPeriodDiscountRate)
				).sum().intValue()
			)
			.from(user)
			.join(user.userBooks, userBook)
			.join(userBook.book, book)
			.join(userBook.userBookDetail, userBookDetail)
			.join(userBook.bookRentalHistories, rentalLog)
			.join(rentalLog.bookRental, rental)
			.where(user.id.eq(userId))
			.fetchOne();
	}

	@Override
	public Integer findUserEarningCash(Long userId) {
		return queryFactory
			.select(
				userBookDetail.onedayPrice
					.multiply(rental.rentalPeriod)
					.sum().intValue()
			)
			.from(user)
			.join(user.userBooks, userBook)
			.join(userBook.bookRentalHistories, rentalLog)
			.join(rentalLog.bookRental, rental)
			.join(userBook.userBookDetail, userBookDetail)
			.where(user.id.eq(userId))
			.fetchOne();
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
	public Long countUserReviewsByItem(Long userId, ReviewItems reviewItem) {
		return queryFactory
			.select(rentalReview.count())
			.from(rentalReview)
			.where(rentalReview.user.id.eq(userId)
				.and(rentalReview.reviewItems.eq(reviewItem)))
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
}
