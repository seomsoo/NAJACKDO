package com.najackdo.server.domain.notification.repository;

import com.najackdo.server.domain.notification.dto.NotificationDto;
import com.najackdo.server.domain.notification.entity.OrderType;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

import static com.najackdo.server.domain.notification.entity.QNotification.notification;
import static com.najackdo.server.domain.user.entity.QUser.user;

@Repository
@RequiredArgsConstructor
public class NotificationQueryRepositoryImpl implements NotificationQueryRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<NotificationDto.Notification> searchById(long userId, Pageable pageable) {
        List<NotificationDto.Notification> content = queryFactory.select(Projections.constructor(NotificationDto.Notification.class,
                                user.id,
                                notification.content,
                                notification.title,
                                notification.createdAt,
                                notification.updatedAt,
                                notification.type
                        )
                ).from(notification)
                .join(notification.user,user)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory
                .select(notification)
                .from(notification)
                .join(notification.user,user)
                .where(notification.isRead.eq(false),user.id.eq(userId))
                .fetchCount();

        return new PageImpl<>(content, pageable, total);
    }


}
