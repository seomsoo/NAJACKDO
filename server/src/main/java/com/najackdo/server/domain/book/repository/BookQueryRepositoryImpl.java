package com.najackdo.server.domain.book.repository;

import static com.najackdo.server.domain.book.entity.QBookMark.*;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.entity.BookMark;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class BookQueryRepositoryImpl implements BookQueryRepository {

	private final JPAQueryFactory queryFactory;

	@Override
	public List<Book> findInterestingBooks(Long userId) {
		List<BookMark> fetch = queryFactory.select(bookMark)
			.from(bookMark)
			.leftJoin(bookMark.book).fetchJoin()
			.where(bookMark.user.id.eq(userId))
			.fetch();

		return fetch.stream().map(BookMark::getBook).toList();
	}
}
