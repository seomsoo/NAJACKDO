package com.najackdo.server.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.najackdo.server.domain.book.entity.UserBookDetail;

public interface UserBookDetailRepository extends JpaRepository<UserBookDetail, Long>, UserBooksDetailQueryRepository {
}
