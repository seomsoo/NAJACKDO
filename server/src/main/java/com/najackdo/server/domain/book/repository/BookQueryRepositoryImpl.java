package com.najackdo.server.domain.book.repository;


import static com.najackdo.server.domain.book.entity.QBook.*;
import static com.najackdo.server.domain.book.entity.QBookMark.*;
import static com.najackdo.server.domain.book.entity.QUserBook.*;
import static com.najackdo.server.domain.user.entity.QInterestUser.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.entity.BookMark;
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
	public List<Book> findInterestingBooks(Long userId) {
		List<BookMark> fetch = queryFactory.select(bookMark)
			.from(bookMark)
			.leftJoin(bookMark.book).fetchJoin()
			.where(bookMark.user.id.eq(userId))
			.fetch();

		return fetch.stream().map(BookMark::getBook).toList();
	}


	@Override
	public List<BookData.BookCase> findBookCaseInterestByUser(User user) {
		List<User> followerUsers = getFollowingUsers(user);
		List<Tuple> userBooksData = getUserBooksData(followerUsers);
		Map<String, List<BookData.DisplayBook>> userBooksMap = groupBooksByUser(userBooksData);

		return userBooksMap.entrySet().stream()
			.map(entry -> BookData.BookCase.of(entry.getKey(), entry.getValue()))
			.collect(Collectors.toList());
	}

	@Override
	public BookData.BookCase findBookCaseByNickName(String nickname) {
		List<Tuple> userBooksData = getUserBooksDataByNickname(nickname);
		List<BookData.DisplayBook> displayBooks = convertToDisplayBooks(userBooksData);

		return BookData.BookCase.of(nickname, displayBooks);
	}

	private List<User> getFollowingUsers(User user) {
		return queryFactory
			.select(interestUser.following)
			.from(interestUser)
			.where(interestUser.follower.eq(user))
			.fetch();
	}

	private List<Tuple> getUserBooksData(List<User> users) {
		return queryFactory
			.select(userBook.user.username, userBook.id, book.cover, userBook.bookStatus)
			.from(userBook)
			.join(userBook.book, book)
			.where(userBook.user.in(users))
			.fetch();
	}

	private List<Tuple> getUserBooksDataByNickname(String nickname) {
		return queryFactory
			.select(userBook.user.username, userBook.id, book.cover, userBook.bookStatus)
			.from(userBook)
			.join(userBook.book, book)
			.where(userBook.user.username.eq(nickname))
			.fetch();
	}

	private Map<String, List<BookData.DisplayBook>> groupBooksByUser(List<Tuple> userBooksData) {
		Map<String, List<BookData.DisplayBook>> userBooksMap = new HashMap<>();
		for (Tuple row : userBooksData) {
			String userName = row.get(userBook.user.username);
			BookData.DisplayBook displayBook = makeDisplayBook(row);
			userBooksMap.computeIfAbsent(userName, k -> new ArrayList<>()).add(displayBook);
		}
		return userBooksMap;
	}

	private List<BookData.DisplayBook> convertToDisplayBooks(List<Tuple> userBooksData) {
		return userBooksData.stream()
			.map(this::makeDisplayBook)
			.collect(Collectors.toList());
	}

	private BookData.DisplayBook makeDisplayBook(Tuple row) {
		Long bookId = row.get(userBook.id);
		String cover = row.get(book.cover);
		BookStatus bookStatus = row.get(userBook.bookStatus);

		BookData.DisplayBook displayBook = new BookData.DisplayBook();
		displayBook.setBookId(bookId);
		displayBook.setCover(cover);
		displayBook.setBookStatus(bookStatus);

		return displayBook;
	}

}
