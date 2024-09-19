package com.najackdo.server.domain.book.repository;


import com.najackdo.server.domain.book.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

import javax.swing.text.html.Option;

public interface BookRepository extends JpaRepository<Book, Long>, BookQueryRepository {

    @Query("SELECT b FROM Book b WHERE b.title LIKE concat('%', :title, '%')")
    Optional<Book> findFirstByTitle(@Param("title") String title);

    @Query("SELECT b FROM Book b WHERE b.isbn = :isbn")
    Optional<Book> findFirstByISBN(@Param("isbn") Long isbn);




    List<Book> findByTitleContains(String keyword);
}
