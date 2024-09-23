package com.najackdo.server.domain.book.repository;

import static com.najackdo.server.domain.book.entity.QBook.*;
import static com.najackdo.server.domain.book.entity.QBookMark.*;
import static com.najackdo.server.domain.book.entity.QUserBook.*;
import static com.najackdo.server.domain.user.entity.QInterestUser.*;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.entity.BookMark;
import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.user.entity.QUser;
import com.najackdo.server.domain.user.entity.User;
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
			.orderBy(bookMark.id.desc())
			.fetch();

		return fetch.stream().map(BookMark::getBook).toList();
	}

	@Override
	public List<UserBook> findBookCaseInterestByUser(User user) {

		return queryFactory.select(userBook)
			.from(userBook)
			.join(userBook.book, book).fetchJoin()
			.join(userBook.user, QUser.user).fetchJoin() // QUser 객체 사용
			.join(interestUser).on(interestUser.following.eq(userBook.user)).fetchJoin() // 조인 조건 추가
			.where(interestUser.follower.eq(user)) // 현재 사용자를 팔로워로 설정
			.fetch();

	}

	@Override
	public List<UserBook> findBookCaseByUserId(User findUser) {

		return queryFactory.select(userBook)
			.from(userBook)
			.join(userBook.book, book).fetchJoin()
			.join(userBook.user, QUser.user).fetchJoin()
			.where(userBook.user.eq(findUser))
			.fetch();
	}


	//
	// private List<Tuple> getUserBooksData(List<User> users) {
	// 	return queryFactory
	// 		.select(userBook, book.cover, userBook.bookStatus) // userBook 포함
	// 		.from(userBook)
	// 		.join(userBook.book, book)
	// 		.join(userBook.user).fetchJoin() // 사용자도 가져옴
	// 		.where(userBook.user.in(users))
	// 		.fetch();
	// }
	//
	// private List<Tuple> getUserBooksDataByUserId(Long userId) {
	// 	return queryFactory
	// 		.select(userBook, book.cover, userBook.bookStatus) // userBook 포함
	// 		.from(userBook)
	// 		.join(userBook.book, book)
	// 		.join(userBook.user).fetchJoin() // 사용자도 가져옴
	// 		.where(userBook.user.id.eq(userId))
	// 		.fetch();
	// }
	//
	// private Map<User, List<BookData.DisplayBook>> groupBooksByUser(List<Tuple> userBooksData) {
	// 	Map<User, List<BookData.DisplayBook>> userBooksMap = new HashMap<>();
	// 	for (Tuple row : userBooksData) {
	// 		User user = row.get(userBook.user);
	// 		BookData.DisplayBook displayBook = makeDisplayBook(row);
	// 		userBooksMap.computeIfAbsent(user, k -> new ArrayList<>()).add(displayBook);
	// 	}
	// 	return userBooksMap;
	// }
	//
	// private List<BookData.DisplayBook> convertToDisplayBooks(List<Tuple> userBooksData) {
	// 	return userBooksData.stream()
	// 		.map(this::makeDisplayBook)
	// 		.collect(Collectors.toList());
	// }
	//
	// private BookData.DisplayBook makeDisplayBook(Tuple row) {
	// 	Long bookId = row.get(userBook.id);
	// 	String cover = row.get(book.cover);
	// 	BookStatus bookStatus = row.get(userBook.bookStatus);
	//
	// 	BookData.DisplayBook displayBook = new BookData.DisplayBook();
	// 	displayBook.setBookId(bookId);
	// 	displayBook.setCover(cover);
	// 	displayBook.setBookStatus(bookStatus);
	//
	// 	return displayBook;
	// }

}
