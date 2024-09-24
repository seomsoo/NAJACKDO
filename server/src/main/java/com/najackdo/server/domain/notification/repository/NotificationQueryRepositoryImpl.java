package com.najackdo.server.domain.notification.repository;

import com.najackdo.server.domain.notification.dto.NotificationDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import static com.najackdo.server.domain.notification.entity.QNotification.notification;
import static com.najackdo.server.domain.user.entity.QUser.user;

@Repository
@RequiredArgsConstructor
public class NotificationQueryRepositoryImpl implements NotificationQueryRepository {

    private final JPAQueryFactory queryFactory;


    /*
    private String userId;
        private String content;
        private String title;
        private DateTime createAt;
        private DateTime updateAt;
        private String Type;
     */
    @Override
    public List<NotificationDto.Notification> searchById(NotificationDto.NotificationPaging paging) {
        List<NotificationDto.Notification> list = queryFactory.select(Projections.constructor(NotificationDto.Notification.class,
                                user.id,
                        notification.content,
                        notification.title,
                        notification.createdAt,
                        notification.updatedAt,
                        notification.type
                        )
                ).from(notification)
                .join(notification.user,user)
                .where(notification.isRead.eq(false))
                .offset(paging.getPageNumber())
                .limit(paging.getPageSize())
                .fetch();
        return list;
    }
}
