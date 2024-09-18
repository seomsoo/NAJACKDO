package com.najackdo.server.domain.book.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.book.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

	List<Book> findByTitleContains(String keyword);
}
