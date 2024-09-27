package com.najackdo.server.domain.notification.repository;

import com.najackdo.server.domain.notification.entity.Notification;
import com.najackdo.server.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface NotificationRepository extends JpaRepository<Notification, Long>, NotificationQueryRepository {

    @Modifying
    @Query("update Notification n set n.isRead = true where n.isSend = true")
    int  updateNotificationIsRead();
}
