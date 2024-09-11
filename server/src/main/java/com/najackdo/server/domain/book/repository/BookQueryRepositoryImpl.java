package com.najackdo.server.domain.book.repository;

import static com.najackdo.server.domain.book.entity.QBook.*;
import static com.najackdo.server.domain.book.entity.QUserBook.*;
import static com.najackdo.server.domain.user.entity.QInterestUser.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.entity.BookStatus;
import com.najackdo.server.domain.user.entity.User;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class BookQueryRepositoryImpl implements BookQueryRepository {

	private final JPAQueryFactory queryFactory;

	@Override
	public List<BookData.BookCase> findBookCaseInterestByUser(User user) {

		List<User> followerUsers = queryFactory
			.select(interestUser.follower)
			.from(interestUser)
			.where(interestUser.following.eq(user))
			.fetch();

		List<Tuple> userBooksData = queryFactory
			.select(userBook.user.username, userBook.id, book.cover, userBook.bookStatus)
			.from(userBook)
			.join(userBook.book, book)
			.where(userBook.user.in(followerUsers))
			.fetch();

		// 결과를 유저별로 그룹화하여 BookCase로 변환
		Map<String, List<BookData.DisplayBook>> userBooksMap = new HashMap<>();
		for (Tuple row : userBooksData) {
			String userName = row.get(userBook.user.username);
			Long bookId = row.get(userBook.id);
			String cover = row.get(book.cover);
			BookStatus bookStatus = row.get(userBook.bookStatus);

			BookData.DisplayBook displayBook = new BookData.DisplayBook();
			displayBook.setBookId(bookId);
			displayBook.setCover(cover);
			displayBook.setBookStatus(bookStatus);

			userBooksMap.computeIfAbsent(userName, k -> new ArrayList<>()).add(displayBook);
		}

		return userBooksMap.entrySet().stream()
			.map(entry -> BookData.BookCase.of(entry.getKey(), entry.getValue()))
			.collect(Collectors.toList());
	}

	@Override
	public BookData.BookCase findBookCaseByNickName(String nickname) {
		List<Tuple> userBooksData = queryFactory
			.select(userBook.user.username, userBook.id, book.cover, userBook.bookStatus)
			.from(userBook)
			.join(userBook.book, book)
			.where(userBook.user.username.eq(nickname))
			.fetch();

		List<BookData.DisplayBook> displayBooks = userBooksData.stream()
			.map(row -> {
				Long bookId = row.get(userBook.id);
				String cover = row.get(book.cover);
				BookStatus bookStatus = row.get(userBook.bookStatus);

				BookData.DisplayBook displayBook = new BookData.DisplayBook();
				displayBook.setBookId(bookId);
				displayBook.setCover(cover);
				displayBook.setBookStatus(bookStatus);

				return displayBook;
			})
			.collect(Collectors.toList());

		return BookData.BookCase.of(nickname, displayBooks);
	}

}
