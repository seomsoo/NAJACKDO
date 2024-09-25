package com.najackdo.server.domain.book.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.najackdo.server.domain.book.entity.UserBookDetail;

public interface UserBookDetailRepository extends JpaRepository<UserBookDetail, Long>, UserBooksDetailQueryRepository {

	@Query("SELECT ubd FROM UserBookDetail ubd JOIN FETCH ubd.userBook WHERE ubd.userBook.id = :userBookId")
	Optional<UserBookDetail> findByUserBookId(Long userBookId);

}
