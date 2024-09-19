package com.najackdo.server.domain.book.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.book.entity.BookMark;

public interface BookMarkRepository extends JpaRepository<BookMark, Long> {

	Optional<BookMark> findByUserIdAndBookId(Long userId, Long bookId);
}
