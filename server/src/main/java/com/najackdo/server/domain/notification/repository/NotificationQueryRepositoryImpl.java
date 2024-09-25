package com.najackdo.server.domain.notification.repository;

import com.najackdo.server.domain.notification.dto.NotificationDto;
import com.najackdo.server.domain.notification.entity.OrderType;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
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
    public List<NotificationDto.Notification> searchById(long userId,NotificationDto.NotificationPaging paging) {
        OrderSpecifier[] orderSpecifiers = createOrderSpecifier(paging);

        if(paging.getPageNumber()>0){
            paging.setPageNumber((paging.getPageNumber()-1)*paging.getPageSize());
        }else{
            paging.setPageNumber(0);
        }

        return queryFactory.select(Projections.constructor(NotificationDto.Notification.class,
                                user.id,
                        notification.content,
                        notification.title,
                        notification.createdAt,
                        notification.updatedAt,
                        notification.type
                        )
                ).from(notification)
                .join(notification.user,user)
                .where(notification.isRead.eq(false),user.id.eq(userId))
                .orderBy(orderSpecifiers)
                .offset(paging.getPageNumber())
                .limit(paging.getPageSize())
                .fetch();
    }


    private OrderSpecifier[] createOrderSpecifier(NotificationDto.NotificationPaging paging) {

        List<OrderSpecifier> orderSpecifiers = new ArrayList<>();
        if (paging.getOrderType()== OrderType.ASC) {
            orderSpecifiers.add(new OrderSpecifier(Order.ASC, notification.createdAt));
        } else{
            orderSpecifiers.add(new OrderSpecifier(Order.DESC, notification.createdAt));
        }
        return orderSpecifiers.toArray(new OrderSpecifier[orderSpecifiers.size()]);
    }

}
