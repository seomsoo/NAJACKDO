package com.najackdo.server.domain.book.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.najackdo.server.domain.book.entity.UserBook;

@Repository
public interface UserBooksRepository extends JpaRepository<UserBook, Long> {

	@Query("SELECT ub FROM UserBook ub JOIN FETCH ub.book JOIN FETCH ub.user WHERE ub.user.id = :userId AND ub.book.isbn = :isbn")
	Optional<UserBook> findByUserAndIsbn(@Param("userId") Long userId, @Param("isbn") Long isbn);

	@Query(
		"""
		SELECT ub
		FROM UserBook ub
		JOIN FETCH ub.userBookDetail
		WHERE  (ub.locationCode.id IN :locations AND ub.book.id = :bookId) AND ub.bookStatus = 'AVAILABLE'
		"""
	)
	List<UserBook> findUserBooksByLocations(Long bookId, Set<Integer> locations);


}

