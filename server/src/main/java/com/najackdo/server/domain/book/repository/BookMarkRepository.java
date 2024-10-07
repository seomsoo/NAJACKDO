package com.najackdo.server.domain.book.repository;

import java.util.Optional;

import javax.swing.text.html.Option;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.najackdo.server.domain.book.entity.Book;
import com.najackdo.server.domain.book.entity.BookMark;

public interface BookMarkRepository extends JpaRepository<BookMark, Long>, BookQueryRepository {

	Optional<BookMark> findByUserIdAndBookId(Long userId, Long bookId);

	@Query("""
    SELECT bm
    FROM BookMark bm
    JOIN FETCH bm.book
    WHERE bm.user.id = :id
    ORDER BY bm.id DESC
    LIMIT 1
""")
	Optional<BookMark> findFirstByUserId(Long id);
}
