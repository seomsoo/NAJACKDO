package com.najackdo.server.domain.book.repository;

import com.najackdo.server.domain.book.dto.UserBookData;
import com.najackdo.server.domain.user.entity.QInterestUser;
import com.najackdo.server.domain.user.entity.User;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.najackdo.server.domain.book.entity.QBook.book;
import static com.najackdo.server.domain.book.entity.QUserBook.userBook;
import static com.najackdo.server.domain.user.entity.QInterestUser.interestUser;

@Repository
@RequiredArgsConstructor
public class UserBooksCustomRepositoryImpl implements UserBooksCustomRepositroy {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<UserBookData.BookCase> getBookCasesByUser(User user) {
        return queryFactory.select(Projections.constructor(UserBookData.BookCase.class,
                userBook.id,
                book.cover,
                book.title,
                book.author,
                book.description
                        ))
                .from(interestUser)
                .join(userBook).on(interestUser.following.eq(userBook.user))
                .join(userBook.book, book)
                .where(interestUser.follower.eq(user))
                .fetch();
    }
}
