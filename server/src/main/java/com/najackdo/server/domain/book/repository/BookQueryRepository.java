package com.najackdo.server.domain.book.repository;

import java.util.List;

import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.book.entity.UserBook;
import com.najackdo.server.domain.user.entity.User;
import com.najackdo.server.domain.book.entity.Book;

public interface BookQueryRepository {

	/**
	 * 사용자가 팔로우하는 사용자와 팔로우하는 사용자의 책 목록을 조회한다.
	 *
	 * @param user
	 * @return {@link List<BookData.BookCase>}
	 */
	List<UserBook> findBookCaseInterestByUser(User user);

	List<Book> findInterestingBooks(Long userId);

	/**
	 * 사용자 닉네임으로 사용자의 책 목록을 조회한다.
	 *
	 * @param findUser
	 * @return {@link BookData.BookCase}
	 */
	List<UserBook> findBookCaseByUserId(User findUser);
}
