package com.najackdo.server.domain.book.repository;

import java.util.List;

import com.najackdo.server.domain.book.dto.BookData;
import com.najackdo.server.domain.user.entity.User;

public interface BookQueryRepository {

	/**
	 * 사용자가 팔로우하는 사용자와 팔로우하는 사용자의 책 목록을 조회한다.
	 *
	 * @param user
	 * @return {@link List<BookData.BookCase>}
	 */
	List<BookData.BookCase> findBookCaseInterestByUser(User user);

	/**
	 * 사용자 닉네임으로 사용자의 책 목록을 조회한다.
	 *
	 * @param nickname
	 * @return {@link BookData.BookCase}
	 */
	BookData.BookCase findBookCaseByNickName(String nickname);
}