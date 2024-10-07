package com.najackdo.server.domain.book.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.book.entity.Book;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long>, BookQueryRepository {

    @Query("""
       SELECT b 
       FROM Book b 
       WHERE b.title 
       LIKE concat('%', :title, '%')
       ORDER BY b.id DESC
       LIMIT 1
       """)
    Optional<Book> findFirstByTitle(@Param("title") String title);

    @Query("SELECT b FROM Book b WHERE b.isbn = :isbn")
    Optional<Book> findFirstByISBN(@Param("isbn") Long isbn);

    Page<Book> findByTitleContains(String keyword, Pageable pageable);

    @Query("SELECT b FROM Book b WHERE b.id IN :bookIds AND b.genre = :genre")
    List<Book> findByIdsWithGenre(List<Integer> bookIds, String genre);


    @Query("SELECT b FROM Book b WHERE b.id IN :bookIds")
    List<Book> findByIds(List<Integer> bookIds);

    Optional<Book> findByIsbn(Long isbn);

    @Query("""
        SELECT b 
        FROM Book b 
        WHERE b.title = :title
        ORDER BY b.id ASC 
        LIMIT 1
""")
    Optional<Book> findByTitle(@Param("title") String title);
}
