package com.najackdo.server.domain.book.repository;


import com.najackdo.server.domain.book.entity.Book;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long>{

    @Query("SELECT b FROM Book b WHERE b.title LIKE concat('%', :keyword, '%')")
    Book findFirstByTitle(@Param("title") String title);
}
