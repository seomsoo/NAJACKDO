package com.najackdo.server.domain.book.repository;

import com.najackdo.server.domain.book.entity.UserBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserBooksRepository extends JpaRepository<UserBook,Long> {

    @Query("SELECT u FROM UserBook u WHERE u.user.providerId =: userId")
    List<UserBook> findByUserId(@Param("userId") String userId);

}
