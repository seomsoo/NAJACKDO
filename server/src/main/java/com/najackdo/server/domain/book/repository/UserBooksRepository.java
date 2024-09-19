package com.najackdo.server.domain.book.repository;

import com.najackdo.server.domain.book.entity.UserBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserBooksRepository extends JpaRepository<UserBook,Long>, UserBooksQueryRepositroy{
    @Query("SELECT ub FROM UserBook ub JOIN FETCH ub.book JOIN FETCH ub.user WHERE ub.user.id = :userId AND ub.book.isbn = :isbn")
    Optional<UserBook> findByUserAndIsbn(@Param("userId") Long userId, @Param("isbn") Long isbn);



}

