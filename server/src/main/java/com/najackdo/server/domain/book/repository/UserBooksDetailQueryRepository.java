package com.najackdo.server.domain.book.repository;

import java.util.Optional;

import com.najackdo.server.domain.book.entity.UserBookDetail;

public interface UserBooksDetailQueryRepository {

	/**
	 * userBookId로 사용자가 소유한 책의 상세 정보 조회
	 */
	Optional<UserBookDetail> findUserBookDetailByUserBookId(Long userBookId);
}
