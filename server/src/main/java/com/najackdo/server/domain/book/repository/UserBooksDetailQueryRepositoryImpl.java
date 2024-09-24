package com.najackdo.server.domain.book.repository;

import static com.najackdo.server.domain.book.entity.QUserBookDetail.*;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.najackdo.server.domain.book.entity.UserBookDetail;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserBooksDetailQueryRepositoryImpl implements UserBooksDetailQueryRepository {

	private final JPAQueryFactory queryFactory;

	@Override
	public Optional<UserBookDetail> findUserBookDetailByUserBookId(Long userBookId) {

		return Optional.ofNullable(
			queryFactory
				.select(userBookDetail)
				.from(userBookDetail)
				.where(userBookDetail.userBook.id.eq(userBookId))
				.fetchOne());

	}
}
