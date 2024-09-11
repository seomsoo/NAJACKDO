package com.najackdo.server.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.book.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
