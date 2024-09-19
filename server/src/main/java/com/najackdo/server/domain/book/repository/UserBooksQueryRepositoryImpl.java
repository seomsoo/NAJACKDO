package com.najackdo.server.domain.book.repository;

import com.najackdo.server.domain.book.dto.UserBookData;
import com.najackdo.server.domain.user.entity.User;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.najackdo.server.domain.book.entity.QBook.book;
import static com.najackdo.server.domain.book.entity.QUserBook.userBook;
import static com.najackdo.server.domain.user.entity.QInterestUser.interestUser;

@Repository
@RequiredArgsConstructor
public class UserBooksQueryRepositoryImpl implements UserBooksQueryRepositroy {

    private final JPAQueryFactory queryFactory;
}
