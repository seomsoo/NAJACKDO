package com.najackdo.server.domain.book.repository;

import com.najackdo.server.domain.book.entity.UserBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBooksRepository extends JpaRepository<UserBook,Long>{

    @Query("SELECT u FROM UserBook u WHERE u.user.providerId =: userId")
    List<UserBook> findByUserId(@Param("userId") String userId);

}
