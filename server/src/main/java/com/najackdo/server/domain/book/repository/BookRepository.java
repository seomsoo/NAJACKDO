package com.najackdo.server.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.book.entity.Book;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b FROM Book b WHERE b.title LIKE concat('%', :title, '%')")
    Book findFirstByTitle(@Param("title") String title);

    @Query("SELECT b FROM Book b WHERE b.isbn = :isbn")
    Book findFirstByISBN(@Param("isbn") String isbn);

    List<Book> findByTitleContains(String keyword);

}
